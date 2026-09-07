import { useState, useEffect } from "react";
import { FileText, BookOpen, Eye, ThumbsUp, Zap, Award, Flame } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Card, Button, SectionHeader, EmptyState } from "@/components/ui";
import {
  StatCard, ContentCard, ChallengeCard, ContributorLeaderboard,
  AddResourceModal, CreatePathModal,
} from "@/components/contributor";
import { getMyResources, createResource, createLearningPath } from "@/services/resourceService";
import { checkInStreak, getChallenges, getMyStats, getContributorLeaderboard } from "@/services/gamificationService";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const [content, setContent] = useState([]);
  const [stats, setStats] = useState({
    xp: 0,
    resources: 0,
    upvotes: 0,
    rank: null,
    streak_days: 0,
  });

  const [leaderboard, setLeaderboard] = useState([]);
  const [challenge, setChallenge] = useState(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showPathModal, setShowPathModal] = useState(false);
  const [rewardNotice, setRewardNotice] = useState(null);
  const [resourceError, setResourceError] = useState("");

  useEffect(() => {
    getMyResources().then(setContent);
    getMyStats().then(setStats);
    getContributorLeaderboard().then(setLeaderboard);
    checkInStreak()
      .then((streak) => setStats((current) => ({ ...current, streak_days: streak.streak_days ?? current.streak_days })))
      .catch(() => {});
    getChallenges().then((all) => {
      const list = Array.isArray(all) ? all : (all?.challenges ?? all?.data ?? []);
      setChallenge(list.find((c) => c.status === "Active") ?? null);
    });
  }, []);

  async function handleAddResource(formData) {
    try {
      const newResource = await createResource(formData);

      setContent((currentList) => [newResource, ...currentList]);
      setStats((current) => ({ ...current, xp: current.xp + (newResource.xp_awarded ?? 25) }));
      setRewardNotice(`+${newResource.xp_awarded ?? 25} XP for sharing content${newResource.badges_awarded?.length ? ` · Badge unlocked: ${newResource.badges_awarded.join(", ")}` : ""}`);
      setResourceError("");
      setShowResourceModal(false);
    } catch {
      setResourceError("We couldn't submit that resource. Check the details and try again.");
    }
  }

  async function handleCreatePath(formData) {
    try {
      const newPath = await createLearningPath(formData);
      setContent((currentList) => [newPath, ...currentList]);
      setStats((current) => ({ ...current, xp: current.xp + (newPath.xp_awarded ?? 50) }));
      setRewardNotice(`+${newPath.xp_awarded ?? 50} XP for creating a learning path`);
      setShowPathModal(false);
    } catch (err) {
      console.error("createLearningPath failed:", err);
    }
  }

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name ?? "Contributor"}`}
        subtitle="Keep sharing. Keep growing."
      />
      {rewardNotice && (
        <button type="button" onClick={() => setRewardNotice(null)} className="mb-5 w-full rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm font-semibold text-amber-800">
          {rewardNotice}
        </button>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon={Zap} label="Total XP" value={stats.xp.toLocaleString()} trend="Keep earning" />
        <StatCard icon={Award} label="Contributor level" value={`Level ${Math.max(1, Math.floor(stats.xp / 500) + 1)}`} trend={`${stats.xp % 500}/500 XP`} />
        <StatCard icon={FileText} label="Resources shared" value={stats.resources} trend="+3 this week" />
        <StatCard icon={BookOpen} label="Learning paths" value={stats.paths || 0} trend="+1 this month" />
        <StatCard icon={Eye} label="Total views" value="1.2k" trend="+18%" />
        <StatCard icon={ThumbsUp} label="Total upvotes" value={stats.upvotes} trend="+42 this week" />
        <StatCard icon={Flame} label="Contribution streak" value={`${stats.streak_days ?? 0} days`} trend="Check in daily" />
      </div>

      <div className="mb-6 rounded-2xl border border-butter/30 bg-butter/10 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-fg/50">Next contributor milestone</p>
            <p className="mt-1 text-base font-bold text-fg">{Math.max(0, 500 - (stats.xp % 500))} XP to the next level</p>
          </div>
          <span className="rounded-full bg-butter px-3 py-1 text-xs font-bold text-fg">Level {Math.max(1, Math.floor(stats.xp / 500) + 1)}</span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
          <div className="h-full rounded-full bg-butter" style={{ width: `${(stats.xp % 500) / 5}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-4">
          <div>
            <SectionHeader title="Create new" />
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <div className="text-sm font-semibold text-fg mb-1">Add resource</div>
                <p className="text-xs text-fg/50 mb-3">Share a video, article, or doc.</p>
                <Button variant="primary" size="sm" onClick={() => { setResourceError(""); setShowResourceModal(true); }}>
                  Add
                </Button>
              </Card>
              <Card className="p-4">
                <div className="text-sm font-semibold text-fg mb-1">Create path</div>
                <p className="text-xs text-fg/50 mb-3">Group resources into modules.</p>
                <Button variant="butter" size="sm" onClick={() => setShowPathModal(true)}>Create</Button>
              </Card>
            </div>
          </div>

          {challenge && (
            <div>
              <SectionHeader title="Active challenge" />
              <ChallengeCard
                title={challenge.title}
                description={challenge.description}
                reward={challenge.reward_xp ? `${challenge.reward_xp} XP` : "Badge"}
              />
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="My recent content" />
          {content.length > 0 ? (
            <div className="flex flex-col gap-3">
              {content.slice(0, 3).map((item) => (
                <ContentCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <Card className="min-h-55 flex items-center justify-center p-6">
              <EmptyState
                title="No content yet"
                description="Share your first resource or create a learning path to start building your contribution."
              />
            </Card>
          )}
        </div>
      </div>

      <div>
        <SectionHeader title="Top contributors" />
        <Card className="p-5">
          <ContributorLeaderboard entries={leaderboard} />
        </Card>
      </div>

      {/* These popups only appear when their "show" state is true */}
      {showResourceModal && (
        <AddResourceModal
          onClose={() => setShowResourceModal(false)}
          onSubmit={handleAddResource}
          error={resourceError}
        />
      )}
      {showPathModal && (
        <CreatePathModal onClose={() => setShowPathModal(false)} onSubmit={handleCreatePath} />
      )}
    </div>
  );
}