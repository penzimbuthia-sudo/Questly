// src/services/gamificationService.js
let xp = 0
let events = []

export const getXP = () => xp

export const getEvents = () => events

export const awardXP = (amount, reason) => {
  xp += amount

  events.unshift({
    id: crypto.randomUUID(),
    amount,
    reason,
    timestamp: new Date().toISOString(),
  })

  return xp
}

export const resetXP = () => {
  xp = 0
  events = []
}

// Derives consecutive-day streak from actual awardXP event timestamps —
// this part is real, not guessed.
const computeStreak = () => {
  if (events.length === 0) return 0

  const days = new Set(events.map((e) => e.timestamp.slice(0, 10)))
  let streak = 0
  const cursor = new Date()

  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}

// TODO: this is a placeholder heuristic, not a real leaderboard lookup —
// replace once there's an actual endpoint to rank users against each other.
const computeRank = (currentXp) => Math.max(1, 20 - Math.floor(currentXp / 100))

// TODO: userId is currently ignored — state here is global, not per-user,
// since there's no backend/auth wiring into this service yet.
export const getUserStats = (userId) =>
  Promise.resolve({
    xp,
    rank: computeRank(xp),
    streak: computeStreak(),
  })

const BADGE_DEFINITIONS = [
  { id: 'first-contribution', name: 'First contribution', unlocked: () => events.length >= 1 },
  { id: 'streak-7', name: '7-day streak', unlocked: () => computeStreak() >= 7 },
  { id: 'xp-500', name: 'Rising contributor', unlocked: () => xp >= 500 },
]

export const getBadges = (userId) =>
  Promise.resolve(
    BADGE_DEFINITIONS.filter((b) => b.unlocked()).map(({ id, name }) => ({ id, name }))
  )