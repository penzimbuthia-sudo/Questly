export default function QuizResult({ result, quiz, onRetry, onExit }) {
  const percentage = Math.round(
    (result.correctCount / result.totalQuestions) * 100
  );
  const passed = percentage >= 70;

  return (
    <div className="mx-auto w-full max-w-xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-semibold ${
          passed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
        }`}
      >
        {percentage}%
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        {passed ? "Nice work!" : "Almost there"}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        You got {result.correctCount} of {result.totalQuestions} questions
        right and earned {result.totalPoints} points.
      </p>

      <div className="mt-6 space-y-2 text-left">
        {quiz.questions.map((q, i) => {
          const answer = result.answers[i];
          return (
            <div
              key={q.id}
              className={`rounded-md border px-3 py-2 text-sm ${
                answer.isCorrect
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              <span className="font-medium">Q{i + 1}:</span> {q.text}{" "}
              {answer.isCorrect ? (
                <span>&mdash; correct (+{answer.points} pts)</span>
              ) : (
                <span>
                  &mdash; you chose "{q.options[answer.selectedIndex]}", correct
                  was "{q.options[q.correctIndex]}"
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={onExit}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to module
        </button>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Retry quiz
        </button>
      </div>
    </div>
  );
}