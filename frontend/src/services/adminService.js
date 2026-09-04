import { api } from "./api";

export async function getDashboardStats() {
  const response = await api.get("/admin/dashboard/stats");
  return response.data;
}

export async function getRoleDistribution() {
  const response = await api.get("/admin/role-distribution");
  return response.data;
}

export async function getPendingResources() {
  const response = await api.get("/admin/resources/pending");
  return response.data;
}

export async function updateResourceStatus(resourceId, status) {
  const response = await api.patch(`/admin/resources/${resourceId}/status`, { status });
  return response.data;
}