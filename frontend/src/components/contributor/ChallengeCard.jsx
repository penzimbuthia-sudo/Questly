import { Target } from "lucide-react";
import { Card, ProgressBar } from "@/components/ui";

export default function ChallengeCard({ title, description, progress, goal, reward }) {
  const hasProgress = typeof progress === "number" && typeof goal === "number" && goal > 0;

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-2">
        <Target size={16} className="text-royal" />
        <span className="text-sm font-semibold text-fg">{title}</span>
      </div>

      <p className="text-xs text-fg/50 mb-3">{description}</p>

      {hasProgress && (
        <>
          <ProgressBar value={progress} max={goal} color="royal" />
          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] text-fg/40">
              {progress}/{goal} complete
            </span>
            <span className="text-[11px] font-medium text-butter">{reward}</span>
          </div>
        </>
      )}

      {!hasProgress && reward && (
        <div className="flex justify-end">
          <span className="text-[11px] font-medium text-butter">{reward}</span>
        </div>
      )}
    </Card>
  );
}