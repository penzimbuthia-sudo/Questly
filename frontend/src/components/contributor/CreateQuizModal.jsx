import { useState } from "react";

const OPTION_IDS = ["a", "b", "c", "d"];

const emptyQuestion = () => ({
  id: crypto.randomUUID(),
  prompt: "",
  options: OPTION_IDS.map((id) => ({ id, text: "" })),
  correctOptionId: "a",
  explanation: "",
});

export default function CreateQuizModal({ pathId, moduleId, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateQuestion = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const updateOptionText = (qId, optionId, text) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, text } : o
              ),
            }
          : q
      )
    );
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, emptyQuestion()]);
  };

  const removeQuestion = (id) => {
    setQuestions((prev) =>
      prev.length > 1 ? prev.filter((q) => q.id !== id) : prev
    );
  };

  const validate = () => {
    if (!title.trim()) return "Give the quiz a title.";
    for (const [i, q] of questions.entries()) {
      if (!q.prompt.trim()) return `Question ${i + 1} needs prompt text.`;
      if (q.options.some((o) => !o.text.trim()))
        return `Question ${i + 1} needs all 4 options filled in.`;
      if (!q.explanation.trim())
        return `Question ${i + 1} needs a short explanation for the correct answer.`;
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      // Shape matches quizService's AUTHORED_QUIZZES entries: { title, questions }.
      // moduleId/pathId are passed alongside so the receiving side can key it
      // the same way getQuizForModule does (`${pathId}::${moduleId}`).
      await onSubmit({
        pathId,
        moduleId,
        title: title.trim(),
        questions: questions.map((q) => ({
          id: q.id,
          prompt: q.prompt.trim(),
          options: q.options.map((o) => ({ id: o.id, text: o.text.trim() })),
          correctOptionId: q.correctOptionId,
          explanation: q.explanation.trim(),
        })),
      });
      onClose();
    } catch (err) {
      setError(err?.message || "Couldn't save the quiz. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Create quiz</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quiz title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Hooks deep dive"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {questions.map((q, qIndex) => (
            <div
              key={q.id}
              className="rounded-md border border-gray-200 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Question {qIndex + 1}
                </span>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(q.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <textarea
                value={q.prompt}
                onChange={(e) =>
                  updateQuestion(q.id, "prompt", e.target.value)
                }
                placeholder="Question prompt"
                rows={2}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />

              <div className="space-y-2">
                {q.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${q.id}`}
                      checked={q.correctOptionId === option.id}
                      onChange={() =>
                        updateQuestion(q.id, "correctOptionId", option.id)
                      }
                      aria-label={`Mark option ${option.id} as correct`}
                    />
                    <span className="w-4 text-xs uppercase text-gray-400">
                      {option.id}
                    </span>
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        updateOptionText(q.id, option.id, e.target.value)
                      }
                      placeholder={`Option ${option.id}`}
                      className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                ))}
                <p className="text-xs text-gray-400">
                  Select the radio button next to the correct answer.
                </p>
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Explanation (shown after answering)
                </label>
                <textarea
                  value={q.explanation}
                  onChange={(e) =>
                    updateQuestion(q.id, "explanation", e.target.value)
                  }
                  placeholder="Why is the correct answer correct?"
                  rows={2}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            + Add another question
          </button>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Create quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}