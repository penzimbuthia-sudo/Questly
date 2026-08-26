export default function Toggle({ on, checked, onChange, disabled = false, label }) {
  // Accepts either `on` or `checked` for the current value — different
  // callers in the app use different naming — and always calls
  // `onChange(nextBooleanValue)` rather than the raw click event, since
  // that's the shape every current caller's state updater expects.
  const isOn = checked ?? on ?? false;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!isOn)}
      className={`w-10 h-6 rounded-full relative shrink-0 transition-colors
        ${isOn ? "bg-royal" : "bg-fg/15"}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {/* The little circle that slides left/right */}
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-ivory transition-all"
        style={{ left: isOn ? "18px" : "2px" }}
      />
    </button>
  );
}
