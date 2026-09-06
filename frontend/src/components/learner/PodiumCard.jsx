import { Medal } from "lucide-react";

const MEDAL_COLOR = { 1: "text-amber-400", 2: "text-neutral-300", 3: "text-orange-400" };
const SIZE = { 1: "h-20 w-20 text-xl", 2: "h-16 w-16 text-base", 3: "h-16 w-16 text-base" };

/**
 * PodiumCard
 * One place on the leaderboard's top-3 podium. Render three of these
 * side by side, ordered 2nd / 1st / 3rd to match a classic podium layout.
 */
export default function PodiumCard({ place, name, xp, isCurrentUser = false }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div
          className={`flex items-center justify-center rounded-full font-semibold text-white ${SIZE[place]} ${
            isCurrentUser ? "bg-purple-600" : "bg-neutral-700"
          }`}
        >
          {initials}
        </div>
        <Medal className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-neutral-900 p-1 ${MEDAL_COLOR[place]}`} />
      </div>
      <p className={`text-sm font-semibold ${isCurrentUser ? "text-purple-300" : "text-white"}`}>
        {name}
        {isCurrentUser ? " (you)" : ""}
      </p>
      <p className="text-xs font-medium text-amber-300">{xp.toLocaleString()} XP</p>
      <div className="flex h-9 w-full items-center justify-center rounded-lg bg-neutral-800 text-sm font-bold text-white">
        {place}
      </div>
    </div>
  );
}
