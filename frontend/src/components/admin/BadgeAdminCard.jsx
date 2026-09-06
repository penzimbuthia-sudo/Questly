import { Card } from "@/components/ui";

export default function BadgeAdminCard({ icon: Icon, name, criteria, unlockedCount }) {
  return (
    <Card className="p-5 text-center">
      <div className="w-12 h-12 rounded-full bg-butter/20 flex items-center justify-center mx-auto">
        <Icon size={22} className="text-butter" />
      </div>
      <div className="text-sm font-semibold text-fg mt-3">{name}</div>
      <div className="text-xs text-fg/50 mt-1">{criteria}</div>
      <div className="text-xs font-semibold text-royal mt-2">{unlockedCount} unlocked</div>
    </Card>
  );
}