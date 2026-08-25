import { Gem, Rocket, Sparkles, Crown, Wallet, ArrowLeft, History, Award, TrendingUp, Gift, CheckCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../../components/contributor/PageHeader'
import XPBar from '../../components/contributor/XPBar'
import { currentUser, rewards } from '../../data/mockData'

const ICONS = { Gem, Rocket, Sparkles, Crown }

export default function Rewards() {
  const navigate = useNavigate()
  const nextPerk = rewards.find((r) => r.cost > currentUser.xp)
  const toGo = nextPerk ? nextPerk.cost - currentUser.xp : 0

  const handleRedeem = (rewardId, rewardName, cost) => {
    if (window.confirm(`Are you sure you want to redeem "${rewardName}" for ${cost.toLocaleString()} XP?`)) {
      // TODO: Call API to redeem reward
      alert(`🎉 Successfully redeemed "${rewardName}"!`)
      navigate('/contributor/rewards/history')
    }
  }

  const handleViewHistory = () => {
    navigate('/contributor/rewards/history')
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
        title="Rewards"
        subtitle="Redeem the XP you've earned from contributing for platform perks."
        action={
          <button
            onClick={handleViewHistory}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-violet-50"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-1)' }}
          >
            <History size={16} />
            Redemption History
          </button>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border p-4 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-amber-300)' }}>
            {currentUser.xp.toLocaleString()}
          </p>
          <p className="text-xs" style={{ color: 'var(--color-ink-2)' }}>Available XP</p>
        </div>
        <div className="rounded-xl border p-4 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <p className="text-2xl font-bold">{rewards.length}</p>
          <p className="text-xs" style={{ color: 'var(--color-ink-2)' }}>Total Rewards</p>
        </div>
        <div className="rounded-xl border p-4 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-violet-400)' }}>
            {rewards.filter(r => r.cost <= currentUser.xp).length}
          </p>
          <p className="text-xs" style={{ color: 'var(--color-ink-2)' }}>Available to Redeem</p>
        </div>
      </div>

      {/* Rewards Grid */}
      <h3 className="font-display font-semibold text-[15px] mb-3">Available Rewards</h3>
      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {rewards.map((r) => {
          const Icon = ICONS[r.icon]
          const affordable = currentUser.xp >= r.cost

          return (
            <div
              key={r.id}
              className="rounded-2xl border p-5 flex flex-col gap-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
              style={{
                background: 'var(--color-surface)',
                borderColor: affordable ? 'var(--color-border)' : 'var(--color-border-soft)',
                opacity: affordable ? 1 : 0.7,
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 grid place-items-center rounded-xl"
                  style={{
                    background: affordable ? 'rgba(139,92,246,0.14)' : 'var(--color-surface-active)',
                    color: affordable ? 'var(--color-violet-400)' : 'var(--color-ink-3)',
                  }}
                >
                  <Icon size={18} />
                </div>

                <button
                  onClick={() => handleRedeem(r.id, r.name, r.cost)}
                  disabled={!affordable}
                  className="focus-ring rounded-lg px-3.5 h-8 text-[12.5px] font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                  style={
                    affordable
                      ? {
                          background: 'linear-gradient(155deg, var(--color-violet-500), var(--color-violet-700))',
                          color: '#fff'
                        }
                      : {
                          background: 'var(--color-surface-active)',
                          color: 'var(--color-ink-2)'
                        }
                  }
                >
                  {affordable ? 'Redeem' : `${r.cost - currentUser.xp} XP needed`}
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-[14.5px]">{r.name}</p>
                  {r.popular && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: 'rgba(240,192,75,0.14)', color: 'var(--color-amber-300)' }}>
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-[13px] mt-0.5" style={{ color: 'var(--color-ink-2)' }}>
                  {r.cost.toLocaleString()} XP
                </p>
                {r.description && (
                  <p className="text-xs mt-1" style={{ color: 'var(--color-ink-3)' }}>
                    {r.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Balance */}
      <div>
        <h2 className="font-display font-semibold text-[15px] mb-3">Balance</h2>

        <div
          className="rounded-2xl border p-8 flex flex-col items-center text-center shadow-sm"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)'
          }}
        >
          <div
            className="w-11 h-11 grid place-items-center rounded-xl mb-3"
            style={{
              background: 'rgba(240,192,75,0.14)',
              color: 'var(--color-amber-300)'
            }}
          >
            <Wallet size={20} />
          </div>

          <p className="font-display text-3xl font-bold tracking-tight">
            {currentUser.xp.toLocaleString()}
          </p>
          <p className="text-[13px] mt-1" style={{ color: 'var(--color-ink-2)' }}>
            XP available
          </p>
          
          <div className="flex items-center gap-4 mt-4">
            <Link
              to="/contributor/analytics"
              className="text-xs font-medium text-violet-500 hover:text-violet-600 transition-colors"
            >
              View XP History
            </Link>
            <span className="w-px h-4" style={{ background: 'var(--color-border)' }} />
            <Link
              to="/contributor/challenges"
              className="text-xs font-medium text-violet-500 hover:text-violet-600 transition-colors"
            >
              Earn More XP
            </Link>
          </div>
        </div>
      </div>

      {/* Next Perk */}
      {nextPerk && (
        <div
          className="rounded-2xl border p-5 shadow-sm mt-6"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)'
          }}
        >
          <div className="flex items-center justify-between text-[13.5px] mb-2.5">
            <span style={{ color: 'var(--color-ink-2)' }}>
              Next perk unlocks at
            </span>
            <span className="font-semibold">
              {nextPerk.cost.toLocaleString()} XP
            </span>
          </div>

          <XPBar progress={currentUser.xp} total={nextPerk.cost} tone="gold" />

          <p className="text-xs mt-2" style={{ color: 'var(--color-ink-3)' }}>
            {toGo.toLocaleString()} XP to go — Keep contributing!
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <Link
          to="/contributor/challenges"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02]"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <Rocket size={16} style={{ color: 'var(--color-violet-500)' }} />
          <span className="text-sm font-medium">Challenges</span>
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
          to="/contributor/profile"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02]"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <Award size={16} style={{ color: 'var(--color-amber-500)' }} />
          <span className="text-sm font-medium">Profile</span>
        </Link>
        <Link
          to="/contributor/content"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02]"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
        >
          <Gift size={16} style={{ color: 'var(--color-pink-500)' }} />
          <span className="text-sm font-medium">My Content</span>
        </Link>
      </div>
    </div>
  )
}