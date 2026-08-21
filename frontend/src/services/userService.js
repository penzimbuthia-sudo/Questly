import client from '../api/client';

export const userService = {
  getUsers: async (params = {}) => {
    const response = await client.get('/admin/users', { params });
    return response.data;
  },
  getUserById: async (id) => {
    const response = await client.get(`/admin/users/${id}`);
    return response.data;
  },
  createUser: async (userData) => {
    const response = await client.post('/admin/users', userData);
    return response.data;
  },
  updateUser: async (id, userData) => {
    const response = await client.put(`/admin/users/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await client.delete(`/admin/users/${id}`);
    return response.data;
  },
  changeRole: async (id, role) => {
    const response = await client.put(`/admin/users/${id}/role`, { role });
    return response.data;
  },
  toggleStatus: async (id, status) => {
    const response = await client.put(`/admin/users/${id}/status`, { status });
    return response.data;
  },
  banUser: async (id, reason) => {
    const response = await client.put(`/admin/users/${id}/ban`, { reason });
    return response.data;
  },
  getUserActivity: async (id) => {
    const response = await client.get(`/admin/users/${id}/activity`);
    return response.data;
  },
  getUserStats: async () => {
    const response = await client.get('/admin/users/stats');
    return response.data;
  },
};
