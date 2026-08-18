export const PALETTE = {
  ink: "#17151A",
  darkPurple: "#332D3A",
  butter: "#F4D35E",
  butterDark: "#8A6200",
  royal: "#8B5CF6",
  ivory: "#FAF7F0",
  success: "#1F7A44",
  danger: "#B3492B",
};

export const ROLES = {
  LEARNER: "learner",
  CONTRIBUTOR: "contributor",
  ADMIN: "admin",
};

export const ROLE_LABELS = {
  [ROLES.LEARNER]: "Learner",
  [ROLES.CONTRIBUTOR]: "Contributor",
  [ROLES.ADMIN]: "Admin",
};

export const STATUS_TONE = {
  Published: "success",
  Active: "success",
  Operational: "success",
  Resolved: "info",
  Upcoming: "info",
  Pending: "warning",
  "Under review": "warning",
  Ended: "neutral",
  Suspended: "danger",
  Rejected: "danger",
  Flagged: "danger",
  Clear: "neutral",
};

export const XP_PER_LEVEL = 3000;