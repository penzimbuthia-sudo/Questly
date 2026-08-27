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
import { getMyStats, getContributorLeaderboard } from "@/services/gamificationService";
import { sampleChallenges } from "@/data/challenges";
import { useAuth } from "@/hooks/useAuth";

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
    level: 1,
    resources: 0,
    upvotes: 0,
  });

  const [leaderboard, setLeaderboard] = useState([]);

  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showPathModal, setShowPathModal] = useState(false);

  useEffect(() => {
    getMyResources().then((data) => setContent(data.resources ?? []));
    getMyStats().then(setStats);
    getContributorLeaderboard().then(setLeaderboard);
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

          {/* Only show the first sample challenge, if one exists */}
          {sampleChallenges[0] && (
            <div>
              <SectionHeader title="Weekly challenge" />
              <ChallengeCard {...sampleChallenges[0]} />
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