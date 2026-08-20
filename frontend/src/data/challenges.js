// src/data/challenges.js

export const challengeCategories = [
  {
    id: "weekly",
    label: "Weekly Challenges",
    description: "Short, fast-paced tasks to keep you contributing consistently."
  },
  {
    id: "monthly",
    label: "Monthly Challenges",
    description: "Bigger goals with higher XP rewards."
  },
  {
    id: "seasonal",
    label: "Seasonal Quests",
    description: "Long-form, themed challenges with premium badges."
  }
]

export const challenges = [
  {
    id: "c1",
    title: "Share 3 new resources",
    description: "Add three high-quality resources to help learners discover new material.",
    category: "weekly",
    difficulty: "easy",
    reward: "150 XP",
    rewardXP: 150,
    progress: 1,
    total: 3,
    status: "in-progress",
    tags: ["resources", "sharing"]
  },
  {
    id: "c2",
    title: "Create a learning path",
    description: "Build a structured learning path with at least 4 modules.",
    category: "weekly",
    difficulty: "medium",
    reward: "250 XP",
    rewardXP: 250,
    progress: 0,
    total: 1,
    status: "not-started",
    tags: ["path", "modules"]
  },
  {
    id: "c3",
    title: "Earn 500 views",
    description: "Reach a total of 500 views across all your published resources.",
    category: "monthly",
    difficulty: "medium",
    reward: "400 XP",
    rewardXP: 400,
    progress: 320,
    total: 500,
    status: "in-progress",
    tags: ["views", "analytics"]
  },
  {
    id: "c4",
    title: "Get 20 upvotes",
    description: "Receive at least 20 upvotes from learners on your content.",
    category: "monthly",
    difficulty: "hard",
    reward: "600 XP",
    rewardXP: 600,
    progress: 12,
    total: 20,
    status: "in-progress",
    tags: ["upvotes", "community"]
  },
  {
    id: "c5",
    title: "Complete the Contributor Sprint",
    description: "Finish all weekly challenges for 4 consecutive weeks.",
    category: "seasonal",
    difficulty: "hard",
    reward: "1,200 XP + Sprint Badge",
    rewardXP: 1200,
    progress: 2,
    total: 4,
    status: "in-progress",
    tags: ["seasonal", "badge"]
  },
  {
    id: "c6",
    title: "Publish 10 resources",
    description: "Show consistency by publishing 10 high-quality resources.",
    category: "seasonal",
    difficulty: "hard",
    reward: "900 XP",
    rewardXP: 900,
    progress: 7,
    total: 10,
    status: "in-progress",
    tags: ["resources", "publishing"]
  },
  {
    id: "c7",
    title: "Community Mentor",
    description: "Answer 15 learner questions across the platform.",
    category: "monthly",
    difficulty: "medium",
    reward: "500 XP",
    rewardXP: 500,
    progress: 9,
    total: 15,
    status: "in-progress",
    tags: ["community", "questions"]
  },
  {
    id: "c8",
    title: "Path Master",
    description: "Create 3 learning paths with at least 5 modules each.",
    category: "seasonal",
    difficulty: "hard",
    reward: "1,000 XP + Path Master Badge",
    rewardXP: 1000,
    progress: 1,
    total: 3,
    status: "in-progress",
    tags: ["path", "badge"]
  }
]
