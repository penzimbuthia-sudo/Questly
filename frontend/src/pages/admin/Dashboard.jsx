import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout";
import { PieChartCard } from "@/components/charts";
import { StatCard, ReviewQueueCard, ReportCard } from "@/components/admin";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardStats, getRoleDistribution, getPendingResources, updateResourceStatus } from "@/services/adminService";
import { getReports } from "@/services/reportService";

const ROLE_COLORS = { Learner: "#8B5CF6", Contributor: "#F4D35E", Admin: "#5C5468" };

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [roleData, setRoleData] = useState([]);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getRoleDistribution(), getPendingResources(), getReports()])
      .then(([dashboardStats, roles, pending, reportsResponse]) => {
        setStats(dashboardStats);
        setRoleData(
          Object.entries(roles)
            .filter(([key]) => key !== "total")
            .map(([name, value]) => ({ name, value, color: ROLE_COLORS[name] ?? "#5C5468" }))
        );
        setReviewQueue(pending);
        setRecentReports((reportsResponse.data ?? reportsResponse).slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleReview(resourceId, status) {
    await updateResourceStatus(resourceId, status);
    setReviewQueue((current) => current.filter((item) => item.id !== resourceId));
  }

  const statCards = stats
    ? [
        { label: "Total users", value: stats.users.total },
        { label: "Active users", value: stats.users.active },
        { label: "Resources", value: stats.content.resources },
        { label: "Learning paths", value: stats.content.learning_paths },
      ]
    : [];

  return (
    <div>
      <PageHeader
        title={`Good afternoon, ${user?.name ?? "Admin"}`}
        subtitle="Here's what's happening across Questly today."
      />

      <div className="grid grid-cols-4 gap-4 mb-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Card key={i} className="p-5 h-24 animate-pulse" />)
          : statCards.map((s) => <StatCard key={s.label} label={s.label} value={s.value} />)}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 items-stretch">
        <div className="flex flex-col gap-4">
          <Card className="p-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold text-fg mb-2">Content pending review</h2>
              {!loading && reviewQueue.length === 0 && (
                <p className="text-sm text-fg/50">Queue clear — nothing waiting on you.</p>
              )}
              {reviewQueue.map((item) => (
                <ReviewQueueCard
                  key={item.id}
                  title={item.title}
                  typeLabel={item.type_label}
                  submittedBy={item.submitted_by}
                  onApprove={() => handleReview(item.id, "Published")}
                  onReject={() => handleReview(item.id, "Rejected")}
                />
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-fg mb-2">Recent reports</h2>
            {!loading && recentReports.length === 0 && (
              <p className="text-sm text-fg/50">No reports yet.</p>
            )}
            <div className="flex flex-col gap-2">
              {recentReports.map((r) => (
                <ReportCard key={r.id} title={r.content_title ?? r.reason} meta={r.reason} status={r.status} />
              ))}
            </div>
          </Card>
        </div>

        {!loading && roleData.length > 0 && (
          <PieChartCard title="User role distribution" data={roleData} centerLabel="total users" />
        )}
      </div>
    </div>
  );
}