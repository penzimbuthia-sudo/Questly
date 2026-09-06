import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout";
import { ChallengeCard } from "@/components/contributor";
import { getChallenges } from "@/services/gamificationService";
import { sampleChallenges } from "@/data/challenges";

export default function Challenges() {
  
  const [challenges, setChallenges] = useState(sampleChallenges);

  useEffect(() => {
    getChallenges()
      .then(setChallenges)
      .catch(() => {
      });
  }, []);

  return (
    <div>
      <PageHeader title="Challenges" subtitle="Complete challenges to earn bonus XP and badges." />
      <div className="grid grid-cols-2 gap-4">
        {challenges.map((c) => (
          <ChallengeCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}