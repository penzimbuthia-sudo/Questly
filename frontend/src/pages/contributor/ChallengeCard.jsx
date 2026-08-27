import { Target, CheckCircle2 } from 'lucide-react'
import XPBar from '../../components/contributor/XPBar'

export default function ChallengeCard({ challenge, compact = false }) {
  const {
    title,
    description,
    progress,
    total,
    reward,
    difficulty,
    category
  } = challenge

  const complete = progress >= total

  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-4 shadow-sm transition-all hover:shadow-md"
      style={{
        background: 'var(--color-surface)',
        borderColor: complete
          ? 'rgba(240,192,75,0.45)'
          : 'var(--color-border)'
      }}
    >
      {/* HEADER */}
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 grid place-items-center rounded-full shrink-0"
          style={
            complete
              ? {
                  background: 'rgba(240,192,75,0.16)',
                  color: 'var(--color-amber-300)'
                }
              : {
                  background: 'rgba(139,92,246,0.16)',
                  color: 'var(--color-violet-400)'
                }
          }
        >
          {complete ? (
            <CheckCircle2 size={15} strokeWidth={2.5} />
          ) : (
            <Target size={14} strokeWidth={2.5} />
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-medium text-[14.5px] leading-tight">
            {title}
          </h3>

          {/* Difficulty + Category */}
          {!compact && (
            <div className="flex items-center gap-2 mt-1">
              {difficulty && (
                <span
                  className="text-[11px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5"
                  style={{
                    background: 'var(--color-surface-active)',
                    color: 'var(--color-ink-3)'
                  }}
                >
                  {difficulty}
                </span>
              )}

              {category && (
                <span
                  className="text-[11px] font-medium tracking-wide"
                  style={{ color: 'var(--color-ink-3)' }}
                >
                  {category}
                </span>
              )}
            </div>
          )}
        </div>

        {complete && (
          <span
            className="shrink-0 text-[11px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5"
            style={{
              background: 'rgba(240,192,75,0.14)',
              color: 'var(--color-amber-300)'
            }}
          >
            Complete
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      {!compact && (
        <p
          className="text-[13px] leading-snug"
          style={{ color: 'var(--color-ink-2)' }}
        >
          {description}
        </p>
      )}

      {/* PROGRESS BAR */}
      <XPBar
        progress={progress}
        total={total}
        tone={complete ? 'gold' : 'violet'}
      />

      {/* FOOTER */}
      <div className="flex items-center justify-between text-xs mt-1">
        <span style={{ color: 'var(--color-ink-2)' }}>
          {progress}/{total} complete
        </span>

        <span
          className="font-semibold rounded-md px-2 py-0.5"
          style={{
            background: 'rgba(240,192,75,0.14)',
            color: 'var(--color-amber-300)'
          }}
        >
          {reward}
        </span>
      </div>
    </div>
  )
}
