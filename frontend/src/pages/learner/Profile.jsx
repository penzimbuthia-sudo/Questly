// Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, CheckCircle2, Award as AwardIcon, Share2, Pencil } from "lucide-react";
import BadgeCard from "../../components/learner/BadgeCard";
import { getMyPaths, getMyStats } from "../../services/learningPathService";
import { ACHIEVEMENTS } from "../../data/achievements";
import { useAuth } from "../../hooks/useAuth";

const RECENT_ACTIVITY = [
  { id: "a1", icon: CheckCircle2, text: 'Completed "Hooks deep dive" module', time: "2h ago" },
  { id: "a2", icon: AwardIcon, text: "Earned the Streak keeper badge", time: "1d ago" },
  { id: "a3", icon: Share2, text: 'Shared "CSS Grid in 10 minutes"', time: "2d ago" },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [myPaths, setMyPaths] = useState([]);
  const earnedBadges = ACHIEVEMENTS.filter((b) => b.earned);

  useEffect(() => {
    getMyStats().then(setStats);
    getMyPaths().then(setMyPaths);
  }, []);

  const pathsDone = myPaths.filter(({ progress }) => progress.percent === 100).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-2xl border border-line/10 bg-card">
        <div className="h-24 bg-linear-to-r from-ink to-dark-purple" />
        <div className="flex items-start justify-between px-6 pb-6">
          <div className="-mt-3 flex items-end gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-card bg-royal text-2xl font-bold text-ivory">
              {user?.initials ||
                user?.name?.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() ||
                "L"}
            </div>
            <div className="pb-1">
              <p className="flex items-center gap-1.5 text-lg font-bold text-fg">
                {user?.name || "Learner"} <BadgeCheck className="h-4 w-4 text-royal" />
              </p>
              <p className="text-sm text-fg/60">
                {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Learner"}
              </p>
            </div>
          </div>
          <button type="button" className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-line/15 px-3.5 py-1.5 text-sm font-medium text-fg/80">
            <Pencil className="h-3.5 w-3.5" /> Edit profile
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-6 border-t border-line/10 px-10 py-5 sm:grid-cols-5">
            <Stat label="Total XP" value={stats.totalXP.toLocaleString()} />
            <Stat label="Level" value={stats.level} />
            <Stat label="Badges" value={earnedBadges.length} />
            <Stat label="Paths done" value={pathsDone} />
            <Stat label="Streak" value={`${stats.streakDays}d`} />
          </div>
        )}
      </div>

      <section className="rounded-2xl border border-line/10 bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-fg">Active paths</h2>
          <button type="button" onClick={() => navigate("/learner/paths")} className="text-sm font-medium text-royal hover:underline">
            View all
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {myPaths.map(({ path, progress }) => (
            <div key={path.id} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-fg/70">{path.title}</span>
                <span className="text-fg/60">{progress.percent}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-active">
                <div className="h-full rounded-full bg-butter" style={{ width: `${progress.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-line/10 bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-fg">Badges</h2>
          <button type="button" onClick={() => navigate("/learner/achievements")} className="text-sm font-medium text-royal hover:underline">
            View all
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-6 sm:grid-cols-6">
          {earnedBadges.map((badge) => (
            <BadgeCard key={badge.id} {...badge} compact />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-line/10 bg-card p-6">
        <h2 className="text-base font-semibold text-fg">Recent activity</h2>
        <div className="mt-4 flex flex-col gap-4">
          {RECENT_ACTIVITY.map(({ id, icon: Icon, text, time }) => (
            <div key={id} className="flex items-center gap-3 border-t border-line/10 pt-3 first:border-t-0 first:pt-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-royal/10 text-royal">
                <Icon className="h-4 w-4" />
              </div>
              <p className="flex-1 text-sm text-fg/80">{text}</p>
              <span className="text-xs text-fg/40">{time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-lg font-bold text-fg">{value}</p>
      <p className="text-xs text-fg/60">{label}</p>
    </div>
  );
}