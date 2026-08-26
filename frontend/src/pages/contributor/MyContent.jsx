import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import ContentCard from '../../components/contributor/ContentCard'
import AddResourceModal from '../../components/contributor/AddResourceModal'
import CreatePathModal from '../../components/contributor/CreatePathModal'
import { myContent as initialContent } from '../../data/mockData'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'video', label: 'Video' },
  { key: 'article', label: 'Article' },
  { key: 'path', label: 'Learning path' },
]

export default function MyContent() {
  const [content, setContent] = useState(initialContent)
  const [filter, setFilter] = useState('all')
  const [resourceOpen, setResourceOpen] = useState(false)
  const [pathOpen, setPathOpen] = useState(false)

  const visible = filter === 'all' ? content : content.filter((c) => c.type === filter)

  const addResource = (resource) =>
    setContent((c) => [{ ...resource, updated: 'Just now', views: 0, upvotes: 0 }, ...c])

  const addPath = (path) =>
    setContent((c) => [
      { id: path.id, title: path.title, type: 'path', status: 'pending', views: 0, upvotes: 0, updated: 'Just now' },
      ...c,
    ])

  return (
    <div>
      <PageHeader
        eyebrow="Contributor workspace"
        title="My content"
        subtitle="Everything you've published or submitted for review."
        action={
          <button
            onClick={() => setResourceOpen(true)}
            className="focus-ring hidden sm:flex items-center gap-1.5 rounded-lg px-4 h-10 text-[13.5px] font-semibold text-white"
            style={{ background: 'linear-gradient(155deg, var(--color-violet-500), var(--color-violet-700))' }}
          >
            <Plus size={15} /> New resource
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="focus-ring rounded-full px-3.5 h-8 text-[13px] font-medium border transition-colors"
            style={
              filter === f.key
                ? { background: 'var(--color-violet-600)', borderColor: 'var(--color-violet-600)', color: '#fff' }
                : { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }
            }
          >
            {f.label}
          </button>
        ))}
        <button
          onClick={() => setPathOpen(true)}
          className="focus-ring ml-auto rounded-full px-3.5 h-8 text-[13px] font-medium border"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
        >
          + Create path
        </button>
      </div>

      {visible.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border border-dashed p-12 text-center"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="font-medium mb-1">Nothing here yet</p>
          <p className="text-[13px]" style={{ color: 'var(--color-ink-2)' }}>Share your first {filter === 'all' ? 'resource' : filter} to see it show up here.</p>
        </div>
      )}

      <AddResourceModal open={resourceOpen} onClose={() => setResourceOpen(false)} onSubmit={addResource} />
      <CreatePathModal open={pathOpen} onClose={() => setPathOpen(false)} onSubmit={addPath} />
    </div>
  )
}
