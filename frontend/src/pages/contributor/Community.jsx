import { MessageCircle } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import Avatar from '../../components/ui/Avatar'
import { communityActivity, engagementSnapshot } from '../../data/mockData'

export default function Community() {
  return (
    <div>
      <PageHeader
        eyebrow="Contributor workspace"
        title="Community activity on your work"
        subtitle="See how learners are engaging with what you've shared."
      />

      <div className="grid lg:grid-cols-5 gap-4">
        <div
          className="lg:col-span-3 rounded-2xl border divide-y"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {communityActivity.map((a) => (
            <div key={a.id} className="flex items-start gap-3 p-4" style={{ borderColor: 'var(--color-border-soft)' }}>
              <Avatar initials={a.initials} size={34} />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px]">
                  <span className="font-semibold">{a.name}</span>{' '}
                  <span style={{ color: 'var(--color-ink-1)' }}>{a.action}</span>{' '}
                  <span className="font-medium" style={{ color: 'var(--color-amber-300)' }}>{a.target}</span>
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-ink-3)' }}>{a.time}</p>
              </div>
              <button
                aria-label="Reply"
                className="focus-ring grid place-items-center w-8 h-8 rounded-lg shrink-0 text-(--color-ink-2) hover:text-white hover:bg-(--color-surface-hover)"
              >
                <MessageCircle size={15} />
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div
            className="rounded-2xl border p-5"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <h3 className="font-display font-semibold text-[15px] mb-4">Engagement snapshot</h3>
            <dl className="flex flex-col gap-3 text-[13.5px]">
              <div className="flex items-center justify-between">
                <dt style={{ color: 'var(--color-ink-2)' }}>Comments this week</dt>
                <dd className="font-semibold">{engagementSnapshot.commentsThisWeek}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt style={{ color: 'var(--color-ink-2)' }}>Questions answered</dt>
                <dd className="font-semibold">{engagementSnapshot.questionsAnswered}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt style={{ color: 'var(--color-ink-2)' }}>Avg. response time</dt>
                <dd className="font-semibold">{engagementSnapshot.avgResponseTime}</dd>
              </div>
              <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border-soft)' }}>
                <dt className="mb-1" style={{ color: 'var(--color-ink-2)' }}>Most discussed</dt>
                <dd className="font-medium" style={{ color: 'var(--color-amber-300)' }}>{engagementSnapshot.mostDiscussed}</dd>
              </div>
            </dl>
          </div>

          <div
            className="rounded-2xl border p-5"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <h3 className="font-display font-semibold text-[15px] mb-4 flex items-center gap-1.5">
              Frequent commenters
            </h3>
            <ul className="flex flex-col gap-3">
              {engagementSnapshot.frequentCommenters.map((c) => (
                <li key={c.name} className="flex items-center gap-3">
                  <Avatar initials={c.initials} size={30} />
                  <span className="text-[13.5px] font-medium">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
