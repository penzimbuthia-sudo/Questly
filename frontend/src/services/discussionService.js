import client from '../api/client';

export const discussionService = {
  getDiscussions: async (params = {}) => {
    const response = await client.get('/admin/discussions', { params });
    return response.data;
  },
  getDiscussionById: async (id) => {
    const response = await client.get(`/admin/discussions/${id}`);
    return response.data;
  },
  deleteDiscussion: async (id) => {
    const response = await client.delete(`/admin/discussions/${id}`);
    return response.data;
  },
  lockDiscussion: async (id) => {
    const response = await client.put(`/admin/discussions/${id}/lock`);
    return response.data;
  },
  unlockDiscussion: async (id) => {
    const response = await client.put(`/admin/discussions/${id}/unlock`);
    return response.data;
  },
  pinDiscussion: async (id) => {
    const response = await client.put(`/admin/discussions/${id}/pin`);
    return response.data;
  },
  unpinDiscussion: async (id) => {
    const response = await client.put(`/admin/discussions/${id}/unpin`);
    return response.data;
  },
  getDiscussionComments: async (id, params = {}) => {
    const response = await client.get(`/admin/discussions/${id}/comments`, { params });
    return response.data;
  },
  deleteComment: async (discussionId, commentId) => {
    const response = await client.delete(`/admin/discussions/${discussionId}/comments/${commentId}`);
    return response.data;
  },
  getDiscussionStats: async () => {
    const response = await client.get('/admin/discussions/stats');
    return response.data;
  },
  moderateComment: async (commentId, action) => {
    const response = await client.put(`/admin/comments/${commentId}/moderate`, { action });
    return response.data;
  },
};
