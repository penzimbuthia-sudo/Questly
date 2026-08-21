export default function StatCard({ icon: Icon, label, value, delta, tone = 'violet' }) {
  const tint =
    tone === 'gold'
      ? { color: 'var(--color-amber-300)', bg: 'rgba(240,192,75,0.12)' }
      : { color: 'var(--color-violet-400)', bg: 'rgba(139,92,246,0.14)' }

  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-4"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 grid place-items-center rounded-lg" style={{ background: tint.bg, color: tint.color }}>
          <Icon size={17} strokeWidth={2.25} />
        </div>
        {delta && (
          <span className="text-xs font-medium" style={{ color: 'var(--color-amber-300)' }}>
            {delta}
          </span>
        )}
      </div>
      <div>
        <p className="font-display text-[28px] font-bold leading-none tracking-tight">{value}</p>
        <p className="text-[13px] mt-1.5" style={{ color: 'var(--color-ink-2)' }}>{label}</p>
      </div>
    </div>
  )
}
