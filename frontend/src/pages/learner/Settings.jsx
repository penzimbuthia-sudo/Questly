// Settings.jsx
import { useState } from "react";
import { AlertTriangle, Globe, KeyRound, Mail, Moon, User, Eye, Flame, Bell } from "lucide-react";
import ThemeToggle from "../../components/ui/ThemeToggle";

const INITIAL_TOGGLES = {
  streakReminders: true,
  weeklyDigest: false,
  publicProfile: true,
  streakOnLeaderboard: true,
};

export default function Settings() {
  const [toggles, setToggles] = useState(INITIAL_TOGGLES);
  const toggle = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-fg">Settings</h1>
        <p className="mt-1 text-sm text-fg/60">Manage your account and preferences.</p>
      </div>

      <Section title="Account">
        <Row icon={User} label="Penzi Mbuthia" sub="Display name" action="Edit" />
        <Row icon={Mail} label="penzi.mbuthia@email.com" sub="Email address" action="Change" />
        <Row icon={KeyRound} label="Password" sub="Last changed 3 months ago" action="Update" />
      </Section>

      <Section title="Notifications">
        <ToggleRow icon={Bell} label="Challenge and streak reminders" sub="Get nudged before your streak resets" checked={toggles.streakReminders} onChange={() => toggle("streakReminders")} />
        <ToggleRow icon={Mail} label="Weekly email digest" sub="Summary of your progress and leaderboard rank" checked={toggles.weeklyDigest} onChange={() => toggle("weeklyDigest")} />
      </Section>

      <Section title="Privacy">
        <ToggleRow icon={Eye} label="Public profile" sub="Let other learners view your profile and badges" checked={toggles.publicProfile} onChange={() => toggle("publicProfile")} />
        <ToggleRow icon={Flame} label="Show streak on leaderboard" sub="Display your streak next to your ranking" checked={toggles.streakOnLeaderboard} onChange={() => toggle("streakOnLeaderboard")} />
      </Section>

      <Section title="Preferences">
        <Row icon={Globe} label="Language" action="English" actionMuted />
        <div className="flex items-center gap-3 py-3">
          <Moon className="h-4 w-4 text-fg/40" />
          <div className="flex-1">
            <p className="text-sm font-medium text-fg">Theme</p>
          </div>
          <ThemeToggle />
        </div>
      </Section>

      <section className="rounded-2xl border border-danger/20 bg-card p-6">
        <p className="flex items-center gap-2 font-semibold text-danger">
          <AlertTriangle className="h-4 w-4" /> Danger zone
        </p>
        <p className="mt-1 text-sm text-fg/60">These actions are irreversible — proceed with care.</p>
        <div className="mt-4 flex gap-3">
          <button type="button" className="rounded-lg border border-line/15 px-4 py-2 text-sm font-medium text-fg/80">
            Deactivate account
          </button>
          <button type="button" className="rounded-lg border border-danger/30 px-4 py-2 text-sm font-medium text-danger">
            Delete account permanently
          </button>
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-2xl border border-line/10 bg-card p-6">
      <h2 className="text-base font-semibold text-fg">{title}</h2>
      <div className="mt-3 flex flex-col divide-y divide-line/10">{children}</div>
    </section>
  );
}

function Row({ icon: Icon, label, sub, action, actionMuted = false }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <Icon className="h-4 w-4 text-fg/40" />
      <div className="flex-1">
        <p className="text-sm font-medium text-fg">{label}</p>
        {sub && <p className="text-xs text-fg/40">{sub}</p>}
      </div>
      <button type="button" className={`text-sm font-medium ${actionMuted ? "text-fg/40" : "text-royal"}`}>
        {action}
      </button>
    </div>
  );
}

function ToggleRow({ icon: Icon, label, sub, checked, onChange }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <Icon className="h-4 w-4 text-fg/40" />
      <div className="flex-1">
        <p className="text-sm font-medium text-fg">{label}</p>
        <p className="text-xs text-fg/40">{sub}</p>
      </div>
      <button type="button" role="switch" aria-checked={checked} onClick={onChange} className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-royal" : "bg-surface-active"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-ivory shadow transition ${checked ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}