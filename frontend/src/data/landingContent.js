import {
  Route,
  Zap,
  Award,
  Trophy,
  MessageCircle,
  Swords,
  BookOpen,
  Share2,
  BarChart3,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Features", id: "features" },        // Changed from "features-how"
  { label: "How it works", id: "how-it-works" }, // Changed from "features-how"
  { label: "Community", id: "community" },
];

export const FEATURES = [
  {
    icon: Route,
    title: "Structured learning paths",
    desc: "Modules, resources, and end-of-module quizzes, curated by the community.",
  },
  {
    icon: Zap,
    title: "Points & XP",
    desc: "Earn XP for completing modules, sharing resources, and passing quizzes.",
  },
  {
    icon: Award,
    title: "Achievements & badges",
    desc: "Unlock badges for streaks, quiz mastery, and contributions.",
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    desc: "See where you rank — weekly, monthly, or all-time.",
  },
  {
    icon: MessageCircle,
    title: "Rate, comment, discuss",
    desc: "Every resource is rated and discussed, so the best rises to the top.",
  },
  {
    icon: Swords,
    title: "Challenges & seasonal events",
    desc: "Weekly quests and limited-time events for bonus XP and badges.",
  },
];

export const LEARNER_STEPS = [
  { icon: BookOpen, title: "Follow a path", desc: "Pick a path made of modules, resources, and quizzes." },
  { icon: Zap, title: "Learn & earn XP", desc: "Complete modules and quizzes to earn XP and badges." },
  { icon: Trophy, title: "Climb the leaderboard", desc: "Keep your streak alive and track your rank." },
];

export const CONTRIBUTOR_STEPS = [
  { icon: Share2, title: "Share resources & paths", desc: "Publish videos, articles, and grouped learning paths." },
  { icon: MessageCircle, title: "Engage with learners", desc: "Rate, comment, and join discussions on your work." },
  { icon: BarChart3, title: "Grow your reputation", desc: "Earn XP and badges for every contribution." },
];

export const HERO_STATS = [
  { value: "50k+", label: "Active learners" },
  { value: "12k+", label: "Shared resources" },
  { value: "1,200+", label: "Learning paths" },
];

export const TESTIMONIALS = [
  {
    name: "Aisha K.",
    role: "Frontend contributor",
    quote: "The badges and streaks genuinely got me to finish paths I'd normally abandon halfway through.",
  },
  {
    name: "Brian O.",
    role: "Backend learner",
    quote: "Ratings and comments on every resource meant I stopped wasting time on outdated tutorials.",
  },
  {
    name: "Chinedu M.",
    role: "Data science learner",
    quote: "Weekly challenges turned solo studying into something that actually feels social.",
  },
];