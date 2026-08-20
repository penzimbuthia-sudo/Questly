// feature/your-name/landing-page/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "./assets/avatar.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-slate-950/70 backdrop-blur-xl border-b border-slate-800 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
         
          <span className="text-xl font-bold tracking-tight text-white">
            Questly
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-slate-300 font-medium">
          <li><Link to="/" className="hover:text-white transition">Home</Link></li>
          <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
          <li><Link to="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
          <li><Link to="/roles" className="hover:text-white transition">Roles</Link></li>
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className="text-slate-300 hover:text-white transition font-medium"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
          >
            Get Started
          </Link>

          <img 
            src={avatar} 
            alt="Contributor Avatar" 
            className="h-10 w-10 rounded-full border border-slate-700"
          />
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
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
            <li><Link to="/roles" className="hover:text-white transition">Roles</Link></li>
            <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
            <li>
              <Link
                to="/signup"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition inline-block"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
