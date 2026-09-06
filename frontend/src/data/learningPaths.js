/**
 * src/data/learningPaths.js
 *
 * Static catalog of learning paths + the modules inside each one.
 * This is the seed data consumed by `learningPathService`. Nothing in
 * this file mutates at runtime — runtime enrollment/progress state
 * lives inside the service, not here.
 */

export const CATEGORIES = ["Frontend", "Backend", "Data science", "Design", "DevOps"];

export const PATH_CATALOG = [
  {
    id: "python-for-beginners",
    title: "Python for beginners",
    description: "Learn Python from scratch — syntax, data structures, and small scripts you can actually run.",
    category: "Backend",
    level: "Beginner",
    icon: "⺒",
    xpReward: 1200,
    rating: 4.8,
    author: "Aisha K.",
    modules: buildModules("python-for-beginners", 8, 150),
  },
  {
    id: "javascript-essentials",
    title: "JavaScript essentials",
    description: "The JS you need before touching a framework — variables, functions, arrays, async.",
    category: "Frontend",
    level: "Beginner",
    icon: "JS",
    xpReward: 1000,
    rating: 4.8,
    author: "Aisha K.",
    modules: buildModules("javascript-essentials", 10, 100),
  },
  {
    id: "ui-ux-design",
    title: "UI/UX design",
    description: "Design thinking, wireframes, and prototyping fundamentals for product work.",
    category: "Design",
    level: "Intermediate",
    icon: "✐",
    xpReward: 1800,
    rating: 4.8,
    author: "Aisha K.",
    modules: buildModules("ui-ux-design", 14, 129),
  },
  {
    id: "data-science-fundamentals",
    title: "Data science fundamentals",
    description: "Statistics, pandas, and visualization — the toolkit behind every data role.",
    category: "Data science",
    level: "Intermediate",
    icon: "⛮⛭",
    xpReward: 2100,
    rating: 4.8,
    author: "Aisha K.",
    modules: buildModules("data-science-fundamentals", 16, 131),
  },
  {
    id: "react-developer-path",
    title: "React developer path",
    description: "Components, hooks, and state management — build real interfaces with React.",
    category: "Frontend",
    level: "Intermediate",
    icon: "⚛",
    xpReward: 2400,
    rating: 4.9,
    author: "Aisha K.",
    modules: buildModules("react-developer-path", 16, 150),
  },
  {
    id: "nodejs-backend-path",
    title: "Node.js backend path",
    description: "APIs, auth, and databases — server-side JavaScript from first principles.",
    category: "Backend",
    level: "Intermediate",
    icon: "◆",
    xpReward: 2200,
    rating: 4.7,
    author: "Aisha K.",
    modules: buildModules("nodejs-backend-path", 18, 122),
  },
];

function buildModules(pathId, count, xpEach) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${pathId}-m${i + 1}`,
    title: `Module ${i + 1}`,
    xp: xpEach,
    hasQuiz: true,
  }));
}

/**
 * Seed enrollment state — mirrors the "My paths" screen (Penzi Mbuthia).
 * `learningPathService` clones this into its in-memory store on first use.
 */
export const MY_PATHS_SEED = [
  { pathId: "react-developer-path", modulesCompleted: 12, xpEarned: 2400 },
  { pathId: "javascript-fundamentals", modulesCompleted: 9, xpEarned: 1200 },
  { pathId: "nodejs-backend-path", modulesCompleted: 6, xpEarned: 980 },
];

// Note: "JavaScript fundamentals" (the enrolled path shown in the mock, 9/20
// modules) is a distinct in-progress variant of javascript-essentials with a
// longer module count — kept as its own catalog entry so IDs stay stable.
PATH_CATALOG.push({
  id: "javascript-fundamentals",
  title: "JavaScript fundamentals",
  description: "A deeper, 20-module pass through JavaScript for learners continuing past the essentials.",
  category: "Frontend",
  level: "Beginner",
  icon: "JS",
  xpReward: 2000,
  rating: 4.8,
  author: "Aisha K.",
  modules: buildModules("javascript-fundamentals", 20, 100),
});
