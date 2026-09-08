import { useState } from "react";

export default function QuizRunner({ quiz, onComplete, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");

  const question = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  const handleSelect = (optionIndex) => {
    setSelected(optionIndex);
    setError("");
  };

  const handleNext = () => {
    if (selected === null) {
      setError("Choose an answer before continuing.");
      return;
    }

    const isCorrect = selected === question.correctIndex;
    const updatedAnswers = [
      ...answers,
      {
        questionId: question.id,
        selectedIndex: selected,
        isCorrect,
        points: isCorrect ? question.points : 0,
      },
    ];

    if (isLastQuestion) {
      const totalPoints = updatedAnswers.reduce((sum, a) => sum + a.points, 0);
      const correctCount = updatedAnswers.filter((a) => a.isCorrect).length;
      onComplete({
        quizId: quiz.id,
        answers: updatedAnswers,
        totalPoints,
        correctCount,
        totalQuestions: quiz.questions.length,
      });
    } else {
      setAnswers(updatedAnswers);
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">
          Question {currentIndex + 1} of {quiz.questions.length}
        </span>
        <button
          type="button"
          onClick={onExit}
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          Exit
        </button>
      </div>

      <div className="mb-4 h-1.5 w-full rounded-full bg-gray-100">
        <div
          className="h-1.5 rounded-full bg-indigo-600 transition-all"
          style={{
            width: `${((currentIndex + 1) / quiz.questions.length) * 100}%`,
          }}
        />
      </div>

      <h3 className="mb-4 text-base font-semibold text-gray-900">
        {question.text}
      </h3>

      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSelect(index)}
            className={`w-full rounded-md border px-4 py-2.5 text-left text-sm transition-colors ${
              selected === index
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <button
        type="button"
        onClick={handleNext}
        className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        {isLastQuestion ? "Submit quiz" : "Next question"}
      </button>
    </div>
  );
}