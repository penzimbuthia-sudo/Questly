import api from './api'

// Owned by Person D. AddResourceModal submits the shape createResource()
// sends here: { title, type, url, description }. Admin's review queue
// (Person E) reads status via getResourceById / listResources.

export async function listResources({ type, status, authorId, search, page = 1, perPage = 20 } = {}) {
  const { data } = await api.get('/resources', {
    params: { type, status, authorId, search, page, perPage },
  })
  return data
}

export async function getResourceById(resourceId) {
  const { data } = await api.get(`/resources/${resourceId}`)
  return data
}

export async function createResource({ title, type, url, description }) {
  // Lands in Admin's review queue with status: 'pending'.
  const { data } = await api.post('/resources', { title, type, url, description })
  return data
}

export async function updateResource(resourceId, updates) {
  const { data } = await api.patch(`/resources/${resourceId}`, updates)
  return data
}

export async function deleteResource(resourceId) {
  await api.delete(`/resources/${resourceId}`)
}

export async function upvoteResource(resourceId) {
  const { data } = await api.post(`/resources/${resourceId}/upvote`)
  return data
}

export async function removeUpvote(resourceId) {
  const { data } = await api.delete(`/resources/${resourceId}/upvote`)
  return data
}

export async function getMyResources({ status, page = 1, perPage = 20 } = {}) {
  const { data } = await api.get('/resources/mine', { params: { status, page, perPage } })
  return data
}

export async function getMyResourceStats() {
  // Powers the StatCard row on the Contributor Dashboard.
  const { data } = await api.get('/resources/mine/stats')
  return data
}

export default {
  listResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  upvoteResource,
  removeUpvote,
  getMyResources,
  getMyResourceStats,
}
