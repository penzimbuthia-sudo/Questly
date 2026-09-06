import { useEffect, useState } from "react";
import PodiumCard from "../../components/learner/PodiumCard";
import LeaderboardRow from "../../components/learner/LeaderboardRow";
import { getLeaderboard } from "../../services/gamificationService";
import { useAuth } from "../../hooks/useAuth";

export default function Leaderboard() {
  const { user } = useAuth();
  const [ranked, setRanked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLeaderboard("learner")
      .then((entries) => {
        setRanked(entries.map((entry) => ({
          ...entry,
          isCurrentUser: entry.id === (user?.id ?? user?.sub),
        })));
        setError("");
      })
      .catch((requestError) => setError(requestError.message || "Unable to load the leaderboard."))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const [first, second, third, ...rest] = ranked;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Leaderboard</h1>
        <p className="mt-1 text-sm text-neutral-500">See how you stack up against the rest of the community.</p>
      </div>

      <p className="w-fit rounded-full bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700">All-time learner rankings</p>

      {error && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {loading && <p className="text-sm text-neutral-500">Loading leaderboard...</p>}

      {!loading && ranked.length >= 3 && <div className="rounded-2xl bg-neutral-900 p-8">
        <div className="mx-auto flex max-w-md items-end justify-center gap-6">
          <PodiumCard place={2} {...second} />
          <PodiumCard place={1} {...first} />
          <PodiumCard place={3} {...third} />
        </div>
      </div>}

      {!loading && ranked.length === 0 && <div className="rounded-2xl border border-black/5 bg-white p-6 text-sm text-neutral-500">No learner rankings yet. Earn XP to appear here.</div>}

      {!loading && ranked.length > 0 && ranked.length < 3 && <div className="rounded-2xl border border-black/5 bg-white px-4">
        {ranked.map((entry) => <LeaderboardRow key={entry.id} {...entry} />)}
      </div>}

      {!loading && rest.length > 0 && <div className="rounded-2xl border border-black/5 bg-white px-4">
        {rest.map((entry) => (
          <LeaderboardRow key={entry.rank} {...entry} />
        ))}
      </div>}
    </div>
  );
}
