export default function Card({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`rounded-2xl bg-card border border-line/10 ${className}`}
    >
      {children}
    </div>
  );
}