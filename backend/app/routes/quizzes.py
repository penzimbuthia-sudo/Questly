# app/routes/quizzes.py

from datetime import datetime, timezone

from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError

from app.extensions import db
from app.models.module import Module
from app.models.progress import Progress
from app.routes.modules import _ensure_following
from app.schemas.quiz_schema import (
    QuizResultSchema,
    QuizSchema,
    QuizSubmissionSchema,
)
from app.services import leaderboard_service

quizzes_bp = Blueprint("quizzes", __name__, url_prefix="/api")

quiz_schema = QuizSchema()
submission_schema = QuizSubmissionSchema()
result_schema = QuizResultSchema()


@quizzes_bp.get("/modules/<int:module_id>/quiz")
def get_quiz(module_id):
    module = Module.query.get_or_404(module_id)
    if module.quiz is None:
        return jsonify({"error": "This module has no quiz."}), 404
    # reveal_answers stays False here — this is the question set a
    # learner is about to attempt, correct_option must never be sent.
    return jsonify(quiz_schema.dump(module.quiz)), 200


@quizzes_bp.post("/modules/<int:module_id>/quiz/submit")
@jwt_required()
def submit_quiz(module_id):
    module = Module.query.get_or_404(module_id)
    quiz = module.quiz
    if quiz is None:
        return jsonify({"error": "This module has no quiz."}), 404

    try:
        payload = submission_schema.load(request.get_json(silent=True) or {})
    except ValidationError as err:
        return jsonify({"error": "Invalid submission", "details": err.messages}), 400

    answers = submission_schema.to_answer_map(payload)  # {question_id: option_id}

    questions = quiz.questions
    total = len(questions)
    correct_count = sum(
        1 for q in questions if answers.get(q.id) == q.correct_option
    )
    score = round((correct_count / total) * 100) if total else 0
    passed = score >= quiz.pass_score

    user_id = int(get_jwt_identity())
    xp_awarded = 0

    if passed:
        already_completed = Progress.query.filter_by(
            user_id=user_id, module_id=module_id, status="completed"
        ).first()

        if already_completed:
            # Retake: update the stored score if this attempt did better,
            # but never re-award XP for the same module.
            if score > (already_completed.score or 0):
                already_completed.score = score
                db.session.commit()
        else:
            _ensure_following(user_id, module.learning_path_id)
            db.session.add(
                Progress(
                    user_id=user_id,
                    learning_path_id=module.learning_path_id,
                    module_id=module_id,
                    status="completed",
                    score=score,
                    completed_at=datetime.now(timezone.utc),
                )
            )
            db.session.commit()

            xp_awarded = module.xp_value
            leaderboard_service.award_xp(
                user_id=user_id,
                amount=xp_awarded,
                reason=f'Passed quiz for "{module.title}"',
                source_type="quiz",
                source_id=quiz.id,
            )

    result = {
        "score": score,
        "correct_count": correct_count,
        "total_questions": total,
        "pass_score": quiz.pass_score,
        "passed": passed,
        "xp_awarded": xp_awarded,
        # Safe to reveal answers/explanations now — the attempt is graded.
        "questions": [q.to_dict(reveal_answer=True) for q in questions],
    }
    return jsonify(result_schema.dump(result)), 200
