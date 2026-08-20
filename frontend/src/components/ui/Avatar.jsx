const TONE = {
  royal: "bg-tone-info-bg text-tone-info-fg",
  butter: "bg-tone-warning-bg text-tone-warning-fg",
  neutral: "bg-fg/10 text-fg/70",
};

export default function Avatar({ name, initials, tone = "royal", size = 32 }) {
  const label =
    initials ||
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div
      className={`rounded-full flex items-center justify-center shrink-0 font-bold ${TONE[tone]}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {label}
    </div>
  );
}