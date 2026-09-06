import { Zap, Flag, Shield, Users, Flame, Crown, Lock, Check, Brain, MessageCircle, Compass, Target, Calendar } from "lucide-react";

const ICONS = {
  zap: Zap,
  flag: Flag,
  shield: Shield,
  users: Users,
  flame: Flame,
  crown: Crown,
  lock: Lock,
  brain: Brain,
  message: MessageCircle,
  compass: Compass,
  target: Target,
  calendar: Calendar,
};

/**
 * BadgeCard
 * A single achievement. Renders a warm/filled state when earned and a
 * muted, locked state otherwise. Set `compact` for the smaller grid used
 * inside "Recent achievements" widgets.
 */
export default function BadgeCard({ title, description, icon, earned, compact = false }) {
  const Icon = ICONS[earned ? icon : "lock"] ?? ICONS.lock;

  if (compact) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${
            earned ? "bg-amber-100 text-amber-500" : "bg-neutral-100 text-neutral-300"
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-neutral-800">{title}</p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-black/5 bg-white p-6 text-center ${!earned && "opacity-80"}`}>
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
          earned ? "bg-amber-100 text-amber-500" : "bg-neutral-100 text-neutral-300"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-3 font-semibold text-neutral-900">{title}</p>
      <p className="mt-1 text-sm text-neutral-500">{description}</p>
      <p
        className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${
          earned ? "text-emerald-600" : "text-neutral-400"
        }`}
      >
        {earned ? (
          <>
            <Check className="h-3.5 w-3.5" /> Earned
          </>
        ) : (
          "Locked"
        )}
      </p>
    </div>
  );
}
