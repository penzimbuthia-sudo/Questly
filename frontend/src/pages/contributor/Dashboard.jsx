import { useEffect, useState } from 'react'
import { Zap, Flame, FileText, BookOpen, Plus, Map } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import StatCard from '../../components/contributor/StatCard'
import StatusPill from '../../components/contributor/StatusPill'
import Avatar from '../../components/ui/Avatar'
import AddResourceModal from '../../components/contributor/AddResourceModal'
import CreatePathModal from '../../components/contributor/CreatePathModal'
import { getUserStats, getBadges } from '../../services/gamificationService'
import { getMyResources, getMyPaths, addResource, addPath } from '../../services/resourceService'
import { communityActivity } from '../../data/mockData'
import { useAuth } from '../../hooks/useAuth'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [badges, setBadges] = useState([])
  const [resources, setResources] = useState([])
  const [paths, setPaths] = useState([])
  const [resourceOpen, setResourceOpen] = useState(false)
  const [pathOpen, setPathOpen] = useState(false)

  const load = () => {
    // TODO: pull real userId from auth context instead of "currentUser"
    // once gamificationService is wired to per-user state.
    getUserStats('currentUser').then(setStats)
    getBadges('currentUser').then(setBadges)
    getMyResources().then(setResources)
    getMyPaths().then(setPaths)
  }

  useEffect(load, [])

  const allContent = [...resources, ...paths]
  const statusCounts = allContent.reduce(
    (acc, item) => ({ ...acc, [item.status]: (acc[item.status] || 0) + 1 }),
    { published: 0, pending: 0, rejected: 0 }
  )

  const handleAddResource = (data) => {
    addResource(data)
    load()
  }

  const handleAddPath = (data) => {
    addPath(data)
    load()
  }

  return (
    <div>
      <PageHeader
        eyebrow="Contributor workspace"
        title={`Welcome back, ${user?.name ?? 'Contributor'}`}
        subtitle="Here's how your content and contributions are doing."
        action={
          <div className="flex gap-2">
            <button
              onClick={() => setPathOpen(true)}
              className="focus-ring hidden sm:flex items-center gap-1.5 rounded-lg px-4 h-10 text-[13.5px] font-medium border"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
            >
              <Map size={15} /> Create path
            </button>
            <button
              onClick={() => setResourceOpen(true)}
              className="focus-ring flex items-center gap-1.5 rounded-lg px-4 h-10 text-[13.5px] font-semibold text-white"
              style={{ background: 'linear-gradient(155deg, var(--color-violet-500), var(--color-violet-700))' }}
            >
              <Plus size={15} /> Add resource
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Zap} label="Total XP" value={stats?.xp ?? '—'} tone="gold" />
        <StatCard icon={Flame} label="Streak" value={stats ? `${stats.streak} days` : '—'} />
        <StatCard icon={FileText} label="Resources shared" value={resources.length} />
        <StatCard icon={BookOpen} label="Paths created" value={paths.length} />
      </div>

      <div className="grid lg:grid-cols-5 gap-4 mb-8">
        <div
          className="lg:col-span-2 rounded-2xl border p-5"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <h3 className="font-display font-semibold text-[15px] mb-4">Content status</h3>
          <div className="flex flex-col gap-3">
            {[
              { status: 'published', label: 'Published', count: statusCounts.published },
              { status: 'pending', label: 'Pending review', count: statusCounts.pending },
              { status: 'rejected', label: 'Rejected', count: statusCounts.rejected },
            ].map((row) => (
              <div key={row.status} className="flex items-center justify-between">
                <StatusPill status={row.status} />
                <span className="font-semibold text-[14px]">{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="lg:col-span-3 rounded-2xl border p-5"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <h3 className="font-display font-semibold text-[15px] mb-4">Recent activity on your content</h3>
          {communityActivity.length === 0 ? (
            <p className="text-[13px]" style={{ color: 'var(--color-ink-2)' }}>
              No activity yet — share a resource to get the conversation started.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {communityActivity.slice(0, 3).map((a) => (
                <li key={a.id} className="flex items-center gap-3">
                  <Avatar initials={a.initials} size={30} />
                  <p className="text-[13px] flex-1">
                    <span className="font-medium">{a.name}</span>{' '}
                    <span style={{ color: 'var(--color-ink-2)' }}>{a.action}</span>{' '}
                    <span style={{ color: 'var(--color-amber-300)' }}>{a.target}</span>
                  </p>
                  <span className="text-xs shrink-0" style={{ color: 'var(--color-ink-3)' }}>{a.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        className="rounded-2xl border p-5"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <h3 className="font-display font-semibold text-[15px] mb-4">Recent badges</h3>
        {badges.length === 0 ? (
          <p className="text-[13px]" style={{ color: 'var(--color-ink-2)' }}>
            No badges yet — share a resource to get started.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b.id}
                className="text-[12.5px] font-medium rounded-full px-3 py-1.5"
                style={{ background: 'rgba(240,192,75,0.14)', color: 'var(--color-amber-300)' }}
              >
                {b.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <AddResourceModal open={resourceOpen} onClose={() => setResourceOpen(false)} onSubmit={handleAddResource} />
      <CreatePathModal open={pathOpen} onClose={() => setPathOpen(false)} onSubmit={handleAddPath} />
    </div>
  )
}