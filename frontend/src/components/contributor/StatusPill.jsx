const STYLES = {
  published: { bg: 'var(--color-tone-success-bg)', color: 'var(--color-tone-success-fg)', label: 'Published' },
  pending: { bg: 'var(--color-tone-warning-bg)', color: 'var(--color-tone-warning-fg)', label: 'Pending' },
  draft: { bg: 'var(--color-tone-info-bg)', color: 'var(--color-tone-info-fg)', label: 'Draft' },
  rejected: { bg: 'var(--color-tone-danger-bg)', color: 'var(--color-tone-danger-fg)', label: 'Rejected' },
}

export default function StatusPill({ status }) {
  const style = STYLES[status] || { bg: 'var(--color-surface-active)', color: 'var(--color-ink-2)', label: status }

  return (
    <span
      className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap capitalize"
      style={{ background: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  )
}
