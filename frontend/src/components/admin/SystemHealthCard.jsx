import { Card } from "@/components/ui";

export default function SystemHealthCard({ items = [] }) {
  return (
    <Card className="p-5">
      <div className="text-sm font-semibold text-fg mb-4">System health</div>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon size={15} className="text-fg/50" />
                <span className="text-sm text-fg">{item.label}</span>
              </div>
              <span className={`text-xs font-semibold ${item.ok ? "text-success" : "text-butter"}`}>
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}