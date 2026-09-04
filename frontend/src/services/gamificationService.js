import { api } from "../services/api";

export async function getChallenges() {
  return api.get("/gamification/challenges");
}

export async function getMyBadges() {
  return api.get("/gamification/badges/me");
}

export async function getContributorLeaderboard() {
  return api.get("/gamification/leaderboard?role=contributor");
}

export async function getMyStats() {
  return api.get("/contributor/me/stats");
}

export async function getBadgeStats() {
  return api.get("/gamification/badges/stats");
}

export async function updateChallenge(challengeId, updates) {
  return api.patch(`/gamification/challenges/${challengeId}`, updates);
}

export async function getLeaderboard({ role } = {}) {
  return api.get("/gamification/leaderboard", { params: role ? { role } : {} });
}