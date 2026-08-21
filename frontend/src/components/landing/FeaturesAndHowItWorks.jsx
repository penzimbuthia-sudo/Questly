import Card from "../ui/Card";
import { FEATURES, LEARNER_STEPS, CONTRIBUTOR_STEPS } from "../../data/landingContent";

function MiniCard({ icon: Icon, title, desc, tone = "info" }) {
  const chip =
    tone === "info"
      ? "bg-tone-info-bg text-tone-info-fg"
      : "bg-tone-warning-bg text-tone-warning-fg";

  return (
    <Card className="p-4">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${chip}`}>
        <Icon size={14} strokeWidth={2.25} />
      </div>
      <p className="text-sm mb-1 text-fg font-bold">{title}</p>
      <p className="text-xs leading-relaxed text-fg/65">{desc}</p>
    </Card>
  );
}

export default function FeaturesAndHowItWorks() {
  return (
    <section id="features-how" className="bg-page">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
          {/* Features column */}
          <div className="min-w-0 lg:pr-10">
            <span className="text-xs px-3 py-1.5 rounded-full inline-block mb-4 bg-tone-info-bg text-tone-info-fg font-bold">
              Features
            </span>
            <h2 className="text-2xl sm:text-3xl mb-3 text-fg font-extrabold tracking-tight">
              Everything you need to build a habit
            </h2>
            <p className="text-sm mb-8 text-fg/70">
              Resource curation, paired with the game mechanics that make learning stick.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <MiniCard key={f.title} {...f} tone="info" />
              ))}
            </div>
          </div>

          {/* How it works column */}
          <div className="min-w-0 lg:pl-10 lg:border-l border-line/10">
            <span className="text-xs px-3 py-1.5 rounded-full inline-block mb-4 bg-tone-warning-bg text-tone-warning-fg font-bold">
              How it works
            </span>
            <h2 className="text-2xl sm:text-3xl mb-3 text-fg font-extrabold tracking-tight">
              A different path for every role
            </h2>
            <p className="text-sm mb-8 text-fg/70">
              Whether you're here to learn or to share what you know.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-xs mb-3 uppercase tracking-wide text-tone-info-fg font-bold">
                  For learners
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LEARNER_STEPS.map((s) => (
                    <MiniCard key={s.title} {...s} tone="info" />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs mb-3 uppercase tracking-wide text-tone-warning-fg font-bold">
                  For contributors
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CONTRIBUTOR_STEPS.map((s) => (
                    <MiniCard key={s.title} {...s} tone="warning" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}