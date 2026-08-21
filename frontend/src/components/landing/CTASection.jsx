// feature/your-name/landing-page/CTASection.jsx
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-24 bg-violet-600 text-white overflow-hidden">

      {/* Decorative glow */}
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-400 opacity-40 rounded-full pointer-events-none"></div>

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start your first quest today
        </h2>

        <p className="text-violet-100 mb-10 max-w-xl mx-auto">
          Join learners and contributors already earning XP, unlocking badges,
          and building real skills together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-lg font-semibold transition-colors"
          >
            Create free account
            <span>&rarr;</span>
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 border border-white/40 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
}