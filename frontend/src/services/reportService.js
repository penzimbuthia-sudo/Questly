import client from '../api/client';

export const reportService = {
  getReports: async (params = {}) => {
    const response = await client.get('/admin/reports', { params });
    return response.data;
  },
  getReportById: async (id) => {
    const response = await client.get(`/admin/reports/${id}`);
    return response.data;
  },
  resolveReport: async (id, resolution) => {
    const response = await client.put(`/admin/reports/${id}/resolve`, { resolution });
    return response.data;
  },
  rejectReport: async (id, reason) => {
    const response = await client.put(`/admin/reports/${id}/reject`, { reason });
    return response.data;
  },
  getReportStats: async () => {
    const response = await client.get('/admin/reports/stats');
    return response.data;
  },
  getReportTypes: async () => {
    const response = await client.get('/admin/reports/types');
    return response.data;
  },
  banUserFromReport: async (reportId, userId, duration) => {
    const response = await client.post(`/admin/reports/${reportId}/ban`, { userId, duration });
    return response.data;
  },
  deleteContentFromReport: async (reportId, contentType, contentId) => {
    const response = await client.post(`/admin/reports/${reportId}/delete`, { contentType, contentId });
    return response.data;
  },
};
