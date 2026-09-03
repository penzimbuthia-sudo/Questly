# app/routes/learning_paths.py

from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.extensions import db
from app.models.learning_path import LearningPath
from app.models.progress import Progress
from app.schemas.learning_path_schema import (
    FollowedPathSchema,
    LearningPathDetailSchema,
    LearningPathSchema,
)

# NOTE: uses flask_jwt_extended's @jwt_required() directly. Swap for B's
# custom decorator (app.utils.decorators) once it exists, if it does more
# than plain token validation (e.g. role checks) — see task dependencies.

learning_paths_bp = Blueprint("learning_paths", __name__, url_prefix="/learning-paths")

path_list_schema = LearningPathSchema(many=True)
path_detail_schema = LearningPathDetailSchema()
followed_schema = FollowedPathSchema(many=True)


@learning_paths_bp.get("")
def browse_paths():
    """Public browse, matches the frontend's Explore page. Optional
    ?category=Frontend filter."""
    query = LearningPath.query
    category = request.args.get("category")
    if category and category != "All":
        query = query.filter_by(category=category)
    paths = query.order_by(LearningPath.id).all()
    return jsonify(path_list_schema.dump(paths)), 200


@learning_paths_bp.get("/mine")
@jwt_required()
def my_paths():
    """Paths the current user follows, each with progress computed
    on the fly from Progress rows (no cached counter to drift out of sync)."""
    user_id = get_jwt_identity()

    followed = (
        Progress.query.filter_by(user_id=user_id, module_id=None)
        .filter(Progress.learning_path_id.isnot(None))
        .all()
    )

    results = []
    for entry in followed:
        path = entry.learning_path
        completed_count = Progress.query.filter(
            Progress.user_id == user_id,
            Progress.learning_path_id == path.id,
            Progress.module_id.isnot(None),
            Progress.status == "completed",
        ).count()
        total = path.total_modules
        results.append(
            {
                "learning_path": path,
                "modules_completed": completed_count,
                "total_modules": total,
                "percent": round((completed_count / total) * 100) if total else 0,
            }
        )

    return jsonify(followed_schema.dump(results)), 200


@learning_paths_bp.get("/<int:path_id>")
@jwt_required(optional=True)
def get_path(path_id):
    """Path detail + ordered modules. Works logged-out (browse); when
    logged in, each module is annotated with whether it's completed."""
    path = LearningPath.query.get_or_404(path_id)
    data = path_detail_schema.dump(path)

    identity = get_jwt_identity()
    if identity is not None:
        user_id = int(identity)
        completed_ids = {
            p.module_id
            for p in Progress.query.filter_by(
                user_id=user_id, learning_path_id=path_id, status="completed"
            ).filter(Progress.module_id.isnot(None))
        }
        for module in data["modules"]:
            module["completed"] = module["id"] in completed_ids

    return jsonify(data), 200


@learning_paths_bp.post("/<int:path_id>/follow")
@jwt_required()
def follow_path(path_id):
    """Enroll the current user in a path. Idempotent — following an
    already-followed path just returns the existing state."""
    LearningPath.query.get_or_404(path_id)
    user_id = get_jwt_identity()

    existing = Progress.query.filter_by(
        user_id=user_id, learning_path_id=path_id, module_id=None
    ).first()
    if existing:
        return jsonify({"message": "Already following", "already_following": True}), 200

    entry = Progress(user_id=user_id, learning_path_id=path_id, module_id=None, status="following")
    db.session.add(entry)
    db.session.commit()
    return jsonify({"message": "Now following", "already_following": False}), 201
