// src/services/gamificationService.js
let xp = 2450 // Starting XP for testing
let events = []
let userStats = {
  xp: 2450,
  rank: 42,
  streak: 7,
  followers: 128,
  following: 64,
  contributions: 89,
  level: 5
}

let badges = [
  { id: 1, name: "First Resource", description: "Shared your first resource", earned: true },
  { id: 2, name: "Community Helper", description: "Helped 10 learners", earned: true },
  { id: 3, name: "Content Creator", description: "Created 5 resources", earned: false },
  { id: 4, name: "Path Builder", description: "Created a learning path", earned: true },
]

export const getXP = () => xp

export const getEvents = () => events

export const getUserStats = (userId) => {
  // Return user stats for dashboard
  return Promise.resolve({
    xp: userStats.xp,
    rank: userStats.rank,
    streak: userStats.streak,
    followers: userStats.followers,
    following: userStats.following,
    contributions: userStats.contributions,
    level: userStats.level
  })
}

export const getBadges = (userId) => {
  return Promise.resolve(badges)
}

export const awardXP = (amount, reason) => {
  xp += amount
  userStats.xp = xp

  events.unshift({
    id: crypto.randomUUID(),
    amount,
    reason,
    timestamp: new Date().toISOString()
  })

  return xp
}

export const resetXP = () => {
  xp = 0
  userStats.xp = 0
  events = []
}

export const addBadge = (badge) => {
  badges.unshift({
    id: badges.length + 1,
    ...badge,
    earned: true
  })
  return badges
}