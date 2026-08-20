import { Target } from 'lucide-react'
import XPBar from './XPBar'

export default function ChallengeCard({ challenge, compact = false }) {
  const { title, description, progress, total, reward } = challenge
  const complete = progress >= total

  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-3.5"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 grid place-items-center rounded-full shrink-0"
          style={{ background: 'rgba(139,92,246,0.16)', color: 'var(--color-violet-400)' }}
        >
          <Target size={13.5} strokeWidth={2.5} />
        </div>
        <h3 className="font-medium text-[14.5px]">{title}</h3>
      </div>

      {!compact && (
        <p className="text-[13px] -mt-1.5" style={{ color: 'var(--color-ink-2)' }}>{description}</p>
      )}

      <XPBar progress={progress} total={total} tone={complete ? 'gold' : 'violet'} />

      <div className="flex items-center justify-between text-xs">
        <span style={{ color: 'var(--color-ink-2)' }}>{progress}/{total} complete</span>
        <span className="font-semibold" style={{ color: 'var(--color-amber-300)' }}>{reward}</span>
      </div>
    </div>
  )
}
