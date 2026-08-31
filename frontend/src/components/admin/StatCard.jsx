import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui";

export default function StatCard({ label, value, delta }) {
  return (
    <Card className="p-5">
      <span className="text-xs text-fg/50 font-medium">{label}</span>
      <div className="text-2xl font-bold text-fg mt-2">{value}</div>

      {delta && (
        <div className="flex items-center gap-1 mt-2">
          <TrendingUp size={12} className="text-success" />
          <span className="text-xs font-semibold text-success">{delta}</span>
          <span className="text-xs text-fg/40">vs last month</span>
        </div>
      )}
    </Card>
  );
}