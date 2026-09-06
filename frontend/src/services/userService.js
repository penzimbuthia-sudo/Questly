import { api } from "@/services/api";

export async function getUsers() {
  const response = await api.get("/admin/users/");
  return response.data;
}

export async function createUser(payload) {
  const response = await api.post("/admin/users/", payload);
  return response.data;
}

export async function updateUser(userId, payload) {
  const response = await api.patch(`/admin/users/${userId}`, payload);
  return response.data;
}

export async function deleteUser(userId) {
  return api.delete(`/admin/users/${userId}`);
}

export async function updateUserStatus(userId, status) {
  const response = await api.patch(`/admin/users/${userId}/status`, { status });
  return response.data;
}