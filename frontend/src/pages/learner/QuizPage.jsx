import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizCard from "../../components/learner/QuizCard";
import QuizRunner from "../../components/learner/QuizRunner";
import QuizResult from "../../components/learner/QuizResult";
import { getQuiz, submitQuizAttempt } from "../../services/quizService";
import { awardPoints } from "../../services/gamificationService";

const STAGES = {
  PREVIEW: "preview",
  RUNNING: "running",
  RESULT: "result",
};

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [stage, setStage] = useState(STAGES.PREVIEW);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    getQuiz(quizId)
      .then((data) => {
        if (!cancelled) setQuiz(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Couldn't load this quiz.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [quizId]);

  const handleStart = () => setStage(STAGES.RUNNING);

  const handleComplete = async (quizResult) => {
    setResult(quizResult);
    setStage(STAGES.RESULT);

    try {
      await submitQuizAttempt(quizId, quizResult);
      if (quizResult.totalPoints > 0) {
        await awardPoints(quizResult.totalPoints, { source: "quiz", quizId });
      }
    } catch (err) {
      // Attempt still shows locally even if the save fails; surface a soft warning
      setError(
        err.message || "Your score didn't save. Check your connection."
      );
    }
  };

  const handleRetry = () => {
    setResult(null);
    setStage(STAGES.RUNNING);
  };

  const handleExit = () => navigate(-1);

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Loading quiz...</p>;
  }

  if (error && !quiz) {
    return <p className="p-6 text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {error && (
        <p className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
          {error}
        </p>
      )}

      {stage === STAGES.PREVIEW && (
        <QuizCard quiz={quiz} onStart={handleStart} />
      )}

      {stage === STAGES.RUNNING && (
        <QuizRunner quiz={quiz} onComplete={handleComplete} onExit={handleExit} />
      )}

      {stage === STAGES.RESULT && (
        <QuizResult
          quiz={quiz}
          result={result}
          onRetry={handleRetry}
          onExit={handleExit}
        />
      )}
    </div>
  );
}