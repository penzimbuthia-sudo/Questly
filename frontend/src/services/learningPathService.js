import { api } from "./api";

export async function getMyStats() {
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
  const response = await api.get("/learning-paths", { params: category && category !== "All" ? { category } : {} });
  return response.data;
}

export async function getPathById(pathId) {
  const response = await api.get(`/learning-paths/${pathId}`);
  return response.data;
}

export async function getMyPaths() {
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
  const response = await api.post(`/learning-paths/${pathId}/follow`);
  return response.data;
}

export async function completeModule(pathId, moduleId) {
  const response = await api.post(`/modules/${moduleId}/complete`);
  return { xpAwarded: response.data.xp_awarded };
}

export async function getPathProgress(pathId) {
  const response = await api.get(`/progress/paths/${pathId}`);
  return response.data;
}

export function isModuleComplete(pathId, moduleId) {
  return enrollments.get(pathId)?.modulesCompleted.has(moduleId) ?? false;
}

export function getUserStats() {
  return getSnapshot().stats;
}