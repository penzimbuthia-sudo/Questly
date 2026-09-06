import { Sparkles, ArrowRight, Zap, Award, Flame, Crown } from "lucide-react";
import Button from "../ui/Button";
import { HERO_STATS } from "../../data/landingContent";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
      />

      <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full mb-5 bg-butter/14 text-butter font-bold">
              <Sparkles size={12} /> Learning, gamified
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] mb-4 text-ivory font-extrabold tracking-tight">
              Turn learning into a game you actually want to play
            </h1>

            <p className="text-base mb-7 max-w-md text-ivory/65">
              Questly brings scattered tutorials, videos, and courses into one community-curated
              platform — with points, badges, and leaderboards that keep you coming back.
            </p>

            <div className="mb-9">
              <Button variant="butter">
                Get started free <ArrowRight size={16} />
              </Button>
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-lg text-ivory font-extrabold">{s.value}</p>
                  <p className="text-xs text-ivory/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating preview card — abstract dashboard glimpse, not a screenshot */}
          <div className="relative hidden lg:block">
            <div className="rounded-3xl p-5 max-w-sm ml-auto bg-dark-purple border border-ivory/8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-ivory font-bold">React developer path</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-royal/20 text-[#C4B5FD] font-bold">
                  78%
                </span>
              </div>
              <div className="w-full h-2 rounded-full mb-5 bg-ivory/10">
                <div className="h-full rounded-full bg-butter" style={{ width: "78%" }} />
              </div>
              <div className="grid grid-cols-3 gap-2.5 mb-5">
                <div className="rounded-xl p-2.5 flex flex-col items-center bg-ivory/6">
                  <Zap size={16} className="text-butter mb-1.5" />
                  <span className="text-[10px] text-ivory/60">2,480 XP</span>
                </div>
                <div className="rounded-xl p-2.5 flex flex-col items-center bg-ivory/6">
                  <Award size={16} className="text-butter mb-1.5" />
                  <span className="text-[10px] text-ivory/60">6 badges</span>
                </div>
                <div className="rounded-xl p-2.5 flex flex-col items-center bg-ivory/6">
                  <Flame size={16} className="text-butter mb-1.5" />
                  <span className="text-[10px] text-ivory/60">12 days</span>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { n: "Aisha K.", you: false },
                  { n: "Brian O.", you: false },
                  { n: "Penzi M.", you: true },
                ].map((row, i) => (
                  <div
                    key={row.n}
                    className={`flex items-center gap-3 rounded-lg px-2.5 py-2 ${
                      row.you ? "bg-royal/14" : ""
                    }`}
                  >
                    <span className="w-5 text-xs text-butter font-extrabold">{i + 1}</span>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] bg-royal text-ivory font-bold">
                      {row.n.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="text-xs flex-1 text-ivory font-semibold">{row.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}