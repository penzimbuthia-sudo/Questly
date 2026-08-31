import api from "@/services/api";

export async function getDiscussions() {
  const response = await api.get("/admin/discussions");
  return response.data;
}

export async function updateDiscussion(threadId, updates) {
  const response = await api.patch(`/admin/discussions/${threadId}`, updates);
  return response.data;
}