import BadgeCard from "../../components/learner/BadgeCard";
import { ACHIEVEMENTS } from "../../data/achievements";

export default function Achievements() {
  const earnedCount = ACHIEVEMENTS.filter((b) => b.earned).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Achievements</h1>
        <p className="mt-1 text-sm text-neutral-500">
          {earnedCount} of {ACHIEVEMENTS.length} badges unlocked
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-amber-400"
            style={{ width: `${(earnedCount / ACHIEVEMENTS.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-neutral-700">
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
