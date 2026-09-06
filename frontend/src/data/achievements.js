/**
 * src/data/achievements.js
 *
 * Badge catalog shown on the Achievements page and Profile. `earned` here
 * is the seed state for the demo learner (Penzi Mbuthia) — in the real
 * app this flag is computed server-side per-user.
 */

export const ACHIEVEMENTS = [
  {
    id: "spark-ignited",
    title: "Spark ignited",
    description: "Complete your first module",
    icon: "zap",
    earned: true,
  },
  {
    id: "trailblazer",
    title: "Trailblazer",
    description: "Finish your first learning path",
    icon: "flag",
    earned: true,
  },
  {
    id: "quiz-champion",
    title: "Quiz champion",
    description: "Score 90%+ on 10 quizzes",
    icon: "shield",
    earned: true,
  },
  {
    id: "knowledge-sharer",
    title: "Knowledge sharer",
    description: "Share 10 resources with the community",
    icon: "users",
    earned: true,
  },
  {
    id: "streak-keeper",
    title: "Streak keeper",
    description: "Maintain a 7-day learning streak",
    icon: "flame",
    earned: true,
  },
  {
    id: "elite-ranked",
    title: "Elite ranked",
    description: "Reach the top 10% on the leaderboard",
    icon: "crown",
    earned: true,
  },
  {
    id: "perfect-score",
    title: "Perfect score",
    description: "Get 100% on any quiz",
    icon: "lock",
    earned: false,
  },
  {
    id: "path-architect",
    title: "Path architect",
    description: "Create a learning path of your own",
    icon: "lock",
    earned: false,
  },
  {
    id: "century-club",
    title: "Century club",
    description: "Complete 100 modules",
    icon: "lock",
    earned: false,
  },
  {
    id: "quiz-streak",
    title: "Quiz streak",
    description: "Pass 5 quizzes in a row",
    icon: "brain",
    earned: false,
  },
  {
    id: "helpful-voice",
    title: "Helpful voice",
    description: "Receive 10 upvotes on your discussion answers",
    icon: "message",
    earned: false,
  },
  {
    id: "pathfinder",
    title: "Pathfinder",
    description: "Explore 5 different learning paths",
    icon: "compass",
    earned: false,
  },
  {
    id: "xp-hunter",
    title: "XP hunter",
    description: "Earn 5,000 XP from learning activities",
    icon: "target",
    earned: false,
  },
  {
    id: "weekend-warrior",
    title: "Weekend warrior",
    description: "Complete 3 modules over a weekend",
    icon: "calendar",
    earned: false,
  },
];
