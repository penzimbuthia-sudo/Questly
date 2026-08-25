import { useState } from 'react'
import { Flame, ArrowLeft, Eye, Play, Filter, SortAsc } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/contributor/PageHeader'
import ChallengeCard from '../../components/contributor/ChallengeCard'
import { contributorChallenges, challengeStats } from '../../data/mockData'

export default function Challenges() {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('recent')

  // Filter and sort challenges
  const filteredChallenges = contributorChallenges
    .filter(c => filter === 'all' ? true : c.difficulty?.toLowerCase() === filter)
    .sort((a, b) => {
      if (sort === 'recent') return b.id - a.id
      if (sort === 'reward') return (b.reward || 0) - (a.reward || 0)
      if (sort === 'progress') {
        const aProgress = (a.progress || 0) / (a.total || 1)
        const bProgress = (b.progress || 0) / (b.total || 1)
        return bProgress - aProgress
      }
      return 0
    })

  return (
    <div>
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
        title="Contributor challenges"
        subtitle="Complete quests to earn bonus XP and badges."
        action={
          <Link
            to="/contributor/challenges/history"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-violet-50"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            View History
          </Link>
        }
      />

      {/* Filter and sort controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={14} style={{ color: 'var(--color-ink-3)' }} />
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--color-surface-active)' }}>
            {['all', 'easy', 'medium', 'hard'].map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  filter === d ? 'bg-white shadow-sm' : ''
                }`}
                style={{
                  color: filter === d ? 'var(--color-ink-1)' : 'var(--color-ink-3)',
                  background: filter === d ? 'var(--color-base-raised)' : 'transparent'
                }}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <SortAsc size={14} style={{ color: 'var(--color-ink-3)' }} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm border"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
          >
            <option value="recent">Most Recent</option>
            <option value="reward">Highest Reward</option>
            <option value="progress">Most Progress</option>
          </select>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((c) => (
            <div key={c.id} className="relative group">
              <ChallengeCard challenge={c} />
              
              {/* Action buttons overlay */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={`/challenges/${c.id}`}
                  className="p-1.5 rounded bg-white shadow-md hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--color-ink-1)' }}
                  title="View details"
                >
                  <Eye size={14} />
                </Link>
                <Link
                  to={`/challenges/${c.id}/start`}
                  className="p-1.5 rounded bg-violet-500 shadow-md hover:bg-violet-600 transition-colors text-white"
                  title="Start challenge"
                >
                  <Play size={14} />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="font-medium" style={{ color: 'var(--color-ink-2)' }}>
              No challenges match your filter
            </p>
            <button
              onClick={() => setFilter('all')}
              className="mt-2 text-sm text-violet-500 hover:text-violet-600 transition-colors"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      {/* View All Challenges Link */}
      <div className="text-center mb-6">
        <Link
          to="/challenges"
          className="inline-flex items-center gap-2 text-sm font-medium text-violet-500 hover:text-violet-600 transition-colors"
        >
          View all challenges
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Challenge Stats */}
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

      {/* Streak Banner */}
      <div
        className="rounded-2xl border p-5 flex items-start gap-3"
        style={{ background: 'linear-gradient(135deg, rgba(240,192,75,0.10), rgba(139,92,246,0.06))', borderColor: 'var(--color-border)' }}
      >
        <div className="w-9 h-9 shrink-0 grid place-items-center rounded-lg" style={{ background: 'rgba(240,192,75,0.16)', color: 'var(--color-amber-300)' }}>
          <Flame size={16} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-[14px]">Keep your streak</p>
          <p className="text-[13px] mt-0.5" style={{ color: 'var(--color-ink-2)' }}>{challengeStats.streakNote}</p>
        </div>
        <Link
          to="/challenges/streak"
          className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-violet-50"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
        >
          View Streak
        </Link>
      </div>
    </div>
  )
}