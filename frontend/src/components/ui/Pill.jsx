import { STATUS_TONE } from "../../utils/constants";

const TONE_CLASSES = {
  success: "bg-tone-success-bg text-tone-success-fg",
  danger: "bg-tone-danger-bg text-tone-danger-fg",
  warning: "bg-tone-warning-bg text-tone-warning-fg",
  info: "bg-tone-info-bg text-tone-info-fg",
  neutral: "bg-fg/10 text-fg/70",
};

export default function Pill({ children, tone, status, className = "" }) {
  const resolvedTone = tone || STATUS_TONE[status] || "neutral";
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold
        px-2.5 py-1 rounded-full whitespace-nowrap ${TONE_CLASSES[resolvedTone]} ${className}`}
    >
      {children ?? status}
    </span>
  );
}