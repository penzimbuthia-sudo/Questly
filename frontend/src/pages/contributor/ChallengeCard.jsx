import { Target, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import XPBar from './XPBar'

export default function ChallengeCard({ challenge, compact = false }) {
  const {
    id,
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
          <Link 
            to={`/challenges/${id}`}
            className="hover:text-violet-400 transition-colors"
          >
            <h3 className="font-medium text-[14.5px] leading-tight">
              {title}
            </h3>
          </Link>

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

      {/* ACTION BUTTONS */}
      {!compact && (
        <div className="flex items-center gap-2 mt-2 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <Link
            to={`/challenges/${id}/start`}
            className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{
              background: complete 
                ? 'var(--color-ink-3)' 
                : 'linear-gradient(155deg, var(--color-violet-500), var(--color-violet-700))'
            }}
          >
            {complete ? 'View Details' : 'Start Challenge'}
          </Link>
          
          {!complete && (
            <Link
              to={`/challenges/${id}/progress`}
              className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-violet-50"
              style={{ 
                borderColor: 'var(--color-border)',
                color: 'var(--color-ink-1)'
              }}
            >
              Track Progress
            </Link>
          )}
        </div>
      )}
    </div>
  )
}