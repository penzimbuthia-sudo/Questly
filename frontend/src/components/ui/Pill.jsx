import { STATUS_TONE } from "../../utils/constants";

const TONE_CLASSES = {
  success: "bg-success/15 text-success",
  danger: "bg-danger/15 text-danger",
  warning: "bg-butter/20 text-butter-dark",
  info: "bg-royal/15 text-royal",
  neutral: "bg-fg/10 text-fg/70",
};

export default function Pill({ children, tone, status, className = "" }) {

  const resolved = tone || STATUS_TONE[status] || "neutral";
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold
        px-2.5 py-1 rounded-full whitespace-nowrap ${TONE_CLASSES[resolved]} ${className}`}
    >
      {children ?? status}
    </span>
  );
}