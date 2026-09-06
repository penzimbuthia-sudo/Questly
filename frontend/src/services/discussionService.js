import { api } from "@/services/api";

export async function getDiscussions() {
  const response = await api.get("/admin/discussions");
  return response.data;
}

export async function getCommunityDiscussions() {
  const response = await api.get("/discussions");
  return response.data;
}

export async function createDiscussion(payload) {
  const response = await api.post("/discussions", payload);
  return response.data;
}

export async function addReply(discussionId, content) {
  const response = await api.post(`/discussions/${discussionId}/comments`, { content });
  return response.data;
}

export async function likeDiscussion(discussionId) {
  return api.post(`/discussions/${discussionId}/like`, {});
}

export async function updateDiscussion(threadId, updates) {
  const response = await api.patch(`/admin/discussions/${threadId}`, updates);
  return response.data;
}