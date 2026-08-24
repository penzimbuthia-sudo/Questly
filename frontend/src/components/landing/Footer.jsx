// feature/your-name/landing-page/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 py-16 bg-slate-950 text-gray-300">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7z" />
              </svg>
            </div>
            <span className="text-white font-semibold">Questly</span>
          </div>
          <p className="text-sm text-gray-400 mb-5 max-w-xs">
            A crowdsourced learning platform with gamification, built for tech professionals who want to keep leveling up.
          </p>
          <div className="flex gap-3">
            {["twitter", "github", "linkedin", "instagram"].map((s) => (
              <div key={s} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                {s[0].toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition">How it works</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Community</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link to="/discussions" className="hover:text-white transition">Discussions</Link></li>
            <li><Link to="/leaderboard" className="hover:text-white transition">Leaderboard</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between mt-12 pt-6 border-t border-slate-800 text-sm text-gray-500">
        <p>© 2026 Questly. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition">Terms</Link>
        </div>
      </div>
    </footer>
  );
}