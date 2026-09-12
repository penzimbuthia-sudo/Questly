import { startTransition, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, PlayCircle, Sparkles } from "lucide-react";
import QuizQuestion from "../../components/learner/QuizQuestion";
import {
  getPathById,
  getPathProgress,
  startPath,
} from "../../services/learningPathService";
import { getQuizForModule, submitQuiz } from "../../services/quizService";

export default function PathDetail() {
  const { pathId } = useParams();
  const navigate = useNavigate();

  const [path, setPath] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activeModule, setActiveModule] = useState(null); // module currently taking a quiz
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
      const quiz = await getQuizForModule(module.id);
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
      return {
        ...prev,
        isAnswered: true,
        feedback: null, // backend only reveals correctness after the full quiz is submitted
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
    try {
      const result = await submitQuiz(activeModule.id, quizState.answers);
      setQuizState((prev) => ({ ...prev, result }));
      if (result.passed) {
        const updated = await getPathProgress(pathId);
        setProgress(updated);
      }
    } catch (error) {
      setQuizError(error.message || "Unable to submit this quiz.");
    }
  };

  const closeQuiz = () => {
    setActiveModule(null);
    setQuizState(null);
  };

  if (!path || !progress) return <p className="text-sm text-neutral-400">Loading path…</p>;

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
      <button type="button" onClick={() => navigate("..")} className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-800">
        <ArrowLeft className="h-4 w-4" /> Back to paths
      </button>

      <div className="rounded-2xl border border-black/5 bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-2xl">📘</div>
          <div className="flex-1">
            <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{path.level}</span>
            <h1 className="mt-2 text-xl font-bold text-neutral-900">{path.title}</h1>
            <p className="mt-1 text-sm text-neutral-500">{path.description}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full rounded-full bg-amber-400" style={{ width: `${progress.percent}%` }} />
          </div>
          <span className="text-sm font-semibold text-neutral-700">{progress.percent}%</span>
        </div>
        <p className="mt-1 text-xs text-neutral-400">
          {progress.modulesCompleted}/{progress.totalModules} modules · {progress.xpEarned.toLocaleString()} XP earned
        </p>
      </div>

      {quizError && <p className="text-sm text-rose-600">{quizError}</p>}

      <div className="rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="text-base font-semibold text-neutral-900">Modules</h2>
        <div className="mt-4 flex flex-col divide-y divide-neutral-100">
          {path.modules.map((module, i) => {
            const done = module.completed ?? false;
            return (
              <div key={module.id} className="flex items-center gap-4 py-3">
                {done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-neutral-300" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-medium ${done ? "text-neutral-500 line-through" : "text-neutral-900"}`}>
                    {i + 1}. {module.title}
                  </p>
                  <p className="text-xs text-amber-600">{module.xp_value} XP</p>
                </div>
                <button
                  type="button"
                  onClick={() => beginQuiz(module)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium ${
                    done ? "border border-neutral-200 text-neutral-500 hover:border-purple-300" : "bg-purple-600 text-white"
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
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-black/5 bg-white p-10 text-center">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full ${result.passed ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}>
          <span className="text-2xl font-bold">{result.score}%</span>
        </div>
        <h2 className="text-lg font-semibold text-neutral-900">
          {result.passed ? "Quiz passed!" : "Not quite there yet"}
        </h2>
        <p className="text-sm text-neutral-500">
          {result.correctCount} of {result.totalQuestions} correct · need {result.passScore}% to pass
        </p>
        {result.passed && result.xpAwarded > 0 && (
          <p className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600">+{result.xpAwarded} XP awarded</p>
        )}
        <button type="button" onClick={onClose} className="mt-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-semibold text-white">
          Back to path
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <button type="button" onClick={onClose} className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-800">
        <ArrowLeft className="h-4 w-4" /> Exit quiz
      </button>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <p className="text-sm text-neutral-500">Quiz · {moduleTitle}</p>
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