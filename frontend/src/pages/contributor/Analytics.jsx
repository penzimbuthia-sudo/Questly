import { PageHeader } from "@/components/layout";
import { AreaChartCard, BarChartCard, PieChartCard } from "@/components/charts";

const trendData = [
  { week: "Wk 1", views: 620, upvotes: 48 },
  { week: "Wk 2", views: 810, upvotes: 62 },
  { week: "Wk 3", views: 690, upvotes: 55 },
  { week: "Wk 4", views: 980, upvotes: 88 },
];

const typeBreakdown = [
  { name: "Video", value: 9, color: "#8B5CF6" },
  { name: "Article", value: 12, color: "#F4D35E" },
  { name: "Learning Path", value: 3, color: "#5C5468" },
];

const topResources = [
  { name: "Understanding React useEffect Hook", value: 12400 },
  { name: "JavaScript Array Methods, Explained", value: 8700 },
  { name: "Frontend Developer Roadmap 2026", value: 5100 },
];

export default function Analytics() {
  return (
    <div>
      <PageHeader title="Analytics" subtitle="How your content is performing." />

      <AreaChartCard
        title="Views over time"
        data={trendData}
        xKey="week"
        series={[
          { key: "views", color: "#8B5CF6" },
          { key: "upvotes", color: "#F4D35E" },
        ]}
      />

      <div className="grid grid-cols-2 gap-4 mt-6">
        <PieChartCard title="Content mix" data={typeBreakdown} centerLabel="total resources" />
        <BarChartCard title="Top performing resources" data={topResources} nameKey="name" valueKey="value" color="#8B5CF6" />
      </div>
    </div>
  );
}