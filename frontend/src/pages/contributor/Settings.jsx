import { useState } from 'react'
import { User, Lock, Bell, Globe, AlertTriangle } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import Toggle from '../../components/ui/Toggle'
import { currentUser } from '../../data/mockData'

const inputClass =
  'focus-ring w-full rounded-lg px-3.5 h-10 text-[13.5px] border outline-none placeholder:text-[var(--color-ink-3)] transition-colors focus:border-[var(--color-violet-500)]'
const inputStyle = { background: 'var(--color-base)', borderColor: 'var(--color-border)' }

function Section({ icon: Icon, title, children }) {
  return (
    <div
      className="rounded-2xl border p-5 md:p-6"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Icon size={16} style={{ color: 'var(--color-violet-400)' }} />
        <h3 className="font-display font-semibold text-[15px]">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function Row({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div>
        <p className="text-[13.5px] font-medium">{label}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-2)' }}>{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>
  )
}

export default function Settings() {
  const [notif, setNotif] = useState({ approved: true, comments: true, digest: false, reminders: true })
  const [privacy, setPrivacy] = useState({ publicProfile: true, leaderboard: true })

  return (
    <div>
      <PageHeader eyebrow="Contributor workspace" title="Settings" subtitle="Manage your profile, security, and notification preferences." />

      <div className="flex flex-col gap-4 max-w-2xl">
        <Section icon={User} title="Profile">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>Display name</label>
              <input defaultValue={currentUser.name} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>Bio</label>
              <textarea rows={3} defaultValue={currentUser.bio} className={`${inputClass} h-auto py-2.5 resize-none`} style={inputStyle} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>Email</label>
                <input defaultValue={currentUser.email} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>GitHub username</label>
                <input defaultValue={currentUser.github} className={inputClass} style={inputStyle} />
              </div>
            </div>
          </div>
        </Section>

        <Section icon={Lock} title="Security">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>Current password</label>
              <input type="password" placeholder="••••••••" className={inputClass} style={inputStyle} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>New password</label>
                <input type="password" placeholder="••••••••" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: 'var(--color-ink-1)' }}>Confirm new password</label>
                <input type="password" placeholder="••••••••" className={inputClass} style={inputStyle} />
              </div>
            </div>
          </div>
        </Section>

        <Section icon={Bell} title="Notifications">
          <div className="divide-y" style={{ borderColor: 'var(--color-border-soft)' }}>
            <Row label="Content approved or rejected" description="Get notified when Admin reviews your submissions." checked={notif.approved} onChange={(v) => setNotif((n) => ({ ...n, approved: v }))} />
            <Row label="Comments on your content" description="Get notified when someone comments on a resource or path." checked={notif.comments} onChange={(v) => setNotif((n) => ({ ...n, comments: v }))} />
            <Row label="Weekly digest" description="A summary of your views, upvotes, and XP earned each week." checked={notif.digest} onChange={(v) => setNotif((n) => ({ ...n, digest: v }))} />
            <Row label="Challenge reminders" description="Reminders before a challenge deadline." checked={notif.reminders} onChange={(v) => setNotif((n) => ({ ...n, reminders: v }))} />
          </div>
        </Section>

        <Section icon={Globe} title="Privacy">
          <div className="divide-y" style={{ borderColor: 'var(--color-border-soft)' }}>
            <Row label="Public contributor profile" description="Let other users view your profile, badges, and content." checked={privacy.publicProfile} onChange={(v) => setPrivacy((p) => ({ ...p, publicProfile: v }))} />
            <Row label="Show on leaderboard" description="Display your name and rank on the contributor leaderboard." checked={privacy.leaderboard} onChange={(v) => setPrivacy((p) => ({ ...p, leaderboard: v }))} />
          </div>
        </Section>

        <div
          className="rounded-2xl border p-5 md:p-6"
          style={{ background: 'rgba(224,168,39,0.05)', borderColor: 'rgba(224,168,39,0.35)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} style={{ color: 'var(--color-amber-400)' }} />
            <h3 className="font-display font-semibold text-[15px]">Danger zone</h3>
          </div>
          <p className="text-[13px] mb-4" style={{ color: 'var(--color-ink-2)' }}>
            Deactivating hides your profile and content from other users. This can be undone by logging back in within 30 days.
          </p>
          <button
            className="focus-ring rounded-lg px-4 h-9 text-[13px] font-semibold border"
            style={{ borderColor: 'var(--color-amber-500)', color: 'var(--color-amber-300)' }}
          >
            Deactivate account
          </button>
        </div>

        <button
          className="focus-ring self-start rounded-lg px-5 h-10 text-[13.5px] font-semibold text-white"
          style={{ background: 'linear-gradient(155deg, var(--color-violet-500), var(--color-violet-700))' }}
        >
          Save changes
        </button>
      </div>
    </div>
  )
}
