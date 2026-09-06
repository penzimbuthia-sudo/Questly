import { CheckCircle2, XCircle } from "lucide-react";

/**
 * QuizQuestion
 * Renders one question of a quiz: options → selection → submit → instant
 * correct/incorrect feedback. Stateless by design — the parent (e.g. a
 * quiz flow on PathDetail) owns which question is current, the selected
 * option, and whether it's been answered, so scoring stays centralized in
 * `quizService`.
 *
 * Props:
 *  - question: { id, prompt, options: [{id, text}] }
 *  - questionNumber, totalQuestions
 *  - selectedOptionId
 *  - onSelect(optionId)
 *  - isAnswered: whether this question has been submitted
 *  - feedback: { isCorrect, correctOptionId, explanation } | null
 *  - onSubmit(): locks in the current selection
 *  - onNext(): advances to the next question / finishes the quiz
 *  - isLastQuestion
 */
export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionId,
  onSelect,
  isAnswered,
  feedback,
  onSubmit,
  onNext,
  isLastQuestion,
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
        Question {questionNumber} of {totalQuestions}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-neutral-900">{question.prompt}</h3>

      <div className="mt-4 flex flex-col gap-2">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrectOption = isAnswered && option.id === feedback?.correctOptionId;
          const isWrongSelected = isAnswered && isSelected && !feedback?.isCorrect;

          return (
            <button
              key={option.id}
              type="button"
              disabled={isAnswered}
              onClick={() => onSelect(option.id)}
              className={[
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
                isCorrectOption
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : isWrongSelected
                  ? "border-rose-300 bg-rose-50 text-rose-800"
                  : isSelected
                  ? "border-purple-400 bg-purple-50 text-purple-800"
                  : "border-neutral-200 text-neutral-800 hover:border-purple-200",
                isAnswered ? "cursor-default" : "cursor-pointer",
              ].join(" ")}
            >
              {option.text}
              {isCorrectOption && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
              {isWrongSelected && <XCircle className="h-4 w-4 text-rose-500" />}
            </button>
          );
        })}
      </div>

      {isAnswered && feedback && (
        <div
          className={`mt-4 rounded-xl px-4 py-3 text-sm ${
            feedback.isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"
          }`}
        >
          <p className="font-semibold">{feedback.isCorrect ? "Correct!" : "Not quite."}</p>
          <p className="mt-0.5 text-neutral-600">{feedback.explanation}</p>
        </div>
      )}

      <div className="mt-5 flex justify-end">
        {!isAnswered ? (
          <button
            type="button"
            disabled={!selectedOptionId}
            onClick={onSubmit}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            Submit answer
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
          >
            {isLastQuestion ? "See results" : "Next question"}
          </button>
        )}
      </div>
    </div>
  );
}
