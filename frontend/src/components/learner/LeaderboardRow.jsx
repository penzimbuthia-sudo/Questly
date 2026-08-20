import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus };
const TREND_STYLE = { up: "text-emerald-500", down: "text-rose-500", flat: "text-neutral-400" };

/**
 * LeaderboardRow
 * A single ranked row for spots 4+ (the top 3 use <PodiumCard /> instead).
 */
export default function LeaderboardRow({ rank, name, xp, trend = "flat", isCurrentUser = false }) {
  const TrendIcon = TREND_ICON[trend] ?? Minus;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-4 border-b border-neutral-100 px-2 py-4 last:border-0">
      <span className="w-5 text-sm font-medium text-neutral-400">{rank}</span>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700">
        {initials}
      </div>
      <span className={`flex-1 text-sm font-medium ${isCurrentUser ? "text-purple-600" : "text-neutral-900"}`}>
        {name}
        {isCurrentUser ? " (you)" : ""}
      </span>
      <TrendIcon className={`h-4 w-4 ${TREND_STYLE[trend]}`} />
      <span className="w-20 text-right text-sm font-semibold text-amber-600">
        {xp.toLocaleString()} XP
      </span>
    </div>
  );
}
