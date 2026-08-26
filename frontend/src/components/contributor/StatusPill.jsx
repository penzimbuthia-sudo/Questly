const STATUS_STYLES = {
  approved: { bg: 'rgba(34,197,94,0.14)', color: '#4ADE80', label: 'Approved' },
  published: { bg: 'rgba(34,197,94,0.14)', color: '#4ADE80', label: 'Published' },
  pending: { bg: 'rgba(240,192,75,0.16)', color: 'var(--color-amber-300)', label: 'Pending review' },
  rejected: { bg: 'rgba(248,113,113,0.14)', color: '#F87171', label: 'Rejected' },
};

/**
 * StatusPill
 * Small status badge for content review state. Was missing entirely —
 * built from its one call site: components/contributor/ContentCard.jsx
 * (`<StatusPill status={item.status} />`, where status is currently one
 * of 'pending' | 'approved' | 'rejected' per data/mockData.js).
 */
export default function StatusPill({ status }) {
  const style = STATUS_STYLES[status] ?? { bg: 'var(--color-surface-active)', color: 'var(--color-ink-2)', label: status };

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize"
      style={{ background: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  );
}
