import { useState, useEffect } from 'react'
import { Plus, ArrowLeft, Search, Filter, MoreVertical, Edit, Trash2, Eye, ExternalLink } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageHeader from '../../components/contributor/PageHeader'
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

const STATUS_FILTERS = [
  { key: 'all', label: 'All Status' },
  { key: 'published', label: 'Published' },
  { key: 'pending', label: 'Pending Review' },
  { key: 'draft', label: 'Draft' },
]

export default function MyContent() {
  const [content, setContent] = useState(initialContent)
  const [filter, setFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [resourceOpen, setResourceOpen] = useState(false)
  const [pathOpen, setPathOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Handle filter from URL params
  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam && FILTERS.some(f => f.key === typeParam)) {
      setFilter(typeParam)
    }
  }, [searchParams])

  // Filter content
  const visible = content
    .filter((c) => {
      if (filter !== 'all' && c.type !== filter) return false
      if (statusFilter !== 'all' && c.status !== statusFilter) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return c.title.toLowerCase().includes(query) || 
               (c.description && c.description.toLowerCase().includes(query))
      }
      return true
    })

  const addResource = (resource) =>
    setContent((c) => [{ ...resource, updated: 'Just now', views: 0, upvotes: 0 }, ...c])

  const addPath = (path) =>
    setContent((c) => [
      { id: path.id, title: path.title, type: 'path', status: 'pending', views: 0, upvotes: 0, updated: 'Just now' },
      ...c,
    ])

  // Navigate to content details
  const handleContentClick = (contentId) => {
    navigate(`/content/${contentId}`)
  }

  // Navigate to edit content
  const handleEditContent = (e, contentId) => {
    e.stopPropagation()
    navigate(`/content/${contentId}/edit`)
  }

  // Handle delete content
  const handleDeleteContent = (e, contentId) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContent((c) => c.filter((item) => item.id !== contentId))
    }
  }

  // Navigate to view content
  const handleViewContent = (e, contentId) => {
    e.stopPropagation()
    navigate(`/content/${contentId}`)
  }

  // Get content stats
  const stats = {
    total: content.length,
    published: content.filter(c => c.status === 'published').length,
    pending: content.filter(c => c.status === 'pending').length,
    draft: content.filter(c => c.status === 'draft').length,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back button */}
      <div className="mb-4">
        <Link 
          to="/contributor/dashboard" 
          className="inline-flex items-center gap-2 text-sm hover:text-violet-600 transition-colors"
          style={{ color: 'var(--color-ink-2)' }}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>

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

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'violet' },
          { label: 'Published', value: stats.published, color: 'green' },
          { label: 'Pending', value: stats.pending, color: 'amber' },
          { label: 'Drafts', value: stats.draft, color: 'gray' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border p-3 text-center"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
          >
            <p className="text-lg font-bold" style={{ color: `var(--color-${stat.color}-500)` }}>
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-ink-2)' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-ink-3)' }} />
          <input
            type="text"
            placeholder="Search your content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors hover:bg-violet-50"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
        >
          <Filter size={16} />
          Filters
        </button>

        <Link
          to="/content/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
          style={{ background: 'linear-gradient(155deg, var(--color-violet-500), var(--color-violet-700))' }}
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New Resource</span>
        </Link>
      </div>

      {/* Filter dropdowns */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3 mb-4 p-4 rounded-xl border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-colors"
                style={
                  filter === f.key
                    ? { background: 'var(--color-violet-600)', borderColor: 'var(--color-violet-600)', color: '#fff' }
                    : { borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }
                }
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="w-px h-6" style={{ background: 'var(--color-border)' }} />
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setStatusFilter(f.key)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-colors"
                style={
                  statusFilter === f.key
                    ? { background: 'var(--color-violet-600)', borderColor: 'var(--color-violet-600)', color: '#fff' }
                    : { borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Grid */}
      {visible.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((item) => (
            <div 
              key={item.id} 
              className="group relative cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => handleContentClick(item.id)}
            >
              <ContentCard item={item} />
              
              {/* Action buttons overlay */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleViewContent(e, item.id)}
                  className="p-1.5 rounded bg-white shadow-md hover:bg-gray-50 transition-colors"
                  title="View"
                >
                  <Eye size={14} />
                </button>
                <button
                  onClick={(e) => handleEditContent(e, item.id)}
                  className="p-1.5 rounded bg-white shadow-md hover:bg-gray-50 transition-colors"
                  title="Edit"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={(e) => handleDeleteContent(e, item.id)}
                  className="p-1.5 rounded bg-white shadow-md hover:bg-red-50 transition-colors"
                  style={{ color: 'var(--color-red-500)' }}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Status badge */}
              {item.status && item.status !== 'published' && (
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded"
                    style={{
                      background: item.status === 'pending' ? 'rgba(240,192,75,0.2)' : 'rgba(100,100,100,0.2)',
                      color: item.status === 'pending' ? 'var(--color-amber-300)' : 'var(--color-ink-3)'
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border border-dashed p-12 text-center"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="font-medium mb-1">Nothing here yet</p>
          <p className="text-[13px]" style={{ color: 'var(--color-ink-2)' }}>
            Share your first {filter === 'all' ? 'resource' : filter} to see it show up here.
          </p>
          <Link
            to="/content/new"
            className="inline-block mt-4 px-6 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ background: 'linear-gradient(155deg, var(--color-violet-500), var(--color-violet-700))' }}
          >
            Create New Content
          </Link>
        </div>
      )}

      {/* Modals */}
      <AddResourceModal open={resourceOpen} onClose={() => setResourceOpen(false)} onSubmit={addResource} />
      <CreatePathModal open={pathOpen} onClose={() => setPathOpen(false)} onSubmit={addPath} />
    </div>
  )
}