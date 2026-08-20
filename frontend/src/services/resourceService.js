// src/services/resourceService.js

import { v4 as uuid } from 'uuid'
import { awardXP } from './gamificationService'

/**
 * Local in‑memory store (replace with API later)
 */
let resources = []

/**
 * Shape for a new resource
 */
function createResourceShape(data) {
  return {
    id: uuid(),
    title: data.title,
    url: data.url || null,
    type: data.type, // "video" | "article" | "doc"
    status: 'pending',
    views: 0,
    upvotes: 0,
    updated: 'Just now',
    submittedAt: new Date().toISOString()
  }
}

/**
 * Shape for a new learning path
 */
function createPathShape(data) {
  return {
    id: uuid(),
    title: data.title,
    type: 'path',
    modules: data.modules || [],
    status: 'pending',
    views: 0,
    upvotes: 0,
    updated: 'Just now',
    submittedAt: new Date().toISOString()
  }
}

/**
 * Create a new resource
 */
export function addResource(data) {
  const resource = createResourceShape(data)
  resources.unshift(resource)

  // XP reward for contributing
  awardXP(50, `Added resource: ${resource.title}`)

  return resource
}

/**
 * Create a new learning path
 */
export function addPath(data) {
  const path = createPathShape(data)
  resources.unshift(path)

  // XP reward for creating a path
  awardXP(120, `Created learning path: ${path.title}`)

  return path
}

/**
 * Get all resources
 */
export function getResources() {
  return resources
}

/**
 * Get a single resource by ID
 */
export function getResource(id) {
  return resources.find((r) => r.id === id) || null
}

/**
 * Update a resource
 */
export function updateResource(id, updates) {
  const index = resources.findIndex((r) => r.id === id)
  if (index === -1) return null

  resources[index] = {
    ...resources[index],
    ...updates,
    updated: 'Just now'
  }

  return resources[index]
}

/**
 * Delete a resource
 */
export function deleteResource(id) {
  resources = resources.filter((r) => r.id !== id)
}

/**
 * Approve or reject (Admin workflow)
 */
export function setReviewStatus(id, status) {
  const item = getResource(id)
  if (!item) return null

  item.status = status
  item.updated = 'Just now'

  if (status === 'published') {
    awardXP(80, `Resource published: ${item.title}`)
  }

  return item
}

/**
 * Increment view count
 */
export function addView(id) {
  const item = getResource(id)
  if (!item) return null

  item.views += 1
  return item.views
}

/**
 * Upvote a resource
 */
export function addUpvote(id) {
  const item = getResource(id)
  if (!item) return null

  item.upvotes += 1
  return item.upvotes
}
