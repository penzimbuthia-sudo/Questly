// src/services/resourceService.js
import { v4 as uuid } from 'uuid'
import { awardXP } from './gamificationService'

let resources = []

const shapeResource = (data) => ({
  id: uuid(),
  title: data.title,
  url: data.url || null,
  type: data.type, // video | article | doc | path
  modules: data.modules || null,
  status: 'pending',
  views: 0,
  upvotes: 0,
  updated: 'Just now',
  submittedAt: new Date().toISOString()
})

export const addResource = (data) => {
  const resource = shapeResource(data)
  resources.unshift(resource)
  awardXP(50, `Added resource: ${resource.title}`)
  return resource
}

export const addPath = (data) => {
  const path = shapeResource({ ...data, type: 'path' })
  resources.unshift(path)
  awardXP(120, `Created learning path: ${path.title}`)
  return path
}

export const getResources = () => resources

export const getResource = (id) => resources.find((r) => r.id === id) || null

export const updateResource = (id, updates) => {
  const index = resources.findIndex((r) => r.id === id)
  if (index === -1) return null

  resources[index] = {
    ...resources[index],
    ...updates,
    updated: 'Just now'
  }

  return resources[index]
}

export const deleteResource = (id) => {
  resources = resources.filter((r) => r.id !== id)
}

export const setReviewStatus = (id, status) => {
  const item = getResource(id)
  if (!item) return null

  item.status = status
  item.updated = 'Just now'

  if (status === 'published') {
    awardXP(80, `Resource published: ${item.title}`)
  }

  return item
}

export const addView = (id) => {
  const item = getResource(id)
  if (!item) return null
  item.views += 1
  return item.views
}

export const addUpvote = (id) => {
  const item = getResource(id)
  if (!item) return null
  item.upvotes += 1
  return item.upvotes
}
