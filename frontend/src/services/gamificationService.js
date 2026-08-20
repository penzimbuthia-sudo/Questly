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
