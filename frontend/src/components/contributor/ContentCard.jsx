import { Video, FileText, BookOpen, Eye, ThumbsUp } from 'lucide-react'
import StatusPill from './StatusPill'

const ICONS = { video: Video, article: FileText, path: BookOpen }
const TINTS = {
  video: { bg: 'rgba(139,92,246,0.14)', color: 'var(--color-violet-400)' },
  article: { bg: 'rgba(240,192,75,0.14)', color: 'var(--color-amber-300)' },
  path: { bg: 'rgba(246,245,250,0.10)', color: 'var(--color-ink-0)' },
}

export default function ContentCard({ item }) {
  const Icon = ICONS[item.type]
  const tint = TINTS[item.type]

  return (
    <div
      className="group rounded-2xl border p-5 flex flex-col gap-4 transition-colors hover:border-[var(--color-violet-600)]"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 grid place-items-center rounded-lg" style={{ background: tint.bg, color: tint.color }}>
          <Icon size={17} strokeWidth={2.25} />
        </div>
        <StatusPill status={item.status} />
      </div>

      <h3 className="font-medium text-[15px] leading-snug -mt-1">{item.title}</h3>

      <div className="mt-auto flex items-center justify-between text-[13px]" style={{ color: 'var(--color-ink-2)' }}>
        <div className="flex items-center gap-3.5">
          <span className="flex items-center gap-1"><Eye size={13} /> {item.views.toLocaleString()}</span>
          <span className="flex items-center gap-1"><ThumbsUp size={13} /> {item.upvotes}</span>
        </div>
        <span>{item.updated}</span>
      </div>
    </div>
  )
}
