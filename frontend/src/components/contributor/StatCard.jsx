import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui";

export default function StatCard({ icon: Icon, label, value, trend }) {
  return (
    <Card className="p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-royal/15 flex items-center justify-center">
          <Icon size={18} className="text-royal" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-butter flex items-center gap-1">
            <ArrowUpRight size={12} /> {trend}
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-fg">{value}</div>
        <div className="text-xs text-fg/50 mt-0.5">{label}</div>
      </div>
    </Card>
  );
}