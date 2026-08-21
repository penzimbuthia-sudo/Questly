// feature/your-name/landing-page/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-slate-950/70 backdrop-blur-xl border-b border-slate-800 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Questly
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-slate-300 font-medium">
          <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
          <li><Link to="/how-it-works" className="hover:text-white transition">How it works</Link></li>
          <li><Link to="/community" className="hover:text-white transition">Community</Link></li>
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className="text-slate-300 hover:text-white transition font-medium"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold transition"
          >
            Sign up free
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300 hover:text-white transition"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <span className="text-2xl">&times;</span>
          ) : (
            <span className="text-2xl">&#9776;</span>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4">
          <ul className="flex flex-col gap-4 text-slate-300 font-medium">
            <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition">How it works</Link></li>
            <li><Link to="/community" className="hover:text-white transition">Community</Link></li>
            <li><Link to="/login" className="hover:text-white transition">Log in</Link></li>
            <li>
              <Link
                to="/signup"
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold transition inline-block"
              >
                Sign up free
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}