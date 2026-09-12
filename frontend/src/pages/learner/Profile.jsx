import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, CheckCircle2, Compass, Pencil } from "lucide-react";
import BadgeCard from "../../components/learner/BadgeCard";
import { getMyPaths, getMyStats, getMyProgress } from "../../services/learningPathService";
import { getMyBadges } from "../../services/gamificationService";
import { useAuth } from "../../hooks/useAuth";

function timeAgo(isoString) {
  const then = new Date(isoString).getTime();
  const diffMs = Date.now() - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [myPaths, setMyPaths] = useState([]);
  const [badges, setBadges] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    getMyStats().then(setStats);
    getMyBadges().then((all) => setBadges(all.filter((b) => b.earned)));

    Promise.all([getMyPaths(), getMyProgress()]).then(([paths, progress]) => {
      setMyPaths(paths);
      const pathTitleById = new Map(paths.map((p) => [p.path.id, p.path.title]));
      const feed = progress
        .filter((entry) => entry.status === "completed" && entry.completedAt)
        .slice(0, 8)
        .map((entry) => ({
          id: entry.id,
          icon: entry.moduleId ? CheckCircle2 : Compass,
          text: entry.moduleId
            ? `Completed a module in "${pathTitleById.get(entry.learningPathId) ?? "a path"}"`
            : `Started following "${pathTitleById.get(entry.learningPathId) ?? "a path"}"`,
          time: timeAgo(entry.completedAt),
        }));
      setActivity(feed);
    });
  }, []);

  const pathsDone = myPaths.filter(({ progress }) => progress.percent === 100).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
        <div className="h-24 bg-linear-to-r from-neutral-900 to-purple-900" />
        <div className="flex items-start justify-between px-6 pb-6">
          <div className="-mt-3 flex items-end gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-purple-600 text-2xl font-bold text-white">
              {user?.initials ||
                user?.name
                  ?.trim()
                  .split(/\s+/)
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() ||
                "L"}
            </div>
            <div className="pb-1">
              <p className="flex items-center gap-1.5 text-lg font-bold text-neutral-900">
                {user?.name || "Learner"} <BadgeCheck className="h-4 w-4 text-purple-500" />
              </p>
              <p className="text-sm text-neutral-500">
                {user?.role
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  : "Learner"}
              </p>
            </div>
          </div>
          <button type="button" className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3.5 py-1.5 text-sm font-medium text-neutral-700">
            <Pencil className="h-3.5 w-3.5" /> Edit profile
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 border-t border-neutral-100 px-10 py-5 sm:grid-cols-5">
          <Stat label="Total XP" value={stats ? stats.totalXP.toLocaleString() : "—"} />
          <Stat label="Level" value={stats?.level ?? "—"} />
          <Stat label="Badges" value={badges.length} />
          <Stat label="Paths done" value={pathsDone} />
          <Stat label="Streak" value={stats ? `${stats.streakDays}d` : "—"} />
        </div>
      </div>

      <section className="rounded-2xl border border-black/5 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-900">Active paths</h2>
          <button type="button" onClick={() => navigate("/paths")} className="text-sm font-medium text-purple-600 hover:underline">
            View all
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {myPaths.map(({ path, progress }) => (
            <div key={path.id} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-neutral-500">{path.title}</span>
                <span className="text-neutral-500">{progress.percent}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full rounded-full bg-amber-400" style={{ width: `${progress.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-900">Badges</h2>
          <button type="button" onClick={() => navigate("/achievements")} className="text-sm font-medium text-purple-600 hover:underline">
            View all
          </button>
        </div>
        {badges.length === 0 ? (
          <p className="mt-4 text-sm text-neutral-400">No badges earned yet — complete a module to get started.</p>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-6 sm:grid-cols-6">
            {badges.map((badge) => (
              <BadgeCard key={badge.id} title={badge.name} description={badge.criteria} icon={badge.icon_key} earned compact />
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="text-base font-semibold text-neutral-900">Recent activity</h2>
        {activity.length === 0 ? (
          <p className="mt-4 text-sm text-neutral-400">No activity yet — follow a path and complete a module to see it here.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {activity.map(({ id, icon: Icon, text, time }) => (
              <div key={id} className="flex items-center gap-3 border-t border-neutral-200 pt-3 first:border-t-0 first:pt-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="flex-1 text-sm text-neutral-800">{text}</p>
                <span className="text-xs text-neutral-400">{time}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-lg font-bold text-neutral-900">{value}</p>
      <p className="text-xs text-neutral-500">{label}</p>
    </div>
  );
}
