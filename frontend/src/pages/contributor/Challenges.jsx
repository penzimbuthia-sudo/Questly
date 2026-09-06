import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout";
import { ChallengeCard } from "@/components/contributor";
import { getChallenges, joinChallenge } from "@/services/gamificationService";
import { sampleChallenges } from "@/data/challenges";

export default function Challenges() {
  
  const [challenges, setChallenges] = useState(sampleChallenges);
  const [error, setError] = useState("");

  useEffect(() => {
    getChallenges()
      .then((serverChallenges) => {
        setError("");
        setChallenges(Array.isArray(serverChallenges) && serverChallenges.length ? serverChallenges : sampleChallenges);
      })
      .catch((requestError) => {
        setChallenges(sampleChallenges);
        setError(requestError.message || "Live challenges are unavailable. Showing sample challenges.");
      });
  }, []);

  async function handleJoin(challengeId) {
    try {
      const result = await joinChallenge(challengeId);
      const joinedId = result?.challenge?.id ?? challengeId;
      setChallenges((current) => current.map((challenge) => (
        challenge.id === joinedId ? { ...challenge, joined: true, progress: result?.progress ?? challenge.progress } : challenge
      )));
      setError("");
    } catch (requestError) {
      setError(requestError.message || "Unable to join this challenge.");
    }
  }

  return (
    <div>
      <PageHeader title="Challenges" subtitle="Complete challenges to earn bonus XP and badges." />
      {error && <p className="mb-4 rounded-lg border border-butter/30 bg-butter/10 px-4 py-3 text-sm text-fg">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            {...challenge}
            goal={challenge.goal ?? challenge.target ?? 1}
            onJoin={challenge.id && Number.isInteger(Number(challenge.id)) ? () => handleJoin(challenge.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
}