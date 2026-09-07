import { useEffect, useState } from "react";
import { Gem, Rocket, Sparkles, Crown } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Card, Button } from "@/components/ui";
import { getMyBadges, getMyStats } from "@/services/gamificationService";

const perks = [
  { name: "Custom profile badge frame", cost: 500, icon: Gem },
  { name: "Early access to new paths", cost: 800, icon: Rocket },
  { name: "Featured contributor spotlight", cost: 1500, icon: Sparkles },
  { name: "Mentor role application", cost: 3000, icon: Crown },
];

export default function Rewards() {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState([]);
  const [redeemed, setRedeemed] = useState([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    getMyStats().then((stats) => setXp(stats.xp ?? 0)).catch(() => {});
    getMyBadges().then((allBadges) => setBadges(allBadges.filter((badge) => badge.earned))).catch(() => {});
  }, []);

  function handleRedeem(perk) {
    if (xp < perk.cost || redeemed.includes(perk.name)) return;
    setXp((currentXp) => currentXp - perk.cost);
    setRedeemed((current) => [...current, perk.name]);
    setNotice(`${perk.name} redeemed successfully.`);
  }

  return (
    <div>
      <PageHeader title="Rewards" subtitle="Redeem the XP you've earned for platform perks." />

      <Card className="mb-6 flex items-center justify-between gap-4 bg-royal p-5 text-ivory">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ivory/60">Available balance</p>
          <p className="mt-1 text-2xl font-bold">{xp.toLocaleString()} XP</p>
        </div>
        <div className="text-right text-xs text-ivory/70">{badges.length} badge{badges.length === 1 ? "" : "s"} earned</div>
      </Card>

      {notice && (
        <button type="button" onClick={() => setNotice("")} className="mb-5 w-full rounded-xl border border-butter/40 bg-butter/15 px-4 py-3 text-left text-sm font-semibold text-fg">
          {notice}
        </button>
      )}

      <div className="grid grid-cols-3 gap-4">
        {perks.map((perk) => {
          const Icon = perk.icon;
          const isRedeemed = redeemed.includes(perk.name);
          const canAfford = xp >= perk.cost && !isRedeemed;

          return (
            <Card key={perk.name} className="p-5 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-royal/15 flex items-center justify-center">
                <Icon size={18} className="text-royal" />
              </div>
              <div className="text-sm font-semibold text-fg">{perk.name}</div>
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-xs text-fg/50">{perk.cost.toLocaleString()} XP</span>
                <Button
                  variant={canAfford ? "primary" : "outline"}
                  size="sm"
                  disabled={!canAfford}
                  onClick={() => handleRedeem(perk)}
                >
                  {isRedeemed ? "Redeemed" : canAfford ? "Redeem" : "Need more XP"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}