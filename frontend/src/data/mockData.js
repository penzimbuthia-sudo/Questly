// src/data/mockData.js
//
// Mock content for the contributor workspace. Every export here was
// reverse-engineered from how each page actually reads it (field names,
// types, .map/.find usage) — not guessed independently — so the shapes
// below are the real contract each page expects. This is placeholder
// data for a single demo contributor; replace with real API calls once
// the backend exists.

// --- pages/contributor/Profile.jsx, Settings.jsx, Rewards.jsx --------------

export const currentUser = {
  initials: 'JM',
  name: 'Jordan Mwangi',
  role: 'Contributor',
  level: 8,
  xp: 3240,
  rank: 12,
  bio: 'I write practical frontend tutorials and the occasional React deep-dive.',
  email: 'jordan.mwangi@example.com',
  github: 'jordanmwangi',
};

// --- pages/contributor/Profile.jsx ------------------------------------------
// `icon` must match a key in Profile.jsx's ICONS map: Rocket, Star,
// ShieldCheck, TrendingUp, Crown, Flame.

export const badges = [
  { id: 'first-share', icon: 'Rocket', name: 'First share', criteria: 'Published your first resource', earned: true },
  { id: 'well-reviewed', icon: 'Star', name: 'Well reviewed', criteria: 'Earned 50+ upvotes total', earned: true },
  { id: 'quality-checked', icon: 'ShieldCheck', name: 'Quality checked', criteria: '5 submissions approved on first review', earned: true },
  { id: 'on-the-rise', icon: 'TrendingUp', name: 'On the rise', criteria: 'Doubled your views in one month', earned: false },
  { id: 'top-contributor', icon: 'Crown', name: 'Top contributor', criteria: 'Reach the top 10 on the leaderboard', earned: false },
  { id: 'streak-keeper', icon: 'Flame', name: 'Streak keeper', criteria: 'Contribute 7 days in a row', earned: true },
];

export const contributorStats = {
  resourcesShared: 14,
  learningPaths: 2,
  totalUpvotes: 386,
  badgesEarned: badges.filter((b) => b.earned).length,
};

export const nextMilestone = 'Reach 5,000 XP to unlock the "Mentor" title and a featured spot on the homepage.';

// --- pages/contributor/Analytics.jsx ----------------------------------------

export const contributionAnalytics = [
  { week: 'Wk 1', views: 420, upvotes: 38 },
  { week: 'Wk 2', views: 610, upvotes: 52 },
  { week: 'Wk 3', views: 540, upvotes: 47 },
  { week: 'Wk 4', views: 780, upvotes: 69 },
  { week: 'Wk 5', views: 690, upvotes: 61 },
  { week: 'Wk 6', views: 910, upvotes: 88 },
];

export const contentMix = [
  { name: 'Videos', value: 5, color: 'var(--color-violet-500)' },
  { name: 'Articles', value: 7, color: 'var(--color-amber-300)' },
  { name: 'Paths', value: 2, color: 'var(--color-ink-3)' },
];

export const topPerformingResources = [
  { title: 'CSS Grid in 10 minutes', views: 3120 },
  { title: 'React Hooks deep dive', views: 2480 },
  { title: 'Intro to REST APIs', views: 1860 },
  { title: 'Debugging async/await', views: 1240 },
];

// --- pages/contributor/Challenges.jsx ---------------------------------------

export const contributorChallenges = [
  {
    id: 'share-3-resources',
    title: 'Share 3 new resources',
    description: 'Publish 3 approved resources this week to earn bonus XP.',
    progress: 2,
    total: 3,
    reward: '+300 XP',
  },
  {
    id: 'reply-5-threads',
    title: 'Answer 5 community questions',
    description: 'Help learners by replying to open questions on your content.',
    progress: 5,
    total: 5,
    reward: '+150 XP',
  },
  {
    id: 'publish-a-path',
    title: 'Publish a learning path',
    description: 'Structure a full path with at least 5 modules.',
    progress: 0,
    total: 1,
    reward: '+500 XP',
  },
];

export const challengeStats = {
  active: contributorChallenges.filter((c) => c.progress < c.total).length,
  xpUpForGrabs: contributorChallenges.reduce((sum, c) => sum + parseInt(c.reward.replace(/\D/g, ''), 10), 0),
  completedThisMonth: 4,
  streakNote: "You've completed a challenge 3 weeks running — one more for a bonus badge.",
};

// --- pages/contributor/MyContent.jsx ----------------------------------------
// `type` must be one of 'video' | 'article' | 'path' (matches MyContent.jsx's
// FILTERS and ContentCard.jsx's ICONS/TINTS maps). `status` must be one of
// 'pending' | 'approved' | 'rejected' (matches StatusPill.jsx).

export const myContent = [
  { id: 'c1', title: 'CSS Grid in 10 minutes', type: 'article', status: 'approved', views: 3120, upvotes: 128, updated: '2d ago' },
  { id: 'c2', title: 'React Hooks deep dive', type: 'video', status: 'approved', views: 2480, upvotes: 94, updated: '4d ago' },
  { id: 'c3', title: 'Frontend developer path', type: 'path', status: 'approved', views: 1610, upvotes: 71, updated: '1w ago' },
  { id: 'c4', title: 'Intro to REST APIs', type: 'article', status: 'pending', views: 0, upvotes: 0, updated: 'Just now' },
  { id: 'c5', title: 'Debugging async/await', type: 'video', status: 'rejected', views: 0, upvotes: 0, updated: '3d ago' },
];

// --- pages/contributor/Community.jsx ----------------------------------------

export const communityActivity = [
  { id: 'a1', initials: 'AK', name: 'Aisha K.', action: 'upvoted your resource', target: '"CSS Grid in 10 minutes"', time: '2h ago' },
  { id: 'a2', initials: 'BO', name: 'Brian O.', action: 'commented on', target: '"React Hooks deep dive"', time: '5h ago' },
  { id: 'a3', initials: 'CM', name: 'Chinedu M.', action: 'asked a question on', target: '"Intro to REST APIs"', time: '1d ago' },
  { id: 'a4', initials: 'GW', name: 'Grace W.', action: 'completed', target: '"Frontend developer path"', time: '2d ago' },
];

export const engagementSnapshot = {
  commentsThisWeek: 23,
  questionsAnswered: 9,
  avgResponseTime: '4h',
  mostDiscussed: 'React Hooks deep dive',
  frequentCommenters: [
    { name: 'Aisha K.', initials: 'AK' },
    { name: 'Brian O.', initials: 'BO' },
    { name: 'Chinedu M.', initials: 'CM' },
  ],
};

// --- pages/contributor/Rewards.jsx ------------------------------------------
// `icon` must match a key in Rewards.jsx's ICONS map: Gem, Rocket, Sparkles, Crown.

export const rewards = [
  { id: 'profile-badge', icon: 'Sparkles', name: 'Animated profile badge', cost: 500 },
  { id: 'early-access', icon: 'Rocket', name: 'Early access to new paths', cost: 1500 },
  { id: 'featured-slot', icon: 'Crown', name: 'Featured homepage slot (1 week)', cost: 4000 },
  { id: 'merch-pack', icon: 'Gem', name: 'Questly merch pack', cost: 6000 },
];
