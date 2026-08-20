import { useState } from "react";
import PodiumCard from "../../components/learner/PodiumCard";
import LeaderboardRow from "../../components/learner/LeaderboardRow";

const TABS = ["This week", "This month", "All time"];

const RANKINGS = {
  "This week": [
    { rank: 1, name: "Aisha K.", xp: 4820, trend: "up" },
    { rank: 2, name: "Brian O.", xp: 4560, trend: "down" },
    { rank: 3, name: "Penzi M.", xp: 4230, trend: "up", isCurrentUser: true },
    { rank: 4, name: "Chinedu M.", xp: 3980, trend: "down" },
    { rank: 5, name: "Damilola A.", xp: 3710, trend: "up" },
    { rank: 6, name: "Grace W.", xp: 3420, trend: "down" },
    { rank: 7, name: "Kwame B.", xp: 3105, trend: "flat" },
    { rank: 8, name: "Amara N.", xp: 2890, trend: "up" },
  ],
};
RANKINGS["This month"] = RANKINGS["This week"];
RANKINGS["All time"] = RANKINGS["This week"];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("This week");
  const ranked = RANKINGS[activeTab];
  const [first, second, third, ...rest] = ranked;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Leaderboard</h1>
        <p className="mt-1 text-sm text-neutral-500">See how you stack up against the rest of the community.</p>
      </div>

      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              activeTab === tab ? "bg-purple-600 text-white" : "bg-white text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-neutral-900 p-8">
        <div className="mx-auto flex max-w-md items-end justify-center gap-6">
          <PodiumCard place={2} {...second} />
          <PodiumCard place={1} {...first} />
          <PodiumCard place={3} {...third} />
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white px-4">
        {rest.map((entry) => (
          <LeaderboardRow key={entry.rank} {...entry} />
        ))}
      </div>
    </div>
  );
}
