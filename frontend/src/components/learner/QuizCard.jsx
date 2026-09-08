export default function QuizCard({ quiz, onStart }) {
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {quiz.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {quiz.questions.length} question
            {quiz.questions.length !== 1 ? "s" : ""} &middot; {totalPoints} pts
            available
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onStart(quiz)}
        className="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Start quiz
      </button>
    </div>
  );
}