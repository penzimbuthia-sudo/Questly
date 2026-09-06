import { Trophy } from "lucide-react";
import { Card, Pill } from "@/components/ui";

export default function ChallengeAdminCard({ title, period, participants, reward, status }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-royal/15 flex items-center justify-center">
            <Trophy size={16} className="text-royal" />
          </div>
          <div>
            <div className="text-sm font-semibold text-fg">{title}</div>
            <div className="text-xs text-fg/50 mt-0.5">{period}</div>
          </div>
        </div>
        <Pill status={status} />
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-line/10">
        <div>
          <div className="text-xs text-fg/50">Participants</div>
          <div className="text-sm font-semibold text-fg mt-0.5">
            {participants.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-fg/50">Reward</div>
          <div className="text-sm font-semibold text-butter mt-0.5">{reward}</div>
        </div>
      </div>
    </Card>
  );
}