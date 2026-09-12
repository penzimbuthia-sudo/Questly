import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout";
import { ChallengeCard } from "@/components/contributor";
import { getChallenges } from "@/services/gamificationService";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    getChallenges()
      .then(setChallenges)
      .catch(() => setChallenges([]));
  }, []);

  return (
    <div>
      <PageHeader title="Challenges" subtitle="Complete challenges to earn bonus XP and badges." />
      {challenges.length === 0 ? (
        <p className="mt-4 text-sm text-fg/50">No challenges available right now — check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {challenges.map((c) => (
            <ChallengeCard
              key={c.id}
              title={c.title}
              description={c.description}
              reward={c.reward_xp ? `+${c.reward_xp} XP` : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}