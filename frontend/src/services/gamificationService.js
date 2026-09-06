import { api } from "../services/api";

export async function getChallenges() {
  const response = await api.get("/gamification/challenges");
  return response.data;
}

export async function createChallenge(payload) {
  const response = await api.post("/gamification/challenges", payload);
  return response.data;
}

export async function joinChallenge(challengeId) {
  const response = await api.post(`/gamification/challenges/${challengeId}/join`, {});
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

export async function getLeaderboard(role = "learner") {
  const response = await api.get(`/gamification/leaderboard?role=${role}`);
  return response.data;
}

export async function getLearnerStats() {
  const response = await api.get("/gamification/stats/me");
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

export async function createBadge(payload) {
  const response = await api.post("/gamification/badges", payload);
  return response.data;
}

export async function updateChallenge(challengeId, updates) {
  const response = await api.patch(`/gamification/challenges/${challengeId}`, updates);
  return response.data;
}
