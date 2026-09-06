import { useEffect, useState } from "react";
import { getChallenges, joinChallenge } from "../../services/gamificationService";
import { toast } from "sonner";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => { getChallenges().then(setChallenges); }, []);

  async function handleJoin(challenge) {
    try {
      await joinChallenge(challenge.id);
      setChallenges((current) => current.map((item) => item.id === challenge.id ? { ...item, joined: true } : item));
      toast.success("Joined challenge!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Challenges</h1>
        <p className="mt-1 text-sm text-neutral-500">Weekly and seasonal quests that reward bonus XP and badges.</p>
      </div>

      {challenges.length > 0 && <section>
        <h2 className="text-base font-semibold text-neutral-900">Challenges</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="rounded-2xl border border-black/5 bg-white p-6">
              <p className="font-semibold text-neutral-900">{challenge.title}</p>
              <p className="mt-1 text-sm text-neutral-500">{challenge.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-amber-600">+{challenge.reward_xp} XP</span>
                <span className="text-sm text-neutral-400">{challenge.status}</span>
              </div>
              <button type="button" disabled={challenge.joined} onClick={() => handleJoin(challenge)} className="mt-3 w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white disabled:bg-neutral-200 disabled:text-neutral-500">
                {challenge.joined ? "Joined" : "Join challenge"}
              </button>
            </div>
          ))}
        </div>
      </section>}
    </div>
  );
}
