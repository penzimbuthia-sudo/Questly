export default function FormField({ label, error, type = "text", as = "input", children, ...rest }) {
  const baseClass = `w-full rounded-lg px-3 py-2 text-sm bg-page border outline-none text-fg
    placeholder:text-fg/30 focus:border-royal
    ${error ? "border-danger" : "border-line/15"}`;

  let field;
  if (as === "textarea") {
    field = <textarea className={baseClass} {...rest} />;
  } else if (as === "select") {
    field = <select className={baseClass} {...rest}>{children}</select>;
  } else {
    field = <input type={type} className={baseClass} {...rest} />;
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-fg/60">{label}</label>}
      {field}
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}