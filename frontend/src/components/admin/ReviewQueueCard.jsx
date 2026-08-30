import { Check, X } from "lucide-react";
import { Avatar, Button } from "@/components/ui";

export default function ReviewQueueCard({ title, typeLabel, submittedBy, onApprove, onReject }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-alt">
      <Avatar name={submittedBy} size={34} />

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-fg truncate">{title}</div>
        <div className="text-xs text-fg/50 mt-0.5">
          {typeLabel} · Submitted by {submittedBy}
        </div>
      </div>

      <Button variant="butter" size="sm" onClick={onApprove}>
        <Check size={13} /> Approve
      </Button>
      <Button variant="outline" size="sm" onClick={onReject}>
        <X size={13} /> Reject
      </Button>
    </div>
  );
}