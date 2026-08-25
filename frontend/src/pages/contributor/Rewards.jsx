import { Gem, Rocket, Sparkles, Crown, Wallet } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import XPBar from '../../components/contributor/XPBar'
import { currentUser, rewards } from '../../data/mockData'

const ICONS = { Gem, Rocket, Sparkles, Crown }

export default function Rewards() {
  const nextPerk = rewards.find((r) => r.cost > currentUser.xp)
  const toGo = nextPerk ? nextPerk.cost - currentUser.xp : 0

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Contributor workspace"
        title="Rewards"
        subtitle="Redeem the XP you've earned from contributing for platform perks."
      />

      {/* Rewards Grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {rewards.map((r) => {
          const Icon = ICONS[r.icon]
          const affordable = currentUser.xp >= r.cost

          return (
            <div
              key={r.id}
              className="rounded-2xl border p-5 flex flex-col gap-4 shadow-sm transition-all hover:shadow-md"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)'
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 grid place-items-center rounded-xl"
                  style={{
                    background: 'rgba(139,92,246,0.14)',
                    color: 'var(--color-violet-400)'
                  }}
                >
                  <Icon size={18} />
                </div>

                <button
                  disabled={!affordable}
                  className="focus-ring rounded-lg px-3.5 h-8 text-[12.5px] font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={
                    affordable
                      ? {
                          background:
                            'linear-gradient(155deg, var(--color-violet-500), var(--color-violet-700))',
                          color: '#fff'
                        }
                      : {
                          background: 'var(--color-surface-active)',
                          color: 'var(--color-ink-2)'
                        }
                  }
                >
                  Redeem
                </button>
              </div>

              <div>
                <p className="font-medium text-[14.5px]">{r.name}</p>
                <p
                  className="text-[13px] mt-0.5"
                  style={{ color: 'var(--color-ink-2)' }}
                >
                  {r.cost.toLocaleString()} XP
                </p>
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
          <p
            className="text-[13px] mt-1"
            style={{ color: 'var(--color-ink-2)' }}
          >
            XP available
          </p>
        </div>
      </div>

      {/* Next Perk */}
      {nextPerk && (
        <div
          className="rounded-2xl border p-5 shadow-sm"
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

          <p
            className="text-xs mt-2"
            style={{ color: 'var(--color-ink-3)' }}
          >
            {toGo.toLocaleString()} XP to go
          </p>
        </div>
      )}
    </div>
  )
}
