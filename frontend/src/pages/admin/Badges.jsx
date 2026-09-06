import { useEffect, useState } from "react";
import { Zap, Compass, Medal, Flame, Trophy, Crown, Award } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { BadgeAdminCard } from "@/components/admin";
import { getBadgeStats } from "@/services/gamificationService";

const ICONS = { zap: Zap, compass: Compass, medal: Medal, flame: Flame, trophy: Trophy, crown: Crown };

export default function Badges() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBadgeStats().then(setBadges).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Badges" subtitle="Achievements unlocked by learners and contributors." />
      {!loading && badges.length === 0 && (
        <p className="text-sm text-fg/50">No badges have been created yet.</p>
      )}
      <div className="grid grid-cols-3 gap-4">
        {badges.map((b) => (
          <BadgeAdminCard
            key={b.id}
            name={b.name}
            criteria={b.criteria}
            unlockedCount={b.unlocked_count}
            icon={ICONS[b.icon_key] ?? Award}
          />
        ))}
      </div>
    </div>
  );
}