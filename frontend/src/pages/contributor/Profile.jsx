import { Rocket, Star, ShieldCheck, TrendingUp, Crown, Flame, Award, ArrowLeft, Edit, Share2, UserPlus, Mail, Settings, ExternalLink } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../../components/contributor/PageHeader'
import Avatar from '../../components/contributor/Avatar'
import { currentUser, badges, contributorStats, nextMilestone } from '../../data/mockData'

const ICONS = { Rocket, Star, ShieldCheck, TrendingUp, Crown, Flame }

export default function Profile() {
  const navigate = useNavigate()

  const handleEditProfile = () => {
    navigate('/contributor/profile/edit')
  }

  const handleShareProfile = () => {
    // Copy profile link to clipboard
    const url = `${window.location.origin}/profile/${currentUser.id || 'current'}`
    navigator.clipboard?.writeText(url)
    alert('Profile link copied to clipboard!')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
        title="Profile" 
        subtitle="Your public presence in the Questly community."
        action={
          <div className="flex items-center gap-2">
            <Link
              to="/contributor/settings"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-violet-50"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
            >
              <Settings size={16} />
              Settings
            </Link>
          </div>
        }
      />

      {/* Profile Header */}
      <div
        className="rounded-2xl border p-6 flex flex-col sm:flex-row items-center gap-4 mb-8 relative"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <Link to={`/profile/${currentUser.id || 'current'}`}>
          <Avatar initials={currentUser.initials} size={56} ring />
        </Link>
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h2 className="font-display font-bold text-lg">{currentUser.name}</h2>
          <p className="text-[13.5px]" style={{ color: 'var(--color-ink-2)' }}>
            {currentUser.role} · Level {currentUser.level}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
            <Link to={`/profile/${currentUser.id || 'current'}`} className="text-xs text-violet-500 hover:text-violet-600 transition-colors">
              View Public Profile
            </Link>
            <span className="w-px h-3" style={{ background: 'var(--color-border)' }} />
            <button onClick={handleShareProfile} className="text-xs text-violet-500 hover:text-violet-600 transition-colors flex items-center gap-1">
              <Share2 size={12} /> Share
            </button>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display text-xl font-bold" style={{ color: 'var(--color-amber-300)' }}>
            {currentUser.xp.toLocaleString()} XP
          </p>
          <p className="text-xs" style={{ color: 'var(--color-ink-2)' }}>Rank #{currentUser.rank}</p>
          <button
            onClick={handleEditProfile}
            className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium border transition-colors hover:bg-violet-50"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
          >
            <Edit size={12} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="rounded-xl border p-4 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-amber-300)' }}>{currentUser.xp.toLocaleString()}</p>
          <p className="text-xs" style={{ color: 'var(--color-ink-2)' }}>Total XP</p>
        </div>
        <div className="rounded-xl border p-4 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <p className="text-2xl font-bold">{contributorStats.badgesEarned}</p>
          <p className="text-xs" style={{ color: 'var(--color-ink-2)' }}>Badges</p>
        </div>
        <div className="rounded-xl border p-4 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <p className="text-2xl font-bold">{contributorStats.resourcesShared}</p>
          <p className="text-xs" style={{ color: 'var(--color-ink-2)' }}>Resources</p>
        </div>
        <div className="rounded-xl border p-4 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <p className="text-2xl font-bold">{currentUser.level}</p>
          <p className="text-xs" style={{ color: 'var(--color-ink-2)' }}>Level</p>
        </div>
      </div>

      {/* Badges */}
      <h3 className="font-display font-semibold text-[15px] mb-3 flex items-center justify-between">
        <span>Badges</span>
        <Link
          to="/contributor/rewards"
          className="text-xs font-medium text-violet-500 hover:text-violet-600 transition-colors"
        >
          View all rewards →
        </Link>
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {badges.map((b) => {
          const Icon = ICONS[b.icon] || Award
          return (
            <div
              key={b.id}
              className="rounded-2xl border p-5 flex items-center gap-4 transition-opacity hover:shadow-md"
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
              {b.earned && (
                <span className="ml-auto text-xs font-medium text-green-500">Earned</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Contributor Stats */}
      <h3 className="font-display font-semibold text-[15px] mb-3">Contributor stats</h3>
      <div
        className="rounded-2xl border divide-y mb-4"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        {[
          ['Resources shared', contributorStats.resourcesShared, '/contributor/content'],
          ['Learning paths', contributorStats.learningPaths, '/contributor/content?type=path'],
          ['Total upvotes', contributorStats.totalUpvotes],
          ['Badges earned', contributorStats.badgesEarned, '/contributor/rewards'],
        ].map(([label, value, link]) => (
          <div key={label} className="flex items-center justify-between px-5 py-3.5" style={{ borderColor: 'var(--color-border-soft)' }}>
            <span className="text-[13.5px]" style={{ color: 'var(--color-ink-2)' }}>{label}</span>
            {link ? (
              <Link to={link} className="font-semibold text-[14px] hover:text-violet-600 transition-colors flex items-center gap-1">
                {value} <ExternalLink size={12} />
              </Link>
            ) : (
              <span className="font-semibold text-[14px]">{value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Next Milestone */}
      <div
        className="rounded-2xl border p-5 flex items-start gap-3"
        style={{ background: 'linear-gradient(135deg, rgba(240,192,75,0.10), rgba(139,92,246,0.06))', borderColor: 'var(--color-border)' }}
      >
        <div className="w-9 h-9 shrink-0 grid place-items-center rounded-lg" style={{ background: 'rgba(240,192,75,0.16)', color: 'var(--color-amber-300)' }}>
          <Crown size={16} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-[14px]">Next milestone</p>
          <p className="text-[13px] mt-0.5" style={{ color: 'var(--color-ink-2)' }}>{nextMilestone}</p>
        </div>
        <Link
          to="/contributor/analytics"
          className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-violet-50"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
        >
          Track Progress
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <Link
          to="/contributor/content"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02]"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <Rocket size={16} style={{ color: 'var(--color-violet-500)' }} />
          <span className="text-sm font-medium">My Content</span>
        </Link>
        <Link
          to="/contributor/analytics"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02]"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <TrendingUp size={16} style={{ color: 'var(--color-green-500)' }} />
          <span className="text-sm font-medium">Analytics</span>
        </Link>
        <Link
          to="/contributor/rewards"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02]"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <Award size={16} style={{ color: 'var(--color-amber-500)' }} />
          <span className="text-sm font-medium">Rewards</span>
        </Link>
        <Link
          to="/contributor/settings"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02]"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <Settings size={16} style={{ color: 'var(--color-gray-500)' }} />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </div>
  )
}