// feature/your-name/landing-page/RolesShowcase.jsx
const TESTIMONIALS = [
  { quote: "The badges and streaks genuinely got me to finish paths I'd normally abandon halfway through.", name: "Aisha K.", role: "Frontend contributor", initials: "AI" },
  { quote: "Ratings and comments on every resource meant I stopped wasting time on outdated tutorials.", name: "Brian O.", role: "Backend learner", initials: "BR" },
  { quote: "Weekly challenges turned solo studying into something that actually feels social.", name: "Chinedu M.", role: "Data science learner", initials: "CH" },
];

export default function RolesShowcase() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 bg-[#faf6ee]">
      <div className="max-w-4xl mx-auto">
        <span className="inline-block bg-violet-100 text-violet-700 text-sm font-medium px-4 py-1 rounded-full mb-4">
          Community
        </span>
        <h2 className="text-3xl font-bold mb-3">Learners and contributors, building it together</h2>
        <p className="text-gray-600 mb-12">
          Every path and resource on Questly is shared, rated, and discussed by real people in the community.
        </p>

        <div className="flex flex-col gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="flex text-amber-400 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21 7.5 13.5 2 9h7z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}