import { ChevronRight } from "lucide-react";

export default function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-semibold text-fg">{title}</h2>
      {actionLabel && (
        <button
          onClick={onAction}
          className="text-xs font-semibold text-royal flex items-center gap-0.5"
        >
          {actionLabel}
          <ChevronRight size={13} />
        </button>
      )}
    </div>
  );
}