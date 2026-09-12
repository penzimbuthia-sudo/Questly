import { useState, useEffect } from "react";
import { FileText, BookOpen, Eye, ThumbsUp } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Card, Button, SectionHeader, EmptyState } from "@/components/ui";
import { AreaChartCard } from "@/components/charts";
import {
  StatCard, ContentCard, ChallengeCard, ContributorLeaderboard,
  AddResourceModal, CreatePathModal,
} from "@/components/contributor";
import { getMyResources, createResource, createLearningPath } from "@/services/resourceService";
import { getMyStats, getContributorLeaderboard, getChallenges } from "@/services/gamificationService";
import { useAuth } from "@/hooks/useAuth";

// TODO: no backend endpoint exists yet for per-week resource view counts —
// this chart is still illustrative placeholder data. Needs a real
// analytics endpoint (e.g. GET /contributor/me/views-by-week) before this
// can be considered fixed rather than just "not obviously fake."
const chartData = [
  { week: "Wk 1", views: 620 },
  { week: "Wk 2", views: 810 },
  { week: "Wk 3", views: 690 },
  { week: "Wk 4", views: 980 },
];

export default function Dashboard() {
  const { user } = useAuth();

  const [content, setContent] = useState([]);
  const [stats, setStats] = useState({
    xp: 0,
    resources: 0,
    upvotes: 0,
    rank: null,
  });

  const [leaderboard, setLeaderboard] = useState([]);
  const [challenge, setChallenge] = useState(null);

  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showPathModal, setShowPathModal] = useState(false);

  useEffect(() => {
    getMyResources().then(setContent);
    getMyStats().then(setStats);
    getContributorLeaderboard().then(setLeaderboard);
    getChallenges().then((all) => setChallenge(all.find((c) => c.status === "Active") ?? null));
  }, []);

  async function handleAddResource(formData) {
    const newResource = await createResource(formData);

    setContent((currentList) => [newResource, ...currentList]);
    setShowResourceModal(false);
  }

  async function handleCreatePath(formData) {
    const newPath = await createLearningPath(formData);
    setContent((currentList) => [newPath, ...currentList]);
    setShowPathModal(false);
  }

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name ?? "Contributor"}`}
        subtitle="Keep sharing. Keep growing."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <StatCard icon={FileText} label="Resources shared" value={stats.resources} trend="+3 this week" />
        <StatCard icon={BookOpen} label="Learning paths" value={stats.paths || 0} trend="+1 this month" />
        <StatCard icon={Eye} label="Total views" value="1.2k" trend="+18%" />
        <StatCard icon={ThumbsUp} label="Total upvotes" value={stats.upvotes} trend="+42 this week" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Left column: create-new buttons + weekly challenge */}
        <div className="flex flex-col gap-4">
          <div>
            <SectionHeader title="Create new" />
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <div className="text-sm font-semibold text-fg mb-1">Add resource</div>
                <p className="text-xs text-fg/50 mb-3">Share a video, article, or doc.</p>
                <Button variant="primary" size="sm" onClick={() => setShowResourceModal(true)}>
                  Add
                </Button>
              </Card>
              <Card className="p-4">
                <div className="text-sm font-semibold text-fg mb-1">Create path</div>
                <p className="text-xs text-fg/50 mb-3">Group resources into modules.</p>
                <Button variant="butter" size="sm" onClick={() => setShowPathModal(true)}>
                  Create
                </Button>
              </Card>
            </div>
          </div>

          {challenge && (
            <div>
              <SectionHeader title="Weekly challenge" />
              <ChallengeCard
                title={challenge.title}
                description={challenge.description}
                reward={challenge.reward_xp ? `+${challenge.reward_xp} XP` : undefined}
              />
            </div>
          )}
        </div>

        {/* Right column: recent content */}
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <SectionHeader title="Top contributors" />
          <Card className="p-5">
            <ContributorLeaderboard entries={leaderboard} />
          </Card>
        </div>

        <AreaChartCard
          title="Contribution analytics"
          data={chartData}
          xKey="week"
          series={[{ key: "views", color: "#8B5CF6" }]}
        />
      </div>

      {/* These popups only appear when their "show" state is true */}
      {showResourceModal && (
        <AddResourceModal onClose={() => setShowResourceModal(false)} onSubmit={handleAddResource} />
      )}
      {showPathModal && (
        <CreatePathModal onClose={() => setShowPathModal(false)} onSubmit={handleCreatePath} />
      )}
    </div>
  );
}