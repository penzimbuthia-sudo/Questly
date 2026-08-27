export const currentUser = {
  initials: 'IM',
  name: 'Iann M.',
  role: 'Contributor',
  level: 7,
  xp: 1248,
  rank: 7,
  bio: 'Sharing frontend and React resources with the Codalore community.',
  email: 'iann@example.com',
  github: 'DalzWrld',
};

export const badges = [
  { id: 1, icon: 'Rocket', name: 'First contribution', criteria: 'Shared your first resource', earned: true },
  { id: 2, icon: 'Flame', name: '7-day streak', criteria: 'Contributed 7 days in a row', earned: true },
  { id: 3, icon: 'Star', name: 'Community favorite', criteria: 'Reached 100 upvotes', earned: true },
  { id: 4, icon: 'ShieldCheck', name: 'Quality reviewer', criteria: 'Approved on first submission 5 times', earned: false },
  { id: 5, icon: 'TrendingUp', name: 'Rising contributor', criteria: 'Reach 2,000 XP', earned: false },
  { id: 6, icon: 'Crown', name: 'Top 10', criteria: 'Reach the top 10 on the leaderboard', earned: false },
];

export const contributorStats = {
  resourcesShared: 14,
  learningPaths: 3,
  totalUpvotes: 212,
  badgesEarned: 3,
};

export const nextMilestone = 'Reach 2,000 XP to unlock the Rising Contributor badge (752 XP to go).';

export const rewards = [
  { id: 1, icon: 'Gem', name: 'Profile badge frame', cost: 500 },
  { id: 2, icon: 'Rocket', name: 'Early access to new paths', cost: 1000 },
  { id: 3, icon: 'Sparkles', name: 'Custom profile theme', cost: 1500 },
  { id: 4, icon: 'Crown', name: 'Featured contributor spotlight', cost: 3000 },
];

export const contributorChallenges = [
  {
    id: 1,
    title: 'Share 3 resources this week',
    description: 'Publish three approved resources before Sunday to earn bonus XP.',
    progress: 2,
    total: 3,
    reward: '+150 XP',
    difficulty: 'Easy',
    category: 'Content',
  },
  {
    id: 2,
    title: 'Build a complete learning path',
    description: 'Create a path with at least 4 modules and a quiz on each.',
    progress: 1,
    total: 4,
    reward: '+400 XP',
    difficulty: 'Hard',
    category: 'Paths',
  },
  {
    id: 3,
    title: 'Answer 5 community questions',
    description: 'Reply to discussion threads on your published resources.',
    progress: 5,
    total: 5,
    reward: '+100 XP',
    difficulty: 'Easy',
    category: 'Community',
  },
];

export const challengeStats = {
  active: 3,
  xpUpForGrabs: 650,
  completedThisMonth: 6,
  streakNote: "You've completed a challenge every week this month — keep it going for a streak bonus.",
};

export const myContent = [
  { id: 1, title: 'State Management Patterns in React', type: 'path', status: 'published', views: 1204, upvotes: 88, updated: '2 days ago' },
  { id: 2, title: 'Intro to Flask APIs', type: 'video', status: 'published', views: 860, upvotes: 61, updated: '5 days ago' },
  { id: 3, title: 'Debugging Async JavaScript', type: 'article', status: 'pending', views: 0, upvotes: 0, updated: '1 day ago' },
  { id: 4, title: 'SQL Joins Explained', type: 'video', status: 'published', views: 540, upvotes: 39, updated: '1 week ago' },
];

export const communityActivity = [
  { id: 1, initials: 'AK', name: 'Amina K.', action: 'upvoted', target: 'State Management Patterns in React', time: '2h ago' },
  { id: 2, initials: 'BO', name: 'Brian O.', action: 'commented on', target: 'Intro to Flask APIs', time: '5h ago' },
  { id: 3, initials: 'FN', name: 'Faith N.', action: 'completed', target: 'SQL Joins Explained', time: '1d ago' },
  { id: 4, initials: 'KM', name: 'Kevin M.', action: 'asked a question on', target: 'Debugging Async JavaScript', time: '2d ago' },
];

export const engagementSnapshot = {
  commentsThisWeek: 18,
  questionsAnswered: 12,
  avgResponseTime: '3h',
  mostDiscussed: 'State Management Patterns in React',
  frequentCommenters: [
    { name: 'Amina K.', initials: 'AK' },
    { name: 'Brian O.', initials: 'BO' },
    { name: 'Faith N.', initials: 'FN' },
  ],
};

export const contributionAnalytics = [
  { week: 'W1', views: 320, upvotes: 24 },
  { week: 'W2', views: 410, upvotes: 31 },
  { week: 'W3', views: 380, upvotes: 28 },
  { week: 'W4', views: 560, upvotes: 45 },
  { week: 'W5', views: 610, upvotes: 52 },
  { week: 'W6', views: 704, upvotes: 61 },
];

export const contentMix = [
  { name: 'Videos', value: 6, color: 'var(--color-violet-500)' },
  { name: 'Articles', value: 5, color: 'var(--color-amber-400)' },
  { name: 'Paths', value: 3, color: 'var(--color-violet-300)' },
];

export const topPerformingResources = [
  { title: 'State Management Patterns in React', views: 1204 },
  { title: 'Intro to Flask APIs', views: 860 },
  { title: 'SQL Joins Explained', views: 540 },
  { title: 'Debugging Async JavaScript', views: 210 },
];