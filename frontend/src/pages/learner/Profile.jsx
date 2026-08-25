import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, CheckCircle2, Award as AwardIcon, Share2, Pencil } from "lucide-react";
import BadgeCard from "../../components/learner/BadgeCard";
import { getMyPaths, getUserStats, subscribe } from "../../services/learningPathService";
import { ACHIEVEMENTS } from "../../data/achievements";

const RECENT_ACTIVITY = [
  { id: "a1", icon: CheckCircle2, text: 'Completed "Hooks deep dive" module', time: "2h ago" },
  { id: "a2", icon: AwardIcon, text: "Earned the Streak keeper badge", time: "1d ago" },
  { id: "a3", icon: Share2, text: 'Shared "CSS Grid in 10 minutes"', time: "2d ago" },
];

export default function Profile() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(getUserStats());
  const [myPaths, setMyPaths] = useState([]);
  const earnedBadges = ACHIEVEMENTS.filter((b) => b.earned);

  useEffect(() => subscribe((snapshot) => setStats(snapshot.stats)), []);
  useEffect(() => {
    getMyPaths().then(setMyPaths);
  }, []);

  const pathsDone = myPaths.filter(({ progress }) => progress.isComplete).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
        <div className="h-24 bg-linear-to-r from-neutral-900 to-purple-900" />
        <div className="flex items-start justify-between px-6 pb-6">
          <div className="-mt-3 flex items-end gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-purple-600 text-2xl font-bold text-white">
              PM
            </div>
            <div className="pb-1">
              <p className="flex items-center gap-1.5 text-lg font-bold text-neutral-900">
                Penzi Mbuthia <BadgeCheck className="h-4 w-4 text-purple-500" />
              </p>
              <p className="text-sm text-neutral-500">Learner · Joined March 2025</p>
            </div>
          </div>
          <button type="button" className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3.5 py-1.5 text-sm font-medium text-neutral-700">
            <Pencil className="h-3.5 w-3.5" /> Edit profile
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 border-t border-neutral-100 px-6 py-5 sm:grid-cols-5">
          <Stat label="Total XP" value={stats.totalXP.toLocaleString()} />
          <Stat label="Level" value={stats.level} />
          <Stat label="Badges" value={earnedBadges.length} />
          <Stat label="Paths done" value={pathsDone} />
          <Stat label="Streak" value={`${stats.streakDays}d`} />
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
            <div key={path.id}>
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
        <div className="mt-4 grid grid-cols-3 gap-6 sm:grid-cols-6">
          {earnedBadges.map((badge) => (
            <BadgeCard key={badge.id} {...badge} compact />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="text-base font-semibold text-neutral-900">Recent activity</h2>
        <div className="mt-4 flex flex-col gap-4">
          {RECENT_ACTIVITY.map(({ id, icon: Icon, text, time }) => (
            <div key={id} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                <Icon className="h-4 w-4" />
              </div>
              <p className="flex-1 text-sm text-neutral-800">{text}</p>
              <span className="text-xs text-neutral-400">{time}</span>
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
      <p className="text-lg font-bold text-neutral-900">{value}</p>
      <p className="text-xs text-neutral-500">{label}</p>
    </div>
  );
}
