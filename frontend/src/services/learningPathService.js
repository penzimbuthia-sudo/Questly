/**
 * src/services/learningPathService.js
 *
 * OWNERSHIP: this file is owned by the learner-UI workstream (C).
 * Don't edit directly — if you need a new export, ask C to add it so the
 * public surface stays intentional and doesn't drift out from under the
 * pages/components that depend on it.
 *
 * This is a mock/in-memory implementation so the learner pages can be
 * built and demoed against a realistic API shape before the real backend
 * exists. Every exported function returns a Promise, mirrors REST-ish
 * naming, and can be swapped for real `fetch` calls later without
 * touching any calling component.
 *
 * State is keyed per user id (see setCurrentUser/clearCurrentUser below)
 * so switching accounts in the same browser session never leaks one
 * learner's progress into another's.
 */

import { PATH_CATALOG } from "../data/learningPaths";

// ---------------------------------------------------------------------------
// Catalog (shared, not user-specific)
// ---------------------------------------------------------------------------

const clone = (value) => JSON.parse(JSON.stringify(value));

const paths = clone(PATH_CATALOG);

// ---------------------------------------------------------------------------
// Per-user store
// ---------------------------------------------------------------------------

/** userId -> { enrollments, userStats, earnedBadges } */
const stores = new Map();
const STORAGE_PREFIX = "questly-learning-state:";

let currentUserId = null;

function buildSeedStore() {
  const enrollments = new Map();
  const userStats = {
    totalXP: 0,
    weeklyXP: 0,
    level: 1,
    streakDays: 0,
  };

  return { enrollments, userStats, earnedBadges: new Set() };
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
  localStorage.setItem(`${STORAGE_PREFIX}${userId}`, JSON.stringify({
    userStats: store.userStats,
    earnedBadges: [...store.earnedBadges],
    enrollments: [...store.enrollments.entries()].map(([pathId, enrollment]) => [
      pathId,
      { ...enrollment, modulesCompleted: [...enrollment.modulesCompleted] },
    ]),
  }));
}

/** Call on login/register (and on mount if a session is restored from storage). */
export function setCurrentUser(userId) {
  if (!userId) {
    clearCurrentUser();
    return;
  }
  currentUserId = userId;
  if (!stores.has(userId)) {
    stores.set(userId, loadStore(userId));
  }
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
  if (!stores.has(currentUserId)) {
    stores.set(currentUserId, loadStore(currentUserId));
  }
  return stores.get(currentUserId);
}

// Illustrative level curve only — swap for the real progression rule
// once product/backend defines it.
const xpForNextLevel = (level) => 250 + (level - 1) * 30;

const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn(getSnapshot()));

function getSnapshot() {
  if (!currentUserId) {
    return { stats: null };
  }
  const { userStats } = getStore();
  return {
    stats: { ...userStats, xpToNextLevel: xpForNextLevel(userStats.level) },
  };
}

const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms));

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Subscribe to XP/level/streak changes. Returns an unsubscribe fn. */
export function subscribe(listener) {
  listeners.add(listener);
  listener(getSnapshot());
  return () => listeners.delete(listener);
}

/** All paths in the catalog, optionally filtered by category ("All" = no filter). */
export async function getAllPaths({ category } = {}) {
  await delay();
  if (!category || category === "All") return clone(paths);
  return clone(paths.filter((p) => p.category === category));
}

export async function getPathById(pathId) {
  await delay();
  const path = paths.find((p) => p.id === pathId);
  if (!path) throw new Error(`Unknown path: ${pathId}`);
  return clone(path);
}

/** Paths the learner is currently enrolled in, with computed progress. */
export async function getMyPaths() {
  await delay();
  const { enrollments } = getStore();
  return Array.from(enrollments.keys()).map((pathId) => {
    const path = paths.find((p) => p.id === pathId);
    return { path: clone(path), progress: computeProgress(pathId) };
  });
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

export async function getPathProgress(pathId) {
  await delay(50);
  return computeProgress(pathId);
}

export function isEnrolled(pathId) {
  return getStore().enrollments.has(pathId);
}

export function isModuleComplete(pathId, moduleId) {
  return getStore().enrollments.get(pathId)?.modulesCompleted.has(moduleId) ?? false;
}

export async function startPath(pathId) {
  await delay();
  const { enrollments } = getStore();
  if (!enrollments.has(pathId)) {
    enrollments.set(pathId, { modulesCompleted: new Set(), xpEarned: 0 });
    persistStore(currentUserId, getStore());
  }
  return computeProgress(pathId);
}

/**
 * Marks a module complete, awards its XP, and advances the progress bar.
 * Idempotent: completing an already-completed module is a no-op that
 * still resolves with the current progress.
 */
export async function completeModule(pathId, moduleId) {
  await delay();
  const path = paths.find((p) => p.id === pathId);
  const module = path?.modules.find((m) => m.id === moduleId);
  if (!path || !module) throw new Error(`Unknown module ${moduleId} on ${pathId}`);

  const { enrollments } = getStore();
  if (!enrollments.has(pathId)) enrollments.set(pathId, { modulesCompleted: new Set(), xpEarned: 0 });
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

/** Adds XP to the learner's total and recomputes level, notifying subscribers. */
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

export function getUserStats() {
  return getSnapshot().stats;
}

export function getEarnedBadges() {
  return [...getStore().earnedBadges];
}