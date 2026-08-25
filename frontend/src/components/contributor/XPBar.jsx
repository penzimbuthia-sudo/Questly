export default function XPBar({ progress, total, tone = 'violet' }) {
  const pct = total > 0 ? Math.min(100, Math.max(0, (progress / total) * 100)) : 0

  const fillStyle =
    tone === 'gold'
      ? { background: 'linear-gradient(90deg, var(--color-amber-500), var(--color-amber-300))' }
      : { background: 'linear-gradient(90deg, var(--color-violet-700), var(--color-violet-400))' }

  return (
    <div
      className="h-2 rounded-full overflow-hidden"
      style={{ background: 'var(--color-surface-active)' }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, ...fillStyle }} />
    </div>
  )
}
