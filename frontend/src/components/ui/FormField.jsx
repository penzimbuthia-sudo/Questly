export default function FormField({ label, error, type = "text", as = "input", ...rest }) {
  const Tag = as === "textarea" ? "textarea" : "input";
  const inputType = as === "textarea" ? undefined : type;

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-fg/60">{label}</label>}
      <Tag
        type={inputType}
        className={`w-full rounded-lg px-3 py-2 text-sm bg-page border outline-none text-fg
          placeholder:text-fg/30 focus:border-royal
          ${error ? "border-danger" : "border-line/15"}`}
        {...rest}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}