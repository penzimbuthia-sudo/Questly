import { api } from "./api";

const EMPTY_STATS = {
  totalXP: 0,
  weeklyXP: 0,
  level: 1,
  streakDays: 0,
  xpToNextLevel: 250,
};

const listeners = new Set();

function notify(stats = EMPTY_STATS) {
  listeners.forEach((listener) => listener({ stats }));
}

export function subscribe(listener) {
  listeners.add(listener);
  listener({ stats: EMPTY_STATS });
  return () => listeners.delete(listener);
}

export async function getAllPaths({ category } = {}) {
  const query = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
  return api.get(`/learning-paths${query}`);
}

export async function getPathById(pathId) {
  return api.get(`/learning-paths/${pathId}`);
}

export async function getMyPaths() {
  const paths = await api.get("/learning-paths/mine");
  return paths.map((entry) => ({
    path: entry.learning_path,
    progress: {
      modulesCompleted: entry.modules_completed,
      totalModules: entry.total_modules,
      percent: entry.percent,
      xpEarned: entry.xp_earned ?? 0,
      isComplete: entry.percent === 100,
    },
  }));
}

export async function getPathProgress(pathId) {
  const progress = await api.get(`/progress/paths/${pathId}`);
  return {
    modulesCompleted: progress.modules_completed,
    totalModules: progress.total_modules,
    percent: progress.percent,
    xpEarned: progress.xp_earned ?? 0,
    isComplete: progress.percent === 100,
  };
}

export function isEnrolled() {
  return false;
}

export function isModuleComplete() {
  return false;
}

export async function startPath(pathId) {
  await api.post(`/learning-paths/${pathId}/follow`, {});
  return getPathProgress(pathId);
}

export async function completeModule(pathId) {
  const progress = await getPathProgress(pathId);
  notify(EMPTY_STATS);
  return { progress, xpAwarded: 0 };
}

export function awardXP() {
  return EMPTY_STATS;
}

export function getUserStats() {
  return EMPTY_STATS;
}
