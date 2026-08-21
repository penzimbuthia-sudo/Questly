// feature/your-name/landing-page/Hero.jsx
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-slate-950 pt-32 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-900/30 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7z" />
          </svg>
          Learning, gamified
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Turn learning into a game you actually want to play
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
          Questly brings scattered tutorials, videos, and courses into one
          community-curated platform — with points, badges, and leaderboards
          that keep you coming back.
        </p>

        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-lg font-semibold transition-colors"
        >
          Get started free
          <span>&rarr;</span>
        </Link>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12 mt-16">
          <div>
            <p className="text-2xl font-bold text-white">50k+</p>
            <p className="text-slate-500 text-sm">Active learners</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">12k+</p>
            <p className="text-slate-500 text-sm">Shared resources</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">1,200+</p>
            <p className="text-slate-500 text-sm">Learning paths</p>
          </div>
        </div>
      </div>
    </section>
  );
}