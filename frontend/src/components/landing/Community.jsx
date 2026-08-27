import { Star } from "lucide-react";
import Card from "../ui/Card";
import { TESTIMONIALS } from "../../data/landingContent";

export default function Community() {
  return (
    <section id="community" className="bg-page py-14 sm:py-15 border-t border-line/10">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="max-w-xl mb-10">
          <span className="text-xs px-3 py-1.5 rounded-full inline-block mb-4 bg-tone-info-bg text-tone-info-fg font-bold">
            Community
          </span>
          <h2 className="text-2xl sm:text-3xl mb-3 text-fg font-extrabold tracking-tight">
            Learners and contributors, building it together
          </h2>
          <p className="text-sm text-fg/70">
            Every path and resource on Questly is shared, rated, and discussed by real people in
            the community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="p-5">
              <div className="flex gap-0.5 mb-3 text-butter">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm mb-4 leading-relaxed text-fg/85">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 bg-royal text-ivory font-bold">
                  {t.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs truncate text-fg font-bold">{t.name}</p>
                  <p className="text-[11px] truncate text-fg/50">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}