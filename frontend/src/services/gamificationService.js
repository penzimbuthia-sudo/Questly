import { api } from "../services/api";

export async function getChallenges() {
  const response = await api.get("/gamification/challenges");
  return response.data;
}

export async function getMyBadges() {
  const response = await api.get("/gamification/badges/me");
  return response.data;
}

export async function getContributorLeaderboard() {
  const response = await api.get("/gamification/leaderboard?role=contributor");
  return response.data;
}

export async function getMyStats() {
  const response = await api.get("/contributor/me/stats");
  return response.data;
}

export async function getBadgeStats() {
  const response = await api.get("/gamification/badges/stats");
  return response.data;
}

export async function updateChallenge(challengeId, updates) {
  const response = await api.patch(`/gamification/challenges/${challengeId}`, updates);
  return response.data;
}

export async function getLeaderboard({ role } = {}) {
  const response = await api.get("/gamification/leaderboard", { params: role ? { role } : {} });
  return response.data;
}