import api from "@/services/api";

export async function getUsers() {
  const response = await api.get("/admin/users");
  return response.data;
}

export async function updateUserStatus(userId, status) {
  const response = await api.patch(`/admin/users/${userId}`, { status });
  return response.data;
}