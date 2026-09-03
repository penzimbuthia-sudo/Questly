import { useState } from "react";
import { Target } from "lucide-react";
import WeeklyChallengeCard from "../../components/learner/WeeklyChallengeCard";

const FEATURED = {
  eyebrow: "Data science month",
  title: "The 5-day builder",
  description: "Complete 5 modules this week",
  current: 3,
  total: 5,
  daysLeft: 18,
  xpReward: 500,
};

const MORE_CHALLENGES = [
  { id: "resource-rally", title: "Resource rally", description: "Share 3 new resources with the community", xp: 300, daysLeft: 4 },
  { id: "perfect-week", title: "Perfect week", description: "Score 90%+ on every quiz you take this week", xp: 400, daysLeft: 4 },
  { id: "consistency-streak", title: "Consistency streak", description: "Log in and complete a module 5 days in a row", xp: 250, daysLeft: 2 },
  { id: "quiz-sprint", title: "Quiz sprint", description: "Complete 5 module quizzes before the weekend", xp: 350, daysLeft: 6 },
  { id: "community-helper", title: "Community helper", description: "Answer 3 learner questions in a discussion", xp: 275, daysLeft: 8 },
  { id: "path-explorer", title: "Path explorer", description: "Complete a module in 3 different learning paths", xp: 450, daysLeft: 12 },
  { id: "early-riser", title: "Early riser", description: "Finish a learning session before 9 AM three times", xp: 200, daysLeft: 5 },
];

export default function Challenges() {
  const [joined, setJoined] = useState(new Set());

  const toggleJoin = (id) =>
    setJoined((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Challenges</h1>
        <p className="mt-1 text-sm text-neutral-500">Weekly and seasonal quests that reward bonus XP and badges.</p>
      </div>

      <WeeklyChallengeCard {...FEATURED} joined={joined.has("featured")} onAction={() => toggleJoin("featured")} />

      <section>
        <h2 className="text-base font-semibold text-neutral-900">More challenges</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {MORE_CHALLENGES.map((challenge) => (
            <div key={challenge.id} className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Target className="h-5 w-5" />
              </div>
              <p className="mt-4 font-semibold text-neutral-900">{challenge.title}</p>
              <p className="mt-1 text-sm text-neutral-500">{challenge.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-amber-600">+{challenge.xp} XP</span>
                <span className="text-sm text-neutral-400">{challenge.daysLeft} days left</span>
              </div>
              <button
                type="button"
                onClick={() => toggleJoin(challenge.id)}
                className={`mt-3 w-full rounded-lg px-4 py-2 text-sm font-semibold ${
                  joined.has(challenge.id) ? "border border-neutral-200 text-neutral-600" : "bg-purple-600 text-white"
                }`}
              >
                {joined.has(challenge.id) ? "Joined" : "Join challenge"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
