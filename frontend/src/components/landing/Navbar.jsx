import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import { NAV_LINKS } from "../../data/landingContent";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="theme-contributor sticky top-0 z-50 bg-ink">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between py-3.5">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={`#${link.id}`}
              className="text-sm text-ivory/70 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">
              Sign up free
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-dark-purple"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={18} className="text-ivory" /> : <Menu size={18} className="text-ivory" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ivory/8 bg-ink">
          <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={`#${link.id}`}
                className="text-sm py-2.5 text-ivory/75 font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-ivory/8">
              <Link to="/login" className="w-full" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link to="/register" className="w-full" onClick={() => setOpen(false)}>
                <Button variant="primary" className="w-full">
                  Sign up free <ArrowRight size={15} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
