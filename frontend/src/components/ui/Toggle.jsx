export default function Toggle({ on, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={onChange}
      className={`w-10 h-6 rounded-full relative shrink-0 transition-colors
        ${on ? "bg-royal" : "bg-fg/15"}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {/* The little circle that slides left/right */}
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-ivory transition-all"
        style={{ left: on ? "18px" : "2px" }}
      />
    </button>
  );
}