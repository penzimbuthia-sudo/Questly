import { useEffect, useState } from "react";
import PodiumCard from "../../components/learner/PodiumCard";
import LeaderboardRow from "../../components/learner/LeaderboardRow";
import { getLeaderboard } from "../../services/gamificationService";

export default function Leaderboard() {
  const [ranked, setRanked] = useState([]);

  useEffect(() => {
    getLeaderboard().then(setRanked);
  }, []);

  const [first, second, third, ...rest] = ranked;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Leaderboard</h1>
        <p className="mt-1 text-sm text-neutral-500">See how you stack up against the rest of the community.</p>
      </div>

      {ranked.length >= 3 && <div className="rounded-2xl bg-neutral-900 p-8">
        <div className="mx-auto flex max-w-md items-end justify-center gap-6">
          <PodiumCard place={2} {...second} />
          <PodiumCard place={1} {...first} />
          <PodiumCard place={3} {...third} />
        </div>
      </div>}

      <div className="rounded-2xl border border-black/5 bg-white px-4">
        {rest.map((entry) => (
          <LeaderboardRow key={entry.rank} {...entry} />
        ))}
        {ranked.length === 0 && <p className="p-6 text-sm text-neutral-500">No learner rankings yet.</p>}
      </div>
    </div>
  );
}
