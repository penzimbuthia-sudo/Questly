const TONES = {
  violet: 'linear-gradient(90deg, var(--color-violet-700), var(--color-violet-400))',
  gold: 'linear-gradient(90deg, var(--color-amber-500), var(--color-amber-300))',
}

export default function XPBar({ progress = 0, total = 1, tone = 'violet' }) {
  const pct = Math.min(100, Math.max(0, (progress / (total || 1)) * 100))

  return (
    <div
      className="h-2 rounded-full overflow-hidden"
      style={{ background: 'var(--color-surface-active)' }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, background: TONES[tone] || TONES.violet }}
      />
    </div>
  )
}
