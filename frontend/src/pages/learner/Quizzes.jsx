import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, HelpCircle } from "lucide-react";
import QuizQuestion from "../../components/learner/QuizQuestion";
import { getMyPaths, getPathById } from "../../services/learningPathService";
import { getQuizForModule, gradeAnswer, submitQuiz } from "../../services/quizService";

export default function Quizzes() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePathId, setActivePathId] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [quizState, setQuizState] = useState(null);
  const [quizError, setQuizError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getMyPaths()
      .then(async (mine) => {
        const list = Array.isArray(mine) ? mine : [];
        const withModules = await Promise.all(
          list.map(async (entry) => {
            const pathId = entry.path?.id;
            if (!pathId) return null;
            try {
              const full = await getPathById(pathId);
              return {
                pathId,
                pathTitle: full?.title ?? entry.path?.title,
                modules: Array.isArray(full?.modules) ? full.modules : [],
              };
            } catch {
              return null;
            }
          })
        );
        if (!cancelled) {
          setGroups(withModules.filter(Boolean).filter((g) => g.modules.length > 0));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setGroups([]);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const beginQuiz = async (pathId, pathTitle, module) => {
    try {
      setQuizError(null);
      const quiz = await getQuizForModule(pathId, module.id, { pathTitle, moduleTitle: module.title });
      setActivePathId(pathId);
      setActiveModule(module);
      setQuizState({ quiz, index: 0, answers: {}, selected: null, isAnswered: false, feedback: null, result: null });
    } catch (error) {
      setQuizError(error.message || "Unable to load this quiz.");
    }
  };

  const selectOption = (optionId) => {
    setQuizState((prev) => ({ ...prev, selected: optionId }));
  };

  const submitAnswer = () => {
    setQuizState((prev) => {
      const question = prev.quiz.questions[prev.index];
      const feedback = gradeAnswer(question, prev.selected);
      return {
        ...prev,
        isAnswered: true,
        feedback,
        answers: { ...prev.answers, [question.id]: prev.selected },
      };
    });
  };

  const nextQuestion = async () => {
    const isLast = quizState.index === quizState.quiz.questions.length - 1;
    if (!isLast) {
      setQuizState((prev) => ({ ...prev, index: prev.index + 1, selected: null, isAnswered: false, feedback: null }));
      return;
    }
    const question = quizState.quiz.questions[quizState.index];
    const answers = { ...quizState.answers, [question.id]: quizState.selected };
    try {
      const result = await submitQuiz(activePathId, activeModule.id, answers, quizState.quiz.questions);
      setQuizState((prev) => ({ ...prev, answers, result }));
    } catch (error) {
      setQuizError(error.message || "Unable to submit this quiz.");
    }
  };

  const closeQuiz = () => {
    setActivePathId(null);
    setActiveModule(null);
    setQuizState(null);
    setQuizError(null);
  };

  if (activeModule && quizState) {
    const { quiz, index, selected, isAnswered, feedback, result } = quizState;

    if (result) {
      return (
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-line/10 bg-card p-8 text-center">
          <CheckCircle2 className={`h-12 w-12 ${result.passed ? "text-emerald-500" : "text-fg/30"}`} />
          <h2 className="text-lg font-bold text-fg">
            {result.passed ? "Quiz passed!" : "Not quite there yet"}
          </h2>
          <p className="text-sm text-fg/60">
            {result.correctCount} / {result.totalQuestions} correct
          </p>
          {result.passed && result.xpAwarded > 0 && (
            <p className="rounded-full bg-tone-warning-bg px-3 py-1 text-sm font-semibold text-tone-warning-fg">
              +{result.xpAwarded} XP awarded
            </p>
          )}
          {result.passed && result.badgesAwarded?.length > 0 && (
            <p className="rounded-full bg-royal/10 px-3 py-1 text-sm font-semibold text-royal">
              Badge unlocked: {result.badgesAwarded.join(", ")}
            </p>
          )}
          <button type="button" onClick={closeQuiz} className="mt-2 rounded-lg bg-ink px-5 py-2 text-sm font-semibold text-ivory">
            Back to quizzes
          </button>
        </div>
      );
    }

    return (
      <div className="mx-auto flex max-w-xl flex-col gap-4">
        <button type="button" onClick={closeQuiz} className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-fg/60 hover:text-fg">
          <ArrowLeft className="h-4 w-4" /> Exit quiz
        </button>
        {quizError && <p className="text-sm text-danger">{quizError}</p>}
        <p className="text-sm text-fg/60">Quiz · {activeModule.title}</p>
        <QuizQuestion
          question={quiz.questions[index]}
          questionNumber={index + 1}
          totalQuestions={quiz.questions.length}
          selectedOptionId={selected}
          onSelect={selectOption}
          isAnswered={isAnswered}
          feedback={feedback}
          onSubmit={submitAnswer}
          onNext={nextQuestion}
          isLastQuestion={index === quiz.questions.length - 1}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-fg">Quizzes</h1>
        <p className="mt-1 text-sm text-fg/60">Test yourself on modules from the paths you're following.</p>
      </div>

      {quizError && <p className="text-sm text-danger">{quizError}</p>}

      {loading ? (
        <p className="text-sm text-fg/40">Loading quizzes…</p>
      ) : groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line/20 bg-card p-10 text-center">
          <HelpCircle className="mx-auto h-8 w-8 text-fg/30" />
          <p className="mt-2 font-medium text-fg">No quizzes yet</p>
          <p className="mt-1 text-sm text-fg/60">Follow a learning path to unlock quizzes for its modules.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <div key={group.pathId} className="rounded-2xl border border-line/10 bg-card p-5">
              <h2 className="text-base font-semibold text-fg">{group.pathTitle}</h2>
              <div className="mt-3 flex flex-col gap-2">
                {group.modules.map((module) => (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => beginQuiz(group.pathId, group.pathTitle, module)}
                    className="flex items-center justify-between rounded-xl border border-line/10 px-4 py-3 text-left text-sm font-medium text-fg hover:border-royal/30 hover:bg-royal/5"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-royal" /> {module.title}
                    </span>
                    <span className="text-xs font-semibold text-royal">Start quiz</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
