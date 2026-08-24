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

// Features Section with light background
function FeaturesSection() {
  return (
    <section id="features" className="py-14 sm:py-20">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs px-3 py-1.5 rounded-full inline-block mb-4 bg-tone-info-bg text-tone-info-fg font-bold">
            Features
          </span>
          <h2 className="text-2xl sm:text-3xl mb-3 text-fg font-extrabold tracking-tight">
            Everything you need to build a habit
          </h2>
          <p className="text-sm text-fg/70 max-w-2xl mx-auto">
            Resource curation, paired with the game mechanics that make learning stick.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <MiniCard key={f.title} {...f} tone="info" />
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section with subtle background - CENTERED
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-page/50 py-14 sm:py-20 border-t border-line/10">
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs px-3 py-1.5 rounded-full inline-block mb-4 bg-tone-warning-bg text-tone-warning-fg font-bold">
            How it works
          </span>
          <h2 className="text-2xl sm:text-3xl mb-3 text-fg font-extrabold tracking-tight">
            A different path for every role
          </h2>
          <p className="text-sm text-fg/70 max-w-2xl mx-auto">
            Whether you're here to learn or to share what you know.
          </p>
        </div>

        <div className="space-y-12">
          {/* Learners */}
          <div>
            <p className="text-xs mb-4 uppercase tracking-wide text-tone-info-fg font-bold text-center">
              For learners
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {LEARNER_STEPS.map((s) => (
                <MiniCard key={s.title} {...s} tone="info" />
              ))}
            </div>
          </div>

          {/* Contributors */}
          <div>
            <p className="text-xs mb-4 uppercase tracking-wide text-tone-warning-fg font-bold text-center">
              For contributors
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {CONTRIBUTOR_STEPS.map((s) => (
                <MiniCard key={s.title} {...s} tone="warning" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main component combining both sections
export default function FeaturesAndHowItWorks() {
  return (
    <>
      <FeaturesSection />
      <HowItWorksSection />
    </>
  );
}