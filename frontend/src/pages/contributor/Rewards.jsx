import { useState } from "react";
import { Gem, Rocket, Sparkles, Crown } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Card, Button } from "@/components/ui";

const perks = [
  { name: "Custom profile badge frame", cost: 500, icon: Gem },
  { name: "Early access to new paths", cost: 800, icon: Rocket },
  { name: "Featured contributor spotlight", cost: 1500, icon: Sparkles },
  { name: "Mentor role application", cost: 3000, icon: Crown },
];

export default function Rewards() {
  const [xp] = useState(2480);

  return (
    <div>
      <PageHeader title="Rewards" subtitle="Redeem the XP you've earned for platform perks." />

      <div className="grid grid-cols-3 gap-4">
        {perks.map((perk) => {
          const Icon = perk.icon;
          const canAfford = xp >= perk.cost;

          return (
            <Card key={perk.name} className="p-5 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-royal/15 flex items-center justify-center">
                <Icon size={18} className="text-royal" />
              </div>
              <div className="text-sm font-semibold text-fg">{perk.name}</div>
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-xs text-fg/50">{perk.cost.toLocaleString()} XP</span>
                <Button variant={canAfford ? "primary" : "outline"} size="sm" disabled={!canAfford}>
                  Redeem
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}