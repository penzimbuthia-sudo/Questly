import { api } from "../services/api";
import { getUserStats } from "./learningPathService";

const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === "true";
const MOCK_STATS_PREFIX = "questly-contributor-stats:";

function unwrap(response) {
  return response?.data ?? response;
}

function getMockUser() {
  try {
    const token = localStorage.getItem("token");
    const payload = token?.split(".")[1];
    return payload ? JSON.parse(atob(payload)) : null;
  } catch {
    return null;
  }
}

function getMockContributorStats() {
  const user = getMockUser();
  const saved = JSON.parse(
    localStorage.getItem(`${MOCK_STATS_PREFIX}${user?.sub || "anonymous"}`) || "null"
  );
  return saved || { xp: 0, resources: 0, paths: 0, upvotes: 0, streak_days: 0 };
}

export async function getChallenges() {
  if (USE_MOCK_AUTH) return [];
  const response = await api.get("/gamification/challenges");
  return unwrap(response) ?? [];
}

export async function getStreak() {
  const response = await api.get("/gamification/streak");
  return unwrap(response) ?? { streak_days: 0 };
}

export async function checkInStreak() {
  if (USE_MOCK_AUTH) return { streak_days: getMockContributorStats().streak_days ?? 0 };
  const response = await api.post("/gamification/streak/check-in", {});
  return unwrap(response) ?? { streak_days: 0 };
}

export async function joinChallenge(challengeId) {
  if (USE_MOCK_AUTH) return { challenge: { id: challengeId }, progress: 0, joined: true };
  const response = await api.post(`/gamification/challenges/${challengeId}/join`, {});
  return unwrap(response);
}

export async function getMyBadges() {
  if (USE_MOCK_AUTH) return [];
  const response = await api.get("/gamification/badges/me");
  return unwrap(response) ?? [];
}

export async function getContributorLeaderboard() {
  return getLeaderboard("contributor");
}

export async function getLeaderboard(role) {
  if (USE_MOCK_AUTH) {
    const user = getMockUser();
    if (user?.role !== role) return [];
    const stats = role === "contributor" ? getMockContributorStats() : (getUserStats() ?? {});
    return [
      {
        rank: 1,
        id: user.sub,
        name: user.name || user.email || "New user",
        xp: stats.totalXP ?? 0,
        streak_days: stats.streak_days ?? stats.streakDays ?? 0,
        isYou: true,
      },
    ];
  }
  const response = await api.get(`/gamification/leaderboard?role=${role}`);
  return unwrap(response) ?? [];
}

export async function getMyStats() {
  if (USE_MOCK_AUTH) return getMockContributorStats();
  const response = await api.get("/contributor/me/stats");
  return unwrap(response) ?? {};
}

export async function getBadgeStats() {
  const response = await api.get("/gamification/badges/stats");
  return unwrap(response) ?? {};
}

export async function updateChallenge(challengeId, updates) {
  const response = await api.patch(`/gamification/challenges/${challengeId}`, updates);
  return unwrap(response);
}