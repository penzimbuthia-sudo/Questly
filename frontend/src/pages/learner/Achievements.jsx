// Achievements.jsx
import BadgeCard from "../../components/learner/BadgeCard";
import { ACHIEVEMENTS } from "../../data/achievements";

export default function Achievements() {
  const earnedCount = ACHIEVEMENTS.filter((b) => b.earned).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-fg">Achievements</h1>
        <p className="mt-1 text-sm text-fg/60">
          {earnedCount} of {ACHIEVEMENTS.length} badges unlocked
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-active">
          <div className="h-full rounded-full bg-butter" style={{ width: `${(earnedCount / ACHIEVEMENTS.length) * 100}%` }} />
        </div>
        <span className="text-sm font-semibold text-fg/80">
          {earnedCount}/{ACHIEVEMENTS.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ACHIEVEMENTS.map((badge) => (
          <BadgeCard key={badge.id} {...badge} />
        ))}
      </div>
    </div>
  );
}