# app/routes/progress.py
#
# Also covers resource ratings — there's no dedicated ratings.py in the
# Learner file list, and rating a resource is a learner activity, so it
# lives here alongside the other progress-tracking endpoints.

from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy import func

from app.extensions import db
from app.models.learning_path import LearningPath
from app.models.progress import Progress
from app.models.rating import Rating
from app.models.resource import Resource

progress_bp = Blueprint("progress", __name__, url_prefix="/api")


@progress_bp.get("/progress/me")
@jwt_required()
def my_progress():
    """Every progress row (path follows + module completions) for the
    current user — a flat activity log, not summarized per path."""
    user_id = int(get_jwt_identity())
    entries = Progress.query.filter_by(user_id=user_id).order_by(Progress.created_at.desc()).all()
    return jsonify([e.to_dict() for e in entries]), 200


@progress_bp.get("/progress/paths/<int:path_id>")
@jwt_required()
def path_progress(path_id):
    """Progress summary for one path: modules completed / total, percent."""
    path = LearningPath.query.get_or_404(path_id)
    user_id = int(get_jwt_identity())

    completed_count = Progress.query.filter(
        Progress.user_id == user_id,
        Progress.learning_path_id == path_id,
        Progress.module_id.isnot(None),
        Progress.status == "completed",
    ).count()
    total = path.total_modules

    return (
        jsonify(
            {
                "learning_path_id": path_id,
                "modules_completed": completed_count,
                "total_modules": total,
                "percent": round((completed_count / total) * 100) if total else 0,
            }
        ),
        200,
    )


@progress_bp.post("/resources/<int:resource_id>/rating")
@jwt_required()
def rate_resource(resource_id):
    """Upserts the current user's rating — re-rating updates the existing
    row instead of creating a duplicate (see Rating's unique constraint)."""
    Resource.query.get_or_404(resource_id)
    body = request.get_json(silent=True) or {}
    score = body.get("score")
    comment = body.get("comment")

    if not isinstance(score, int) or not (1 <= score <= 5):
        return jsonify({"error": "score must be an integer from 1 to 5"}), 400

    user_id = int(get_jwt_identity())
    rating = Rating.query.filter_by(user_id=user_id, resource_id=resource_id).first()

    if rating:
        rating.score = score
        rating.comment = comment
    else:
        rating = Rating(user_id=user_id, resource_id=resource_id, score=score, comment=comment)
        db.session.add(rating)

    db.session.commit()
    return jsonify(rating.to_dict()), 200


@progress_bp.get("/resources/<int:resource_id>/rating")
def resource_rating_summary(resource_id):
    """Public — average score + count, for display on the resource card."""
    Resource.query.get_or_404(resource_id)
    avg, count = (
        db.session.query(func.avg(Rating.score), func.count(Rating.id))
        .filter(Rating.resource_id == resource_id)
        .one()
    )
    return (
        jsonify(
            {
                "resource_id": resource_id,
                "average": round(float(avg), 2) if avg is not None else None,
                "count": count,
            }
        ),
        200,
    )
