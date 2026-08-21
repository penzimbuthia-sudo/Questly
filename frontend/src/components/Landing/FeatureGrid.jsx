// feature/your-name/landing-page/FeatureGrid.jsx
const ICONS = {
  path: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" />
      <path d="M8 6h4a4 4 0 0 1 4 4v4" />
    </svg>
  ),
  bolt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  ),
  award: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="6" /><path d="M9 13l-2 8 5-3 5 3-2-8" />
    </svg>
  ),
  trophy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z" />
      <path d="M5 6H3v2a4 4 0 0 0 4 4M19 6h2v2a4 4 0 0 1-4 4" />
    </svg>
  ),
  chat: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a8 8 0 1 1-3.5-6.6L21 4l-1 4.5" />
    </svg>
  ),
  event: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
};

const FEATURES = [
  { icon: "path", color: "violet", title: "Structured learning paths", desc: "Modules, resources, and end-of-module quizzes, curated by the community." },
  { icon: "bolt", color: "amber", title: "Points & XP", desc: "Earn XP for completing modules, sharing resources, and passing quizzes." },
  { icon: "award", color: "violet", title: "Achievements & badges", desc: "Unlock badges for streaks, quiz mastery, and contributions." },
  { icon: "trophy", color: "violet", title: "Leaderboards", desc: "See where you rank — weekly, monthly, or all-time." },
  { icon: "chat", color: "violet", title: "Rate, comment, discuss", desc: "Every resource is rated and discussed, so the best rises to the top." },
  { icon: "event", color: "amber", title: "Challenges & seasonal events", desc: "Weekly quests and limited-time events for bonus XP and badges." },
];

const colorClasses = {
  violet: "bg-violet-100 text-violet-600",
  amber: "bg-amber-100 text-amber-600",
};

export default function FeatureGrid() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 bg-[#faf6ee]">
      <div className="max-w-6xl mx-auto">
        <span className="inline-block bg-violet-100 text-violet-700 text-sm font-medium px-4 py-1 rounded-full mb-4">
          Features
        </span>
        <h2 className="text-3xl font-bold mb-3">Everything you need to build a habit</h2>
        <p className="text-gray-600 mb-12">Resource curation, paired with the game mechanics that make learning stick.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white p-6 rounded-2xl border border-gray-100"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colorClasses[f.color]}`}>
                {ICONS[f.icon]}
              </div>
              <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}