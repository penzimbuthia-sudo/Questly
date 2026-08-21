// feature/your-name/landing-page/HowItWorks.jsx
const LEARNER_STEPS = [
  { icon: "book", title: "Follow a path", desc: "Pick a path made of modules, resources, and quizzes." },
  { icon: "bolt", title: "Learn & earn XP", desc: "Complete modules and quizzes to earn XP and badges." },
  { icon: "trophy", title: "Climb the leaderboard", desc: "Keep your streak alive and track your rank." },
];

const CONTRIBUTOR_STEPS = [
  { icon: "share", title: "Share resources & paths", desc: "Publish videos, articles, and grouped learning paths." },
  { icon: "chat", title: "Engage with learners", desc: "Rate, comment, and join discussions on your work." },
  { icon: "chart", title: "Grow your reputation", desc: "Earn XP and badges for every contribution." },
];

const ICONS = {
  book: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z" />
    </svg>
  ),
  bolt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  ),
  trophy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z" />
      <path d="M5 6H3v2a4 4 0 0 0 4 4M19 6h2v2a4 4 0 0 1-4 4" />
    </svg>
  ),
  share: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <path d="M8.6 10.6l6.8-3.2M8.6 13.4l6.8 3.2" />
    </svg>
  ),
  chat: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a8 8 0 1 1-3.5-6.6L21 4l-1 4.5" />
    </svg>
  ),
  chart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20V10M12 20V4M20 20v-6" />
    </svg>
  ),
};

function StepCard({ step, color }) {
  const colorClasses = {
    violet: "bg-violet-100 text-violet-600",
    amber: "bg-amber-100 text-amber-600",
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        {ICONS[step.icon]}
      </div>
      <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
      <p className="text-gray-500 text-sm">{step.desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 bg-[#faf6ee]">
      <div className="max-w-6xl mx-auto">
        <span className="inline-block bg-amber-100 text-amber-700 text-sm font-medium px-4 py-1 rounded-full mb-4">
          How it works
        </span>
        <h2 className="text-3xl font-bold mb-3">A different path for every role</h2>
        <p className="text-gray-600 mb-12">Whether you're here to learn or to share what you know.</p>

        <p className="text-xs font-semibold tracking-wide uppercase text-violet-600 mb-4">For learners</p>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {LEARNER_STEPS.map((step) => (
            <StepCard key={step.title} step={step} color="violet" />
          ))}
        </div>

        <p className="text-xs font-semibold tracking-wide uppercase text-amber-600 mb-4">For contributors</p>
        <div className="grid md:grid-cols-3 gap-6">
          {CONTRIBUTOR_STEPS.map((step) => (
            <StepCard key={step.title} step={step} color="amber" />
          ))}
        </div>
      </div>
    </section>
  );
}