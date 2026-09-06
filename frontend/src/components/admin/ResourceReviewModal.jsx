import { Check, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui";
import Modal from "@/components/ui/Modal";

export default function ResourceReviewModal({ resource, onClose, onDecision, saving = false }) {
  if (!resource) return null;

  return (
    <Modal open title="Read resource before review" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-lg font-bold text-fg">{resource.title}</p>
          <p className="mt-1 text-xs text-fg/50">
            {resource.type} · Submitted by {resource.submitted_by ?? "Unknown"}
          </p>
        </div>
        <div className="rounded-xl border border-line/10 bg-page p-4">
          <p className="text-sm leading-6 text-fg/80">{resource.description || "No description was provided."}</p>
        </div>
        {resource.url && (
          <a href={resource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:underline">
            Open submitted resource <ExternalLink size={14} />
          </a>
        )}
        <div className="flex gap-3 border-t border-line/10 pt-4">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose} disabled={saving}>Close</Button>
          {resource.status === "Pending" && (
            <>
              <Button type="button" variant="outline" className="flex-1" onClick={() => onDecision("Rejected")} disabled={saving}><X size={14} /> Reject</Button>
              <Button type="button" variant="butter" className="flex-1" onClick={() => onDecision("Published")} disabled={saving}><Check size={14} /> Approve</Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}