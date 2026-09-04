import { api } from "@/services/api";

export async function getReports() {
  const response = await api.get("/admin/reports");
  return response.data;
}

export async function resolveReport(reportId, note) {
  const response = await api.post(`/admin/reports/${reportId}/resolve`, { resolution_note: note });
  return response.data;
}

export async function rejectReport(reportId, note) {
  const response = await api.post(`/admin/reports/${reportId}/reject`, { resolution_note: note });
  return response.data;
}