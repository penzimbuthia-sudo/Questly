import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout";
import { ChallengeCard } from "@/components/contributor";
import { getChallenges, joinChallenge } from "@/services/gamificationService";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getChallenges()
      .then((serverChallenges) => {
        setError("");
        setChallenges(serverChallenges);
      })
      .catch((requestError) => {
        setChallenges([]);
        setError(requestError.message || "Unable to load challenges right now.");
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleJoin(challengeId) {
    const result = await joinChallenge(challengeId);
    const joinedId = result?.challenge?.id ?? challengeId;
    setChallenges((current) =>
      current.map((challenge) =>
        challenge.id === joinedId ? { ...challenge, joined: true, progress: result?.progress ?? challenge.progress } : challenge
      )
    );
  }

  return (
    <div>
      <PageHeader title="Challenges" subtitle="Join a challenge to earn bonus XP and badges." />
      {error && <p className="text-sm text-danger mb-4">{error}</p>}
      {!loading && !error && challenges.length === 0 && (
        <p className="text-sm text-fg/50">No challenges are running right now — check back soon.</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} {...challenge} onJoin={() => handleJoin(challenge.id)} />
        ))}
      </div>
    </div>
  );
}