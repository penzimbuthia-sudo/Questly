import { api } from "../services/api";

function unwrap(response) {
  return response?.data ?? response;
}

export async function getChallenges() {
  const response = await api.get("/gamification/challenges");
  return unwrap(response) ?? [];
}

export async function getStreak() {
  const response = await api.get("/gamification/streak");
  return unwrap(response) ?? { streak_days: 0 };
}

export async function checkInStreak() {
  const response = await api.post("/gamification/streak/check-in", {});
  return unwrap(response) ?? { streak_days: 0 };
}

export async function joinChallenge(challengeId) {
  const response = await api.post(`/gamification/challenges/${challengeId}/join`, {});
  return unwrap(response);
}

export async function getMyBadges() {
  const response = await api.get("/gamification/badges/me");
  return unwrap(response) ?? [];
}

export async function getContributorLeaderboard() {
  return getLeaderboard("contributor");
}

export async function getLeaderboard(role) {
  const response = await api.get(`/gamification/leaderboard?role=${role}`);
  return unwrap(response) ?? [];
}

export async function getMyStats() {
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