import { useState } from "react";
import { Target, Check } from "lucide-react";
import { Card, ProgressBar, Button } from "@/components/ui";

export default function ChallengeCard({ title, description, progress = 0, goal = 1, reward, reward_xp, joined, completed, onJoin }) {
  const [isJoining, setIsJoining] = useState(false);
  const rewardLabel = reward || (reward_xp ? `${reward_xp} XP` : "Bonus XP");

  async function handleJoin() {
    setIsJoining(true);
    try {
      await onJoin();
    } finally {
      setIsJoining(false);
    }
  }

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-2">
        {completed ? <Check size={16} className="text-success" /> : <Target size={16} className="text-royal" />}
        <span className="text-sm font-semibold text-fg">{title}</span>
      </div>

      <p className="text-xs text-fg/50 mb-3">{description}</p>

      <ProgressBar value={progress} max={goal} color="royal" />

      <div className="flex items-center justify-between mt-2">
        <span className="text-[11px] text-fg/40">
          {progress}/{goal} complete
        </span>
        <span className="text-[11px] font-medium text-butter">{rewardLabel}</span>
      </div>
      {onJoin && !completed && (
        <Button
          type="button"
          variant={joined ? "outline" : "primary"}
          size="sm"
          className="mt-3 w-full"
          onClick={handleJoin}
          disabled={joined || isJoining}
        >
          {joined ? "Challenge joined" : isJoining ? "Joining..." : "Join challenge"}
        </Button>
      )}
    </Card>
  );
}