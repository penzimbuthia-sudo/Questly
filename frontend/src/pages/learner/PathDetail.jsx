import { startTransition, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, PlayCircle, Sparkles } from "lucide-react";
import QuizQuestion from "../../components/learner/QuizQuestion";
import { getPathById, getPathProgress, startPath } from "../../services/learningPathService";
import { getQuizForModule, gradeAnswer, submitQuiz } from "../../services/quizService";

export default function PathDetail() {
  const { pathId } = useParams();
  const navigate = useNavigate();

  const [path, setPath] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [quizState, setQuizState] = useState(null);
  const [quizError, setQuizError] = useState(null);

  const refresh = async () => {
    const [pathData, progressData] = await Promise.all([getPathById(pathId), startPath(pathId).then(() => getPathProgress(pathId))]);
    setPath(pathData);
    setProgress(progressData);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    startTransition(() => {
      setActiveModule(null);
      setQuizState(null);
      setQuizError(null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathId]);

  const beginQuiz = async (module) => {
    try {
      setQuizError(null);
      const quiz = await getQuizForModule(pathId, module.id, { pathTitle: path.title, moduleTitle: module.title });
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
      const result = await submitQuiz(pathId, activeModule.id, answers, quizState.quiz.questions);
      setQuizState((prev) => ({ ...prev, answers, result }));
      if (result.passed) {
        const [updatedPath, updatedProgress] = await Promise.all([getPathById(pathId), getPathProgress(pathId)]);
        setPath(updatedPath);
        setProgress(updatedProgress);
      }
    } catch (error) {
      setQuizError(error.message || "Unable to submit this quiz.");
    }
  };

  const closeQuiz = () => {
    setActiveModule(null);
    setQuizState(null);
  };

  if (!path || !progress) return <p className="text-sm text-fg/40">Loading path…</p>;

  if (activeModule && quizState) {
    return (
      <QuizFlow
        moduleTitle={activeModule.title}
        quizState={quizState}
        onSelect={selectOption}
        onSubmit={submitAnswer}
        onNext={nextQuestion}
        onClose={closeQuiz}
        error={quizError}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <button type="button" onClick={() => navigate("..")} className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-fg/60 hover:text-fg">
        <ArrowLeft className="h-4 w-4" /> Back to paths
      </button>

      <div className="rounded-2xl border border-line/10 bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-royal/10 text-2xl">{path.icon}</div>
          <div className="flex-1">
            <span className="inline-block rounded-full bg-tone-success-bg px-2.5 py-0.5 text-xs font-semibold text-tone-success-fg">{path.level}</span>
            <h1 className="mt-2 text-xl font-bold text-fg">{path.title}</h1>
            <p className="mt-1 text-sm text-fg/60">{path.description}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-active">
            <div className="h-full rounded-full bg-butter" style={{ width: `${progress.percent}%` }} />
          </div>
          <span className="text-sm font-semibold text-fg/80">{progress.percent}%</span>
        </div>
        <p className="mt-1 text-xs text-fg/40">
          {progress.modulesCompleted}/{progress.totalModules} modules · {progress.xpEarned?.toLocaleString?.() ?? 0} XP earned
        </p>
      </div>

      {quizError && <p className="text-sm text-danger">{quizError}</p>}

      <div className="rounded-2xl border border-line/10 bg-card p-6">
        <h2 className="text-base font-semibold text-fg">Modules</h2>
        <div className="mt-4 flex flex-col divide-y divide-line/10">
          {path.modules.map((module, i) => {
            const done = module.completed;
            return (
              <div key={module.id} className="flex items-center gap-4 py-3">
                {done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-tone-success-fg" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-fg/30" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-medium ${done ? "text-fg/50 line-through" : "text-fg"}`}>
                    {i + 1}. {module.title}
                  </p>
                  <p className="text-xs text-butter-dark">{module.xp_value} XP</p>
                </div>
                <button
                  type="button"
                  onClick={() => beginQuiz(module)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium ${
                    done ? "border border-line/15 text-fg/60 hover:border-royal/40" : "bg-royal text-ivory"
                  }`}
                >
                  {done ? <Sparkles className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                  {done ? "Retake quiz" : "Start quiz"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function QuizFlow({ moduleTitle, quizState, onSelect, onSubmit, onNext, onClose, error }) {
  const { quiz, index, isAnswered, feedback, selected, result } = quizState;

  if (result) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-line/10 bg-card p-10 text-center">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full ${result.passed ? "bg-tone-success-bg text-tone-success-fg" : "bg-tone-danger-bg text-tone-danger-fg"}`}>
          <span className="text-2xl font-bold">{result.score}%</span>
        </div>
        <h2 className="text-lg font-semibold text-fg">
          {result.passed ? "Quiz passed!" : "Not quite there yet"}
        </h2>
        <p className="text-sm text-fg/60">
          {result.correctCount} of {result.totalQuestions} correct · need {result.passScore}% to pass
        </p>
        {result.passed && result.xpAwarded > 0 && (
          <p className="rounded-full bg-tone-warning-bg px-3 py-1 text-sm font-semibold text-tone-warning-fg">+{result.xpAwarded} XP awarded</p>
        )}
        <button type="button" onClick={onClose} className="mt-2 rounded-lg bg-ink text-ivory px-5 py-2 text-sm font-semibold">
          Back to path
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <button type="button" onClick={onClose} className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-fg/60 hover:text-fg">
        <ArrowLeft className="h-4 w-4" /> Exit quiz
      </button>
      {error && <p className="text-sm text-danger">{error}</p>}
      <p className="text-sm text-fg/60">Quiz · {moduleTitle}</p>
      <QuizQuestion
        question={quiz.questions[index]}
        questionNumber={index + 1}
        totalQuestions={quiz.questions.length}
        selectedOptionId={selected}
        onSelect={onSelect}
        isAnswered={isAnswered}
        feedback={feedback}
        onSubmit={onSubmit}
        onNext={onNext}
        isLastQuestion={index === quiz.questions.length - 1}
      />
    </div>
  );
}