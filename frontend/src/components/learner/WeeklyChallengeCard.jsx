import { Flag } from "lucide-react";

/**
 * WeeklyChallengeCard
 * The dark "hero" card used on Home and Challenges for the active
 * weekly/seasonal challenge. Pass `joined` to switch the CTA between
 * "Join challenge" and "Continue challenge".
 */
export default function WeeklyChallengeCard({
  eyebrow = "Weekly challenge",
  title,
  description,
  current,
  total,
  xpReward,
  daysLeft,
  joined = false,
  onAction,
}) {
  const percent = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <div className="rounded-2xl bg-neutral-900 p-6 text-white">
      <div className="flex items-center justify-between text-xs">
        <span className="rounded-full bg-white/10 px-2.5 py-1 font-medium text-amber-300">
          {eyebrow}
        </span>
        {daysLeft != null && <span className="text-neutral-400">{daysLeft} days left</span>}
        {xpReward != null && daysLeft == null && (
          <span className="font-semibold text-amber-300">+{xpReward} XP</span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-neutral-400">{description}</p>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-amber-400" style={{ width: `${percent}%` }} />
        </div>
        <span className="text-sm font-medium text-neutral-300">{current}/{total}</span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-amber-300"
        >
          <Flag className="h-4 w-4" />
          {joined ? "Continue challenge" : "Join challenge"}
        </button>
        {xpReward != null && daysLeft != null && (
          <span className="text-sm font-medium text-amber-300">+{xpReward} XP on completion</span>
        )}
      </div>
    </div>
  );
}
