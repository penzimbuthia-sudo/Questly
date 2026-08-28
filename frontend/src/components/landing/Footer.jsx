import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import Logo from "../ui/Logo";

const COLUMNS = [
  { title: "Product", links: ["Features", "How it works"] },
  { title: "Community", links: ["Discussions", "Leaderboard"] },
];

const SOCIALS = [FaTwitter, FaGithub, FaLinkedin, FaInstagram];

export default function Footer() {
  return (
    <footer className="theme-contributor bg-ink">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 sm:col-span-2">
            <div className="mb-3">
              <Logo size="sm" />
            </div>
            <p className="text-xs leading-relaxed mb-4 max-w-xs text-ivory/50">
              A crowdsourced learning platform with gamification, built for tech professionals
              who want to keep leveling up.
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-dark-purple"
                >
                  <Icon size={13} className="text-ivory/70" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="text-xs mb-3 text-ivory font-bold">{c.title}</p>
              <div className="space-y-2">
                {c.links.map((l) => (
                  <a key={l} href="#" className="block text-xs text-ivory/50">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-5 border-t border-ivory/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ivory/40">&copy; 2026 Questly. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-ivory/40">Privacy</a>
            <a href="#" className="text-xs text-ivory/40">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
