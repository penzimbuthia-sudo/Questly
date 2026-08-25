const STATUS_STYLES = {
  published: { bg: 'rgba(139,92,246,0.14)', color: 'var(--color-violet-400)', label: 'Published' },
  pending: { bg: 'rgba(240,192,75,0.14)', color: 'var(--color-amber-300)', label: 'Pending review' },
  rejected: { bg: 'rgba(239,68,68,0.14)', color: '#f87171', label: 'Rejected' },
  draft: { bg: 'var(--color-surface-active)', color: 'var(--color-ink-2)', label: 'Draft' },
}

export default function StatusPill({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.draft

  return (
    <span
      className="text-[11px] font-semibold uppercase tracking-wide rounded-full px-2.5 py-1 shrink-0"
      style={{ background: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  )
}
