import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '../../components/contributor/PageHeader'
import { contributionAnalytics, contentMix, topPerformingResources } from '../../data/mockData'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border px-3 py-2 text-xs" style={{ background: 'var(--color-base-raised)', borderColor: 'var(--color-border)' }}>
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</p>
      ))}
    </div>
  )
}

export default function Analytics() {
  const maxViews = Math.max(...topPerformingResources.map((r) => r.views))

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
        title="Analytics" 
        subtitle="How your content is performing across the platform." 
      />

      <div
        className="rounded-2xl border p-5 mb-4"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <h3 className="font-display font-semibold text-[15px] mb-4">Views &amp; upvotes over time</h3>
        <div className="h-64 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={contributionAnalytics} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-violet-500)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--color-violet-500)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-soft)" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: 'var(--color-ink-3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--color-ink-3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="views" name="Views" stroke="var(--color-violet-500)" strokeWidth={2} fill="url(#viewsFill)" />
              <Area type="monotone" dataKey="upvotes" name="Upvotes" stroke="var(--color-amber-400)" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <div
          className="lg:col-span-2 rounded-2xl border p-5"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <h3 className="font-display font-semibold text-[15px] mb-4">Content mix</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={contentMix} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={3} stroke="none">
                  {contentMix.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="flex flex-col gap-2 mt-2">
            {contentMix.map((c) => (
              <li key={c.name} className="flex items-center justify-between text-[13.5px]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  {c.name}
                </span>
                <span style={{ color: 'var(--color-ink-2)' }}>{c.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="lg:col-span-3 rounded-2xl border p-5"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <h3 className="font-display font-semibold text-[15px] mb-4">Top performing resources</h3>
          <ul className="flex flex-col gap-4">
            {topPerformingResources.map((r, index) => (
              <li key={r.title}>
                <div className="flex items-center justify-between text-[13px] mb-1.5">
                  <Link 
                    to={`/contributor/content/${r.id || index}`}
                    className="font-medium truncate pr-3 hover:text-violet-600 transition-colors"
                  >
                    {r.title}
                  </Link>
                  <span style={{ color: 'var(--color-ink-2)' }}>{r.views.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-active)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(r.views / maxViews) * 100}%`,
                      background: 'linear-gradient(90deg, var(--color-violet-700), var(--color-violet-400))',
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}