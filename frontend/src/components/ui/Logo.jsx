import { Sparkles } from "lucide-react";

const SIZES = {
  sm: { box: "w-6 h-6", icon: 12, text: "text-sm" },
  md: { box: "w-7 h-7", icon: 14, text: "text-base" },
  lg: { box: "w-8 h-8", icon: 16, text: "text-lg" },
};

export default function Logo({ size = "md", showWordmark = true, className = "" }) {
  const s = SIZES[size];
  return (
    <div className={`flex items-center gap-2 min-w-0 ${className}`}>
      <div
        className={`${s.box} rounded-lg flex items-center justify-center shrink-0 bg-linear-to-br from-royal to-butter`}
      >
        <Sparkles size={s.icon} className="text-ink" strokeWidth={2.5} />
      </div>
      {showWordmark && (
        <span className={`${s.text} truncate text-ivory font-extrabold tracking-tight`}>
          Questly
        </span>
      )}
    </div>
  );
}