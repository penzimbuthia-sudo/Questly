import { useState } from "react";
import { Server, Database, HardDrive, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { PieChartCard, AreaChartCard } from "@/components/charts";
import { StatCard, ReviewQueueCard, ReportCard, SystemHealthCard } from "@/components/admin";
import Card from "@/components/ui/Card";

const stats = [
  { label: "Total users", value: "8,428", delta: "+12.4%" },
  { label: "Active users", value: "2,341", delta: "+18.6%" },
  { label: "Resources", value: "1,256", delta: "+8.2%" },
  { label: "Learning paths", value: "342", delta: "+14.1%" },
];

const roleData = [
  { name: "Learners", value: 6150, color: "#8B5CF6" },
  { name: "Contributors", value: 1850, color: "#F4D35E" },
  { name: "Admins", value: 428, color: "#5C5468" },
];

const activityData = [
  { day: "1 May", users: 1200 },
  { day: "8 May", users: 1650 },
  { day: "15 May", users: 1500 },
  { day: "22 May", users: 2100 },
  { day: "29 May", users: 2480 },
];

const systemHealthItems = [
  { label: "Server status", value: "Operational", icon: Server, ok: true },
  { label: "Database", value: "Operational", icon: Database, ok: true },
  { label: "Storage", value: "85% used", icon: HardDrive, ok: false },
  { label: "Backup", value: "Operational", icon: ShieldCheck, ok: true },
];

export default function Dashboard() {
  // Starting "pending review" list — clicking Approve/Reject
  // removes the item from this list.
  const [reviewQueue, setReviewQueue] = useState([
    { id: 1, title: "React performance optimization", typeLabel: "Resource · Video", submittedBy: "Aisha K." },
    { id: 2, title: "Advanced TypeScript concepts", typeLabel: "Resource · Article", submittedBy: "Brian O." },
  ]);

  function removeFromQueue(id) {
    setReviewQueue((current) => current.filter((item) => item.id !== id));
  }

  const recentReports = [
    { title: "Inappropriate content in resource", meta: "Reported by User123 · 2h ago", status: "Under review" },
    { title: "Spam in discussion", meta: "Reported by User456 · 5h ago", status: "Resolved" },
  ];

  return (
    <div>
      <PageHeader title="Good afternoon, Admin" subtitle="Here's what's happening across Questly today." />

      {/* Stat cards row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} />
        ))}
      </div>

      {/* Review queue + recent reports (left) / role distribution (right) */}
      <div className="grid grid-cols-2 gap-4 mb-6 items-stretch">
        <div className="flex flex-col gap-4">
          <Card className="p-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold text-fg mb-2">Content pending review</h2>
              {reviewQueue.length === 0 && (
                <p className="text-sm text-fg/50">Queue clear — nothing waiting on you.</p>
              )}
              {reviewQueue.map((item) => (
                <ReviewQueueCard
                  key={item.id}
                  title={item.title}
                  typeLabel={item.typeLabel}
                  submittedBy={item.submittedBy}
                  onApprove={() => removeFromQueue(item.id)}
                  onReject={() => removeFromQueue(item.id)}
                />
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-fg mb-2">Recent reports</h2>
            <div className="flex flex-col gap-2">
              {recentReports.map((r) => (
                <ReportCard key={r.title} title={r.title} meta={r.meta} status={r.status} />
              ))}
            </div>
          </Card>
        </div>

        <PieChartCard title="User role distribution" data={roleData} centerLabel="total users" />
      </div>

      {/* Activity chart (left) / system health (right) */}
      <div className="grid grid-cols-2 gap-4">
        <AreaChartCard
          title="Platform activity"
          data={activityData}
          xKey="day"
          series={[{ key: "users", color: "#8B5CF6" }]}
        />

        <SystemHealthCard items={systemHealthItems} />
      </div>
    </div>
  );
}