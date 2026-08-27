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
  const response = await api.get("/gamification/me/stats");
  return response.data;
}
