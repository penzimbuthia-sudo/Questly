const VARIANTS = {
  primary: "bg-royal text-ivory hover:opacity-90",
  butter: "bg-butter text-ink hover:opacity-90",
  outline: "bg-transparent text-fg border border-line/15 hover:bg-fg/5",
  ghost: "bg-transparent text-fg/70 hover:bg-fg/5",
};

const SIZES = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-xl font-semibold
        whitespace-nowrap transition-opacity disabled:opacity-40
        disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </button>
  );
}