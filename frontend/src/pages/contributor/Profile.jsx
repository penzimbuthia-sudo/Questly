import { Rocket, Star, ShieldCheck, TrendingUp, Crown, Flame, Award } from 'lucide-react'
import PageHeader from '../../components/contributor/PageHeader'
import Avatar from '../../components/contributor/Avatar'
import { currentUser, badges, contributorStats, nextMilestone } from '../../data/mockData'

const ICONS = { Rocket, Star, ShieldCheck, TrendingUp, Crown, Flame }

export default function Profile() {
  return (
    <div>
      <PageHeader eyebrow="Contributor workspace" title="Profile" subtitle="Your public presence in the Questly community." />

      <div
        className="rounded-2xl border p-6 flex items-center gap-4 mb-8"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <Avatar initials={currentUser.initials} size={56} ring />
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-bold text-lg">{currentUser.name}</h2>
          <p className="text-[13.5px]" style={{ color: 'var(--color-ink-2)' }}>{currentUser.role} · Level {currentUser.level}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display text-xl font-bold" style={{ color: 'var(--color-amber-300)' }}>{currentUser.xp.toLocaleString()} XP</p>
          <p className="text-xs" style={{ color: 'var(--color-ink-2)' }}>Rank #{currentUser.rank}</p>
        </div>
      </div>

      <h3 className="font-display font-semibold text-[15px] mb-3">Badges</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {badges.map((b) => {
          const Icon = ICONS[b.icon] || Award
          return (
            <div
              key={b.id}
              className="rounded-2xl border p-5 flex items-center gap-4 transition-opacity"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                opacity: b.earned ? 1 : 0.45,
              }}
            >
              <div
                className="w-11 h-11 shrink-0 grid place-items-center rounded-full"
                style={{
                  background: b.earned ? 'rgba(240,192,75,0.16)' : 'var(--color-surface-active)',
                  color: b.earned ? 'var(--color-amber-300)' : 'var(--color-ink-3)',
                }}
              >
                <Icon size={19} />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-[14px]">{b.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-3)' }}>{b.criteria}</p>
              </div>
            </div>
          )
        })}
      </div>

      <h3 className="font-display font-semibold text-[15px] mb-3">Contributor stats</h3>
      <div
        className="rounded-2xl border divide-y mb-4"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        {[
          ['Resources shared', contributorStats.resourcesShared],
          ['Learning paths', contributorStats.learningPaths],
          ['Total upvotes', contributorStats.totalUpvotes],
          ['Badges earned', contributorStats.badgesEarned],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between px-5 py-3.5" style={{ borderColor: 'var(--color-border-soft)' }}>
            <span className="text-[13.5px]" style={{ color: 'var(--color-ink-2)' }}>{label}</span>
            <span className="font-semibold text-[14px]">{value}</span>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl border p-5 flex items-start gap-3"
        style={{ background: 'linear-gradient(135deg, rgba(240,192,75,0.10), rgba(139,92,246,0.06))', borderColor: 'var(--color-border)' }}
      >
        <div className="w-9 h-9 shrink-0 grid place-items-center rounded-lg" style={{ background: 'rgba(240,192,75,0.16)', color: 'var(--color-amber-300)' }}>
          <Crown size={16} />
        </div>
        <div>
          <p className="font-medium text-[14px]">Next milestone</p>
          <p className="text-[13px] mt-0.5" style={{ color: 'var(--color-ink-2)' }}>{nextMilestone}</p>
        </div>
      </div>
    </div>
  )
}
