import { Avatar } from "@/components/ui";

export default function ContributorLeaderboard({ entries = [] }) {
  return (
    <div className="flex flex-col gap-3">
      {entries.map((entry) => (
        <div
          key={entry.rank}
          className={`flex items-center gap-3 rounded-lg px-2 py-1.5 ${
            entry.isYou ? "bg-royal/15" : ""
          }`}
        >
          <span
            className={`text-xs w-5 text-center font-semibold ${
              entry.rank <= 3 ? "text-butter" : "text-fg/40"
            }`}
          >
            {entry.rank}
          </span>
          <Avatar name={entry.name} size={28} />
          <span
            className={`text-sm flex-1 ${entry.isYou ? "text-fg font-semibold" : "text-fg/60"}`}
          >
            {entry.isYou ? `${entry.name} (You)` : entry.name}
          </span>
          <span className="text-xs text-fg/40">{entry.xp.toLocaleString()} XP</span>
        </div>
      ))}
    </div>
  );
}