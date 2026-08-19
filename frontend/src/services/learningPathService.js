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
 */

import { PATH_CATALOG, MY_PATHS_SEED } from "../data/learningPaths";

// ---------------------------------------------------------------------------
// In-memory store (stands in for the backend/DB during frontend dev)
// ---------------------------------------------------------------------------

const clone = (value) => JSON.parse(JSON.stringify(value));

let paths = clone(PATH_CATALOG);

/** enrollments: pathId -> { modulesCompleted: Set<moduleId>, xpEarned } */
const enrollments = new Map(
  MY_PATHS_SEED.map((seed) => {
    const path = paths.find((p) => p.id === seed.pathId);
    const completedIds = path ? path.modules.slice(0, seed.modulesCompleted).map((m) => m.id) : [];
    return [seed.pathId, { modulesCompleted: new Set(completedIds), xpEarned: seed.xpEarned }];
  })
);

const userStats = {
  totalXP: 2480,
  weeklyXP: 320,
  level: 12,
  streakDays: 12,
};

// Illustrative level curve only — swap for the real progression rule
// once product/backend defines it.
const xpForNextLevel = (level) => 250 + (level - 1) * 30;

const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn(getSnapshot()));

function getSnapshot() {
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
  return Array.from(enrollments.keys()).map((pathId) => {
    const path = paths.find((p) => p.id === pathId);
    return { path: clone(path), progress: computeProgress(pathId) };
  });
}

export function computeProgress(pathId) {
  const path = paths.find((p) => p.id === pathId);
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
  return enrollments.has(pathId);
}

export function isModuleComplete(pathId, moduleId) {
  return enrollments.get(pathId)?.modulesCompleted.has(moduleId) ?? false;
}

export async function startPath(pathId) {
  await delay();
  if (!enrollments.has(pathId)) {
    enrollments.set(pathId, { modulesCompleted: new Set(), xpEarned: 0 });
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

  if (!enrollments.has(pathId)) enrollments.set(pathId, { modulesCompleted: new Set(), xpEarned: 0 });
  const enrollment = enrollments.get(pathId);

  let xpAwarded = 0;
  if (!enrollment.modulesCompleted.has(moduleId)) {
    enrollment.modulesCompleted.add(moduleId);
    enrollment.xpEarned += module.xp;
    xpAwarded = module.xp;
    awardXP(module.xp);
  }

  return { progress: computeProgress(pathId), xpAwarded };
}

/** Adds XP to the learner's total and recomputes level, notifying subscribers. */
export function awardXP(amount) {
  userStats.totalXP += amount;
  userStats.weeklyXP += amount;
  let needed = xpForNextLevel(userStats.level);
  while (userStats.totalXP >= needed) {
    userStats.level += 1;
    needed = xpForNextLevel(userStats.level);
  }
  notify();
  return getSnapshot().stats;
}

export function getUserStats() {
  return getSnapshot().stats;
}
