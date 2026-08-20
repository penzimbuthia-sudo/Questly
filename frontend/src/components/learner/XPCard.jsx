import { Zap } from "lucide-react";

/**
 * XPCard
 * Shows total XP, this week's gain, and a progress sliver (visual only —
 * pass `percent` if you want it to represent something specific, e.g.
 * progress toward a weekly goal).
 */
export default function XPCard({ totalXP, weeklyXP, percent = 65 }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-500">
          <Zap className="h-5 w-5" fill="currentColor" strokeWidth={0} />
        </div>
        <div>
          <p className="text-2xl font-bold text-neutral-900 leading-none">
            {totalXP.toLocaleString()} XP
          </p>
          <p className="mt-1 text-sm text-emerald-600">+{weeklyXP} XP this week</p>
        </div>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-amber-400"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
    </div>
  );
}
