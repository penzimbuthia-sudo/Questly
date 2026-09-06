import { api } from "./api";

/**
 * Fetches the quiz for a module from the backend.
 */
export async function getQuizForModule(_pathId, moduleId) {
  return api.get(`/modules/${moduleId}/quiz`);
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
  const response = await api.post(`/modules/${moduleId}/quiz/submit`, {
    answers: questions.map((question) => ({
      question_id: question.id,
      option_id: answers[question.id],
    })),
  });

  return {
    ...response,
    correctCount: response.correct_count,
    totalQuestions: response.total_questions,
    passScore: response.pass_score,
    xpAwarded: response.xp_awarded,
  };
}
