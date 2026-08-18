const FILL = {
  butter: "bg-butter",
  royal: "bg-royal",
  success: "bg-success",
};

export default function ProgressBar({
  value,
  max = 100,
  color = "butter",
  height = "h-2",
  className = "",
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`w-full ${height} rounded-full bg-fg/8 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full ${FILL[color]} transition-all`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}