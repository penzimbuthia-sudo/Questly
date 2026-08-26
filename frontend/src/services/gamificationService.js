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
    timestamp: new Date().toISOString()
  })

  return xp
}

export const resetXP = () => {
  xp = 0
  events = []
}

// --- Added for Dashboard.jsx, which reads per-user stats/badges ---
// This service only tracks one in-memory session (no real per-user
// storage yet), so `userId` is accepted for API-shape compatibility but
// not used to look anything up. Streak is derived from distinct calendar
// days seen in `events`; badge thresholds are placeholder milestones
// pending a real rules engine from whoever owns gamification design.

const distinctDayCount = () => {
  const days = new Set(events.map((e) => e.timestamp.slice(0, 10)))
  return days.size
}

const BADGE_THRESHOLDS = [
  { id: 'first-share', name: 'First share', minXp: 1 },
  { id: 'rising-contributor', name: 'Rising contributor', minXp: 250 },
  { id: 'community-pillar', name: 'Community pillar', minXp: 1000 },
]

export const getUserStats = () =>
  Promise.resolve({
    xp,
    rank: "—",
    streak: distinctDayCount(),
  });

export const getBadges = () =>
  Promise.resolve(BADGE_THRESHOLDS.filter((b) => xp >= b.minXp));
