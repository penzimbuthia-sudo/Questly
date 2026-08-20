/**
 * src/services/quizService.js
 *
 * OWNERSHIP: owned by the learner-UI workstream (C), same as
 * learningPathService. Request new exports rather than editing directly.
 *
 * Drives the question -> answer -> score -> XP flow used by
 * <QuizQuestion /> on the PathDetail page. Passing a quiz (>= PASS_SCORE)
 * completes the underlying module via learningPathService, which is what
 * actually moves the progress bar and awards XP — this file owns grading,
 * that file owns progress/XP bookkeeping.
 */

import { completeModule } from "./learningPathService";

const PASS_SCORE = 70; // percent

const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms));

// A few authored quizzes for modules referenced elsewhere in the UI
// (e.g. Profile's "Completed Hooks deep dive" activity item).
const AUTHORED_QUIZZES = {
  "react-developer-path-m5": {
    title: "Hooks deep dive",
    questions: [
      {
        id: "q1",
        prompt: "Which hook lets a component remember a value across renders without re-rendering when it changes?",
        options: [
          { id: "a", text: "useState" },
          { id: "b", text: "useRef" },
          { id: "c", text: "useEffect" },
          { id: "d", text: "useMemo" },
        ],
        correctOptionId: "b",
        explanation: "useRef persists a mutable value across renders and updating it doesn't trigger a re-render.",
      },
      {
        id: "q2",
        prompt: "What does the dependency array in useEffect control?",
        options: [
          { id: "a", text: "Which state variables can be updated" },
          { id: "b", text: "The order effects run in" },
          { id: "c", text: "When the effect re-runs" },
          { id: "d", text: "Whether the component re-renders" },
        ],
        correctOptionId: "c",
        explanation: "React re-runs an effect only when a value in its dependency array changes between renders.",
      },
      {
        id: "q3",
        prompt: "Custom hooks are best used to:",
        options: [
          { id: "a", text: "Share stateful logic between components" },
          { id: "b", text: "Replace all class components" },
          { id: "c", text: "Avoid using useState entirely" },
          { id: "d", text: "Improve CSS specificity" },
        ],
        correctOptionId: "a",
        explanation: "Custom hooks extract reusable stateful logic so multiple components can share it.",
      },
    ],
  },
};

// Generic fallback so every module in the catalog has something to quiz on.
function genericQuiz(pathTitle, moduleTitle) {
  return {
    title: moduleTitle,
    questions: [
      {
        id: "q1",
        prompt: `In "${moduleTitle}", what's the best first step when you're stuck?`,
        options: [
          { id: "a", text: "Re-read the module's examples" },
          { id: "b", text: "Skip ahead to the next module" },
          { id: "c", text: "Close the app" },
          { id: "d", text: "Guess randomly on the quiz" },
        ],
        correctOptionId: "a",
        explanation: "Reviewing the worked examples is usually faster than pushing ahead without the fundamentals.",
      },
      {
        id: "q2",
        prompt: `Which of these best describes the goal of "${moduleTitle}" within ${pathTitle}?`,
        options: [
          { id: "a", text: "It's unrelated filler content" },
          { id: "b", text: "It builds a concrete skill toward the path's outcome" },
          { id: "c", text: "It only tests memorization" },
          { id: "d", text: "It replaces the need for practice" },
        ],
        correctOptionId: "b",
        explanation: "Each module is scoped to build one concrete skill that compounds toward the path's outcome.",
      },
    ],
  };
}

function buildQuizId(pathId, moduleId) {
  return `${pathId}::${moduleId}`;
}

/**
 * Fetches the quiz for a module. `moduleTitle`/`pathTitle` are passed in
 * so the generic fallback can generate something contextual without this
 * service needing to import the full path catalog.
 */
export async function getQuizForModule(pathId, moduleId, { pathTitle, moduleTitle } = {}) {
  await delay();
  const authored = AUTHORED_QUIZZES[moduleId];
  const quiz = authored ?? genericQuiz(pathTitle ?? "this path", moduleTitle ?? "this module");
  return {
    id: buildQuizId(pathId, moduleId),
    pathId,
    moduleId,
    title: quiz.title,
    questions: quiz.questions,
    passScore: PASS_SCORE,
  };
}

/** Grades a single answer. Does not mutate any state — pure helper for instant UI feedback. */
export function gradeAnswer(question, selectedOptionId) {
  const isCorrect = selectedOptionId === question.correctOptionId;
  return { isCorrect, correctOptionId: question.correctOptionId, explanation: question.explanation };
}

/**
 * Submits a full set of answers: { [questionId]: optionId }.
 * Computes score → and, if passing, triggers module completion + XP award
 * via learningPathService.completeModule. Returns the score breakdown plus
 * whatever XP/progress info completeModule reports.
 */
export async function submitQuiz(pathId, moduleId, answers, questions) {
  await delay(200);
  const total = questions.length;
  const correctCount = questions.reduce(
    (sum, q) => sum + (answers[q.id] === q.correctOptionId ? 1 : 0),
    0
  );
  const score = total === 0 ? 0 : Math.round((correctCount / total) * 100);
  const passed = score >= PASS_SCORE;

  let completion = { progress: null, xpAwarded: 0 };
  if (passed) {
    completion = await completeModule(pathId, moduleId);
  }

  return {
    score,
    correctCount,
    totalQuestions: total,
    passed,
    passScore: PASS_SCORE,
    progress: completion.progress,
    xpAwarded: completion.xpAwarded,
  };
}
