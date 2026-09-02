import { api } from "@/services/api";

export async function getReports() {
  const response = await api.get("/admin/reports");
  return response.data;
}

export async function resolveReport(reportId) {
  const response = await api.patch(`/admin/reports/${reportId}`, {
    status: "Resolved",
  });
  return response.data;
}