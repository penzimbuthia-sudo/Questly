import { Flame } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import ChallengeCard from '../../components/contributor/ChallengeCard'
import { contributorChallenges, challengeStats } from '../../data/mockData'

export default function Challenges() {
  return (
    <div>
      <PageHeader
        eyebrow="Contributor workspace"
        title="Contributor challenges"
        subtitle="Complete quests to earn bonus XP and badges."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {contributorChallenges.map((c) => (
          <ChallengeCard key={c.id} challenge={c} />
        ))}
      </div>

      <h2 className="font-display font-semibold text-[15px] mb-3">Challenge stats</h2>
      <div
        className="rounded-2xl border divide-y mb-4"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        {[
          ['Active challenges', challengeStats.active],
          ['XP up for grabs', `${challengeStats.xpUpForGrabs.toLocaleString()} XP`, true],
          ['Completed this month', challengeStats.completedThisMonth],
        ].map(([label, value, gold]) => (
          <div key={label} className="flex items-center justify-between px-5 py-3.5" style={{ borderColor: 'var(--color-border-soft)' }}>
            <span className="text-[13.5px]" style={{ color: 'var(--color-ink-2)' }}>{label}</span>
            <span className="font-semibold text-[14px]" style={{ color: gold ? 'var(--color-amber-300)' : 'var(--color-ink-0)' }}>{value}</span>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl border p-5 flex items-start gap-3"
        style={{ background: 'linear-gradient(135deg, rgba(240,192,75,0.10), rgba(139,92,246,0.06))', borderColor: 'var(--color-border)' }}
      >
        <div className="w-9 h-9 shrink-0 grid place-items-center rounded-lg" style={{ background: 'rgba(240,192,75,0.16)', color: 'var(--color-amber-300)' }}>
          <Flame size={16} />
        </div>
        <div>
          <p className="font-medium text-[14px]">Keep your streak</p>
          <p className="text-[13px] mt-0.5" style={{ color: 'var(--color-ink-2)' }}>{challengeStats.streakNote}</p>
        </div>
      </div>
    </div>
  )
}
