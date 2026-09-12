import { useEffect, useState } from "react";
import BadgeCard from "../../components/learner/BadgeCard";
import { getMyBadges } from "../../services/gamificationService";

export default function Achievements() {
  const [badges, setBadges] = useState(null);

  useEffect(() => {
    getMyBadges().then(setBadges);
  }, []);

  if (!badges) {
    return <p className="text-sm text-neutral-400">Loading achievements…</p>;
  }

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Achievements</h1>
        <p className="mt-1 text-sm text-neutral-500">
          {earnedCount} of {badges.length} badges unlocked
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-amber-400"
            style={{ width: badges.length ? `${(earnedCount / badges.length) * 100}%` : "0%" }}
          />
        </div>
        <span className="text-sm font-semibold text-neutral-700">
          {earnedCount}/{badges.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {badges.map((badge) => (
          <BadgeCard
            key={badge.id}
            title={badge.name}
            description={badge.criteria}
            icon={badge.icon_key}
            earned={badge.earned}
          />
        ))}
      </div>
    </div>
  );
}
