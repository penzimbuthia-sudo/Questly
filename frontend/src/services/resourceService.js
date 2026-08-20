import client from '../api/client';

export const resourceService = {
  getResources: async (params = {}) => {
    const response = await client.get('/admin/resources', { params });
    return response.data;
  },
  getResourceById: async (id) => {
    const response = await client.get(`/admin/resources/${id}`);
    return response.data;
  },
  createResource: async (data) => {
    const response = await client.post('/admin/resources', data);
    return response.data;
  },
  updateResource: async (id, data) => {
    const response = await client.put(`/admin/resources/${id}`, data);
    return response.data;
  },
  deleteResource: async (id) => {
    const response = await client.delete(`/admin/resources/${id}`);
    return response.data;
  },
  approveResource: async (id) => {
    const response = await client.put(`/admin/resources/${id}/approve`);
    return response.data;
  },
  rejectResource: async (id, reason) => {
    const response = await client.put(`/admin/resources/${id}/reject`, { reason });
    return response.data;
  },
  getResourceStats: async () => {
    const response = await client.get('/admin/resources/stats');
    return response.data;
  },
  getResourceTypes: async () => {
    const response = await client.get('/admin/resources/types');
    return response.data;
  },
};
