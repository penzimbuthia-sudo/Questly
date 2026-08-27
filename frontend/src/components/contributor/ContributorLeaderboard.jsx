import Avatar from '../ui/Avatar'

export default function ContributorLeaderboard({ rows, title = 'Top contributors' }) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      {title && <h3 className="font-display font-semibold text-[15px] mb-3">{title}</h3>}
      <ul className="flex flex-col gap-1">
        {rows.map((row) => (
          <li
            key={row.rank}
            className="flex items-center gap-3 rounded-lg px-2 py-2"
            style={row.isYou ? { background: 'rgba(139,92,246,0.14)' } : {}}
          >
            <span
              className="w-5 text-xs font-bold font-mono"
              style={{ color: row.rank <= 3 ? 'var(--color-amber-300)' : 'var(--color-ink-3)' }}
            >
              {row.rank}
            </span>
            <Avatar initials={row.initials} size={28} />
            <span className="flex-1 text-[13.5px] font-medium truncate">
              {row.name} {row.isYou && <span style={{ color: 'var(--color-ink-2)' }}>(You)</span>}
            </span>
            <span className="text-[13px] font-mono" style={{ color: 'var(--color-ink-2)' }}>
              {row.xp.toLocaleString()} XP
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}