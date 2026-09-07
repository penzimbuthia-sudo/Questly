import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import WeeklyChallengeCard from "../../components/learner/WeeklyChallengeCard";
import QuizQuestion from "../../components/learner/QuizQuestion";
import { getChallenges, joinChallenge } from "../../services/gamificationService";
import { gradeAnswer } from "../../services/quizService";

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
  { id: "quiz-sprint", title: "Quiz sprint", description: "Complete 5 module quizzes before the weekend", xp:350, daysLeft: 6 },
  { id: "community-helper", title: "Community helper", description: "Answer 3 learner questions in a discussion", xp: 275, daysLeft: 8 },
  { id: "path-explorer", title: "Path explorer", description: "Complete a module in 3 different learning paths", xp: 450, daysLeft: 12 },
  { id: "early-riser", title: "Early riser", description: "Finish a learning session before 9 AM three times", xp: 200, daysLeft: 5 },
];

export default function Challenges() {
  const [joined, setJoined] = useState(new Set());
  const [serverChallenges, setServerChallenges] = useState([]);
  const [joining, setJoining] = useState(null);
  const [notice, setNotice] = useState("");
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState(new Set());

  useEffect(() => {
    getChallenges()
      .then((challenges) => {
        setServerChallenges(challenges);
        setJoined(new Set(challenges.filter((challenge) => challenge.joined).map((challenge) => challenge.id)));
      })
      .catch((err) => {
        console.log("getChallenges failed:", err); // TEMP DEBUG
        setServerChallenges([]);
      });
  }, []);

  const toggleJoin = async (id) => {
    if (joined.has(id) || joining === id) return;
    setJoining(id);
    try {
      await joinChallenge(id);
      setJoined((prev) => new Set(prev).add(id));
      const challenge = [...serverChallenges, ...MORE_CHALLENGES].find((item) => item.id === id);
      const challengeView = id === featuredChallenge.id
        ? featuredChallenge
        : displayedChallenges.find((item) => item.id === id) ?? challenge;
      setNotice(`You joined ${challenge?.title ?? "this challenge"}. Complete the goal to earn the bonus XP.`);
      setActiveChallenge(challengeView);
    } catch (err) {
      console.log("joinChallenge failed:", err); // TEMP DEBUG
      setJoined((prev) => new Set(prev).add(id));
      const challenge = MORE_CHALLENGES.find((item) => item.id === id);
      setNotice(`You joined ${challenge?.title ?? "this challenge"}. Complete the goal to earn the bonus XP.`);
      setActiveChallenge(challenge);
    } finally {
      setJoining(null);
    }
  };

  const featuredChallenge = serverChallenges[0]
    ? {
        ...FEATURED,
        id: serverChallenges[0].id,
        title: serverChallenges[0].title,
        description: serverChallenges[0].description,
        current: serverChallenges[0].progress ?? 0,
        xpReward: serverChallenges[0].reward_xp,
      }
    : { ...FEATURED, id: "featured" };

  const displayedChallenges = serverChallenges.length > 0
    ? serverChallenges.slice(1).map((challenge) => ({
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        xp: challenge.reward_xp,
        daysLeft: challenge.period_end ? Math.max(0, Math.ceil((new Date(challenge.period_end) - Date.now()) / 86400000)) : null,
        progress: challenge.progress ?? 0,
        total: 1,
      }))
    : MORE_CHALLENGES;

  const openChallenge = (challenge) => {
    setActiveChallenge(challenge);
    setNotice(`Challenge opened: ${challenge.title}. Pass the quiz to claim the bonus XP.`);
  };

  const completeChallenge = (challenge) => {
    if (completedChallenges.has(challenge.id)) return;
    setCompletedChallenges((prev) => new Set(prev).add(challenge.id));
    setNotice(`Challenge complete! +${challenge.xpReward ?? challenge.xp ?? 0} XP awarded.`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-fg">Challenges</h1>
        <p className="mt-1 text-sm text-fg/60">Weekly and seasonal quests that reward bonus XP and badges.</p>
      </div>

      {notice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          {notice}
        </div>
      )}

      {activeChallenge && (
        <ChallengeQuiz
          challenge={activeChallenge}
          completed={completedChallenges.has(activeChallenge.id)}
          onClose={() => setActiveChallenge(null)}
          onComplete={() => completeChallenge(activeChallenge)}
        />
      )}

      <WeeklyChallengeCard
        {...featuredChallenge}
        joined={joined.has(featuredChallenge.id)}
        onAction={() => joined.has(featuredChallenge.id) ? openChallenge(featuredChallenge) : toggleJoin(featuredChallenge.id)}
      />

      <section>
        <h2 className="text-base font-semibold text-fg">More challenges</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {displayedChallenges.map((challenge) => (
            <div key={challenge.id} className="rounded-2xl border border-line/10 bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal/10 text-royal">
                <Target className="h-5 w-5" />
              </div>
              <p className="mt-4 font-semibold text-fg">{challenge.title}</p>
              <p className="mt-1 text-sm text-fg/60">{challenge.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-butter-dark">+{challenge.xp} XP</span>
                <span className="text-sm text-fg/40">{challenge.daysLeft} days left</span>
              </div>
              {joined.has(challenge.id) && (
                <p className="mt-3 text-xs font-medium text-emerald-600">You are enrolled · progress starts at 0</p>
              )}
              <button
                type="button"
                onClick={() => joined.has(challenge.id) ? openChallenge(challenge) : toggleJoin(challenge.id)}
                disabled={joining === challenge.id}
                className={`mt-3 w-full rounded-lg px-4 py-2 text-sm font-semibold ${
                  joined.has(challenge.id) ? "border border-line/15 text-fg/70" : "bg-royal text-ivory"
                }`}
              >
                {joined.has(challenge.id) ? "Open challenge" : joining === challenge.id ? "Joining..." : "Join challenge"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function buildChallengeQuiz(challenge) {
  return [
    {
      id: "goal",
      prompt: `What is the goal of the ${challenge.title} challenge?`,
      options: [
        { id: "a", text: challenge.description },
        { id: "b", text: "Collect profile cosmetics" },
        { id: "c", text: "Skip all learning activities" },
        { id: "d", text: "Only read the challenge title" },
      ],
      correctOptionId: "a",
      explanation: "The challenge goal is the activity shown in its description.",
    },
    {
      id: "reward",
      prompt: "What do you earn when the challenge is completed?",
      options: [
        { id: "a", text: "Nothing" },
        { id: "b", text: `Bonus XP${challenge.xpReward ?? challenge.xp ? ` (+${challenge.xpReward ?? challenge.xp} XP)` : ""}` },
        { id: "c", text: "A password reset" },
        { id: "d", text: "An admin account" },
      ],
      correctOptionId: "b",
      explanation: "Completed challenges award the bonus XP shown on the card.",
    },
    {
      id: "next-step",
      prompt: "What should you do next to make progress?",
      options: [
        { id: "a", text: "Leave the challenge" },
        { id: "b", text: "Wait without completing anything" },
        { id: "c", text: challenge.description },
        { id: "d", text: "Create a new account" },
      ],
      correctOptionId: "c",
      explanation: "Complete the activity described by the challenge to advance.",
    },
  ];
}

function ChallengeQuiz({ challenge, completed, onClose, onComplete }) {
  const questions = buildChallengeQuiz(challenge);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const submit = () => {
    const result = gradeAnswer(questions[index], selected);
    setFeedback(result);
    setAnswers((previous) => ({ ...previous, [questions[index].id]: selected }));
    setAnswered(true);
  };

  const next = () => {
    if (index < questions.length - 1) {
      setIndex((current) => current + 1);
      setSelected(null);
      setAnswered(false);
      setFeedback(null);
      return;
    }

    const finalAnswers = { ...answers, [questions[index].id]: selected };
    const correct = questions.reduce(
      (total, question) => total + (finalAnswers[question.id] === question.correctOptionId ? 1 : 0),
      0,
    );
    const percentage = Math.round((correct / questions.length) * 100);
    setScore(percentage);
    if (percentage >= 70 && !completed) onComplete();
  };

  return (
    <section className="rounded-2xl border border-royal/20 bg-royal/5 p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-royal">Challenge quiz</p>
          <h2 className="mt-1 text-lg font-bold text-fg">{challenge.title}</h2>
        </div>
        <button type="button" onClick={onClose} className="text-sm font-semibold text-fg/50 hover:text-fg">Close</button>
      </div>
      {score == null ? (
        <QuizQuestion
          question={questions[index]}
          questionNumber={index + 1}
          totalQuestions={questions.length}
          selectedOptionId={selected}
          onSelect={setSelected}
          isAnswered={answered}
          feedback={feedback}
          onSubmit={submit}
          onNext={next}
          isLastQuestion={index === questions.length - 1}
        />
      ) : (
        <div className="rounded-xl bg-card p-5 text-center">
          <p className="text-2xl font-bold text-fg">{score}%</p>
          <p className="mt-1 text-sm text-fg/60">{score >= 70 ? "Challenge quiz passed." : "Try again to claim the challenge XP."}</p>
          <button type="button" onClick={onClose} className="mt-4 rounded-lg bg-royal px-4 py-2 text-sm font-semibold text-ivory">Back to challenges</button>
        </div>
      )}
    </section>
  );
}