import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import XPCard from "../../components/learner/XPCard";
import LevelCard from "../../components/learner/LevelCard";
import LearningPathCard from "../../components/learner/LearningPathCard";
import WeeklyChallengeCard from "../../components/learner/WeeklyChallengeCard";
import BadgeCard from "../../components/learner/BadgeCard";
import { getAllPaths, getMyPaths, getUserStats, subscribe } from "../../services/learningPathService";
import { ACHIEVEMENTS } from "../../data/achievements";
import { useAuth } from "../../hooks/useAuth";

const WEEKLY_CHALLENGE = {
  title: "The 5-day builder",
  description: "Complete 5 modules this week",
  current: 3,
  total: 5,
  xpReward: 500,
};

const TOP_LEARNERS = [
  { name: "Aisha K.", xp: 4820 },
  { name: "Brian O.", xp: 4560 },
  { name: "Penzi M.", xp: 4230, isCurrentUser: true },
  { name: "Chinedu M.", xp: 3980 },
  { name: "Damilola A.", xp: 3710 },
];

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState(getUserStats());
  const [primaryPath, setPrimaryPath] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const earnedBadges = ACHIEVEMENTS.filter((b) => b.earned);

  useEffect(() => subscribe((snapshot) => setStats(snapshot.stats)), []);

  useEffect(() => {
    getMyPaths().then((mine) => {
      const top = mine.sort((a, b) => b.progress.percent - a.progress.percent)[0];
      if (top) setPrimaryPath(top);
    });
    getAllPaths().then((all) => setRecommended(all.slice(0, 4)));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Welcome back, {user?.name?.split(" ")[0] ?? "there"}</h1>
          <p className="mt-1 text-sm text-neutral-500">Keep going, you&apos;re doing amazing.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-600">
          🔥 {stats.streakDays}-day streak
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <XPCard totalXP={stats.totalXP} weeklyXP={stats.weeklyXP} />
        <LevelCard level={stats.level} xpToNextLevel={stats.xpToNextLevel} />
      </div>

      {primaryPath && (
        <section className="rounded-2xl border border-black/5 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-neutral-900">Continue learning</h2>
            <button
              type="button"
              onClick={() => navigate("paths")}
              className="text-sm font-medium text-purple-600 hover:underline"
            >
              View all
            </button>
          </div>

          <div className="mt-4 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-lg">
              {primaryPath.path.icon}
            </div>
            <div>
              <p className="font-medium text-neutral-900">{primaryPath.path.title}</p>
              <span className="mt-0.5 inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                {primaryPath.path.category}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${primaryPath.progress.percent}%` }} />
            </div>
            <span className="shrink-0 text-xs text-neutral-500">{primaryPath.progress.percent}%</span>
            <button
              type="button"
              onClick={() => navigate(`paths/${primaryPath.path.id}`)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white"
            >
              <PlayCircle className="h-4 w-4" /> Continue
            </button>
          </div>

          <p className="mt-2 text-xs text-neutral-400">
            {primaryPath.progress.modulesCompleted} / {primaryPath.progress.totalModules} modules · {primaryPath.progress.xpEarned.toLocaleString()} XP
          </p>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-900">Recommended for you</h2>
          <button type="button" onClick={() => navigate("/learner/explore")} className="text-sm font-medium text-purple-600 hover:underline">
            View all
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recommended.map((path) => (
            <LearningPathCard key={path.id} path={path} onOpen={() => navigate(`/learner/paths/${path.id}`)} onStart={() => navigate(`paths/${path.id}`)} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-900">Recent achievements</h2>
          <button type="button" onClick={() => navigate("/learner/achievements")} className="text-sm font-medium text-purple-600 hover:underline">
            View all
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-6 sm:grid-cols-6">
          {earnedBadges.map((badge) => (
            <BadgeCard key={badge.id} {...badge} compact />
          ))}
        </div>
      </section>

      <WeeklyChallengeCard {...WEEKLY_CHALLENGE} onAction={() => navigate("/learner/challenges")} />

      <section className="rounded-2xl border border-black/5 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-900">Top learners this week</h2>
          <button type="button" onClick={() => navigate("/learner/leaderboard")} className="text-sm font-medium text-purple-600 hover:underline">
            View all
          </button>
        </div>
        <div className="mt-3 flex flex-col">
          {TOP_LEARNERS.map((learner, i) => (
            <div key={learner.name} className="flex items-center gap-4 border-b border-neutral-100 py-3 last:border-0">
              <span className="w-5 text-sm text-neutral-400">{i + 1}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700">
                {learner.name.split(" ").map((p) => p[0]).join("")}
              </div>
              <span className={`flex-1 text-sm font-medium ${learner.isCurrentUser ? "text-purple-600" : "text-neutral-900"}`}>
                {learner.name}{learner.isCurrentUser ? " (you)" : ""}
              </span>
              <span className="text-sm font-semibold text-neutral-500">{learner.xp.toLocaleString()} XP</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}