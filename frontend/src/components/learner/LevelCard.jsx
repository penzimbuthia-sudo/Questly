import { Trophy } from "lucide-react";

/**
 * LevelCard
 * Shows the learner's current level and how much XP stands between them
 * and the next one.
 */
export default function LevelCard({ level, xpToNextLevel, percent }) {
  const computedPercent =
    percent ?? Math.max(4, 100 - Math.min(100, Math.round((xpToNextLevel / (xpToNextLevel + 1)) * 100)));

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
          <Trophy className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-neutral-900 leading-none">Level {level}</p>
          <p className="mt-1 text-sm text-neutral-500">{xpToNextLevel} XP to level {level + 1}</p>
        </div>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-amber-400"
          style={{ width: `${Math.min(100, Math.max(0, computedPercent))}%` }}
        />
      </div>
    </div>
  );
}
