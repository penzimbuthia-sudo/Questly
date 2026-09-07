import { api } from "./api";
import { PATH_CATALOG } from "../data/learningPaths";

const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === "true";
const STORAGE_PREFIX = "questly-learning-state:";

const clone = (value) => JSON.parse(JSON.stringify(value));
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------------------------------------------------------------------------
// Mock engine (only active when USE_MOCK_AUTH=true) — in-memory, per-user,
// backed by localStorage so state survives a refresh during local dev.
// ---------------------------------------------------------------------------

const paths = clone(PATH_CATALOG);
const stores = new Map();
let currentUserId = null;
const listeners = new Set();

function buildSeedStore() {
  return {
    enrollments: new Map(),
    userStats: { totalXP: 0, weeklyXP: 0, level: 1, streakDays: 0 },
    earnedBadges: new Set(),
  };
}

function loadStore(userId) {
  const seed = buildSeedStore();
  try {
    const saved = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}${userId}`) || "null");
    if (!saved) return seed;
    seed.userStats = { ...seed.userStats, ...saved.userStats };
    seed.earnedBadges = new Set(saved.earnedBadges || []);
    seed.enrollments = new Map(
      (saved.enrollments || []).map(([pathId, enrollment]) => [
        pathId,
        { ...enrollment, modulesCompleted: new Set(enrollment.modulesCompleted || []) },
      ])
    );
  } catch {
    return seed;
  }
  return seed;
}

function persistStore(userId, store) {
  if (!userId || !store) return;
  localStorage.setItem(
    `${STORAGE_PREFIX}${userId}`,
    JSON.stringify({
      userStats: store.userStats,
      earnedBadges: [...store.earnedBadges],
      enrollments: [...store.enrollments.entries()].map(([pathId, enrollment]) => [
        pathId,
        { ...enrollment, modulesCompleted: [...enrollment.modulesCompleted] },
      ]),
    })
  );
}

/** Call on login/register (and on mount if a session is restored from storage). */
export function setCurrentUser(userId) {
  if (!userId) {
    clearCurrentUser();
    return;
  }
  currentUserId = userId;
  if (!stores.has(userId)) stores.set(userId, loadStore(userId));
  notify();
}

/** Call on logout. */
export function clearCurrentUser() {
  currentUserId = null;
  notify();
}

function getStore() {
  if (!currentUserId) {
    throw new Error("learningPathService: no current user set (call setCurrentUser after login)");
  }
  if (!stores.has(currentUserId)) stores.set(currentUserId, loadStore(currentUserId));
  return stores.get(currentUserId);
}

// Illustrative level curve only — swap for the real progression rule once
// product/backend defines it.
const xpForNextLevel = (level) => 250 + (level - 1) * 30;
const notify = () => listeners.forEach((fn) => fn(getSnapshot()));

function getSnapshot() {
  if (!currentUserId) return { stats: null };
  const { userStats } = getStore();
  return {
    stats: {
      totalXP: userStats.totalXP,
      weeklyXP: userStats.weeklyXP,
      level: userStats.level,
      streakDays: userStats.streakDays,
      xpToNextLevel: xpForNextLevel(userStats.level),
    },
  };
}

export function computeProgress(pathId) {
  const path = paths.find((p) => p.id === pathId);
  const { enrollments } = getStore();
  const enrollment = enrollments.get(pathId);
  if (!path || !enrollment) return null;
  const total = path.modules.length;
  const done = enrollment.modulesCompleted.size;
  return {
    modulesCompleted: done,
    totalModules: total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
    xpEarned: enrollment.xpEarned,
    isComplete: done === total,
  };
}

export function isEnrolled(pathId) {
  return getStore().enrollments.has(pathId);
}

export function isModuleComplete(pathId, moduleId) {
  return getStore().enrollments.get(pathId)?.modulesCompleted.has(moduleId) ?? false;
}

export function awardXP(amount) {
  const { userStats } = getStore();
  userStats.totalXP += amount;
  userStats.weeklyXP += amount;
  let needed = xpForNextLevel(userStats.level);
  while (userStats.totalXP >= needed) {
    userStats.level += 1;
    needed = xpForNextLevel(userStats.level);
  }
  persistStore(currentUserId, getStore());
  notify();
  return getSnapshot().stats;
}

export function getEarnedBadges() {
  return [...getStore().earnedBadges];
}

export function subscribe(callback) {
  listeners.add(callback);
  callback(getSnapshot());
  return () => listeners.delete(callback);
}

// ---------------------------------------------------------------------------
// Public API — mock engine when USE_MOCK_AUTH=true, real backend otherwise.
// ---------------------------------------------------------------------------

export async function getMyStats() {
  if (USE_MOCK_AUTH) {
    await delay(50);
    return getSnapshot().stats;
  }
  const response = await api.get("/auth/me");
  const user = response.data;
  const level = Math.floor(user.xp_total / 500) + 1; // illustrative — no backend-authoritative level system exists yet
  return {
    totalXP: user.xp_total,
    streakDays: user.streak_days,
    level,
    xpToNextLevel: level * 500,
  };
}

export async function getAllPaths({ category } = {}) {
  if (USE_MOCK_AUTH) {
    await delay();
    return category && category !== "All"
      ? clone(paths.filter((p) => p.category === category))
      : clone(paths);
  }
  const response = await api.get("/learning-paths", {
    params: category && category !== "All" ? { category } : {},
  });
  return response.data;
}

export async function getPathById(pathId) {
  if (USE_MOCK_AUTH) {
    await delay();
    return clone(paths.find((p) => p.id === pathId) ?? null);
  }
  const response = await api.get(`/learning-paths/${pathId}`);
  return response.data;
}

export async function getMyPaths() {
  if (USE_MOCK_AUTH) {
    await delay();
    const { enrollments } = getStore();
    return Array.from(enrollments.keys()).map((pathId) => {
      const path = paths.find((p) => p.id === pathId);
      return { path: clone(path), progress: computeProgress(pathId) };
    });
  }
  const response = await api.get("/learning-paths/mine");
  return response.data.map((entry) => ({
    path: entry.learning_path,
    progress: {
      modulesCompleted: entry.modules_completed,
      totalModules: entry.total_modules,
      percent: entry.percent,
    },
  }));
}

export async function startPath(pathId) {
  if (USE_MOCK_AUTH) {
    await delay();
    const { enrollments } = getStore();
    if (!enrollments.has(pathId)) {
      enrollments.set(pathId, { modulesCompleted: new Set(), xpEarned: 0 });
      persistStore(currentUserId, getStore());
    }
    return computeProgress(pathId);
  }
  const response = await api.post(`/learning-paths/${pathId}/follow`);
  return response.data;
}

/**
 * Marks a module complete, awards its XP, and advances the progress bar.
 * Idempotent: completing an already-completed module is a no-op that still
 * resolves with the current progress.
 */
export async function completeModule(pathId, moduleId) {
  if (USE_MOCK_AUTH) {
    await delay();
    const path = paths.find((p) => p.id === pathId);
    const module = path?.modules.find((m) => m.id === moduleId);
    if (!path || !module) throw new Error(`Unknown module ${moduleId} on ${pathId}`);

    const { enrollments } = getStore();
    if (!enrollments.has(pathId)) {
      enrollments.set(pathId, { modulesCompleted: new Set(), xpEarned: 0 });
    }
    const enrollment = enrollments.get(pathId);

    let xpAwarded = 0;
    const badgesAwarded = [];
    if (!enrollment.modulesCompleted.has(moduleId)) {
      enrollment.modulesCompleted.add(moduleId);
      enrollment.xpEarned += module.xp;
      xpAwarded = module.xp;
      awardXP(module.xp);

      if (!getStore().earnedBadges.has("Spark Ignited")) {
        getStore().earnedBadges.add("Spark Ignited");
        badgesAwarded.push("Spark Ignited");
      }
      if (computeProgress(pathId).isComplete && !getStore().earnedBadges.has("Pathfinder")) {
        getStore().earnedBadges.add("Pathfinder");
        badgesAwarded.push("Pathfinder");
      }
      persistStore(currentUserId, getStore());
    }

    return { progress: computeProgress(pathId), xpAwarded, badgesAwarded };
  }
  const response = await api.post(`/modules/${moduleId}/complete`);
  return { xpAwarded: response.data.xp_awarded };
}

export async function getPathProgress(pathId) {
  if (USE_MOCK_AUTH) {
    await delay(50);
    return computeProgress(pathId);
  }
  const response = await api.get(`/progress/paths/${pathId}`);
  return response.data;
}

export function getUserStats() {
  return getSnapshot().stats;
}