import { useState, useEffect } from "react";
import { FileText, ThumbsUp, Trophy } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Card, Button, SectionHeader, EmptyState } from "@/components/ui";
import {
  StatCard, ContentCard, ChallengeCard, ContributorLeaderboard,
  AddResourceModal, CreatePathModal,
} from "@/components/contributor";
import { getMyResources, createResource, createLearningPath } from "@/services/resourceService";
import { getMyStats, getContributorLeaderboard, getChallenges } from "@/services/gamificationService";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const [content, setContent] = useState([]);
  const [stats, setStats] = useState({ xp: 0, resources: 0, upvotes: 0, rank: null });
  const [leaderboard, setLeaderboard] = useState([]);
  const [challenge, setChallenge] = useState(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showPathModal, setShowPathModal] = useState(false);

  useEffect(() => {
    getMyResources().then(setContent);
    getMyStats().then(setStats);
    getContributorLeaderboard().then(setLeaderboard);
    getChallenges().then((all) => {
      const list = Array.isArray(all) ? all : (all?.challenges ?? all?.data ?? []);
      setChallenge(list.find((c) => c.status === "Active") ?? null);
    });
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
      <PageHeader title={`Welcome back, ${user?.name ?? "Contributor"}`} subtitle="Keep sharing. Keep growing." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon={FileText} label="Resources shared" value={stats.resources} />
        <StatCard icon={ThumbsUp} label="Total upvotes" value={stats.upvotes} />
        <StatCard icon={Trophy} label="Leaderboard rank" value={stats.rank ?? "—"} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-4">
          <div>
            <SectionHeader title="Create new" />
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <div className="text-sm font-semibold text-fg mb-1">Add resource</div>
                <p className="text-xs text-fg/50 mb-3">Share a video, article, or doc.</p>
                <Button variant="primary" size="sm" onClick={() => setShowResourceModal(true)}>Add</Button>
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
    </div>
  );
}