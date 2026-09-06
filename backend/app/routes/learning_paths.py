# app/routes/learning_paths.py

from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.extensions import db
from app.models.learning_path import LearningPath
from app.models.module import Module
from app.models.progress import Progress
from app.models.resource import Resource
from app.schemas.learning_path_schema import (
    FollowedPathSchema,
    LearningPathDetailSchema,
    LearningPathSchema,
)
from app.utils.decorators import jwt_required_custom, role_required
from app.services import leaderboard_service
from app.services.badge_engine import check_and_award_badges

# NOTE: uses flask_jwt_extended's @jwt_required() directly. Swap for B's
# custom decorator (app.utils.decorators) once it exists, if it does more
# than plain token validation (e.g. role checks) — see task dependencies.

learning_paths_bp = Blueprint("learning_paths", __name__, url_prefix="/learning-paths")
api_learning_paths_bp = Blueprint("api_learning_paths", __name__, url_prefix="/api/learning-paths")

path_list_schema = LearningPathSchema(many=True)
path_detail_schema = LearningPathDetailSchema()
followed_schema = FollowedPathSchema(many=True)


@api_learning_paths_bp.get("")
def list_api_paths():
    paths = LearningPath.query.filter_by(status="Published").order_by(LearningPath.id).all()
    category = request.args.get("category")
    if category and category != "All":
        paths = [path for path in paths if path.category == category]
    return jsonify(path_list_schema.dump(paths)), 200


@api_learning_paths_bp.post("")
@jwt_required_custom
@role_required("contributor")
def create_api_path():
    data = request.get_json(silent=True) or {}
    title = data.get("title", "").strip()
    if not title:
        return jsonify({"error": "Title is required."}), 400

    user_id = get_jwt_identity()
    resource_ids = data.get("resource_ids", [])
    if not isinstance(resource_ids, list):
        return jsonify({"error": "resource_ids must be an ordered list."}), 400

    resources = []
    if resource_ids:
        resources = Resource.query.filter(Resource.id.in_(resource_ids)).all()
        found_ids = {resource.id for resource in resources}
        if len(found_ids) != len(set(resource_ids)):
            return jsonify({"error": "One or more resource_ids were not found."}), 400
        if any(resource.status != "Published" and resource.contributor_id != user_id for resource in resources):
            return jsonify({"error": "You can only add published resources or your own submissions."}), 403

    path = LearningPath(
        title=title,
        description=data.get("description"),
        category=data.get("category"),
        level=data.get("level", "Beginner"),
        xp_reward=data.get("xp_reward", 0),
        contributor_id=user_id,
        status="Pending",
    )
    db.session.add(path)
    db.session.flush()
    resource_by_id = {resource.id: resource for resource in resources}
    for order_index, resource_id in enumerate(resource_ids):
        resource = resource_by_id[resource_id]
        module = Module(
            learning_path_id=path.id,
            title=resource.title,
            order_index=order_index,
            xp_value=data.get("module_xp", 100),
        )
        db.session.add(module)
        db.session.flush()
        resource.module_id = module.id

    db.session.commit()
    leaderboard_service.award_xp(
        user_id=user_id,
        amount=50,
        reason=f'Submitted learning path "{path.title}"',
        source_type="learning_path",
        source_id=path.id,
    )
    response_data = path.to_dict(include_modules=True)
    response_data["xp_awarded"] = 50
    response_data["badges_awarded"] = check_and_award_badges(user_id)
    return jsonify({"success": True, "data": response_data, "message": "Learning path submitted for review."}), 201


@learning_paths_bp.get("")
def browse_paths():
    """Public browse, matches the frontend's Explore page. Optional
    ?category=Frontend filter."""
    query = LearningPath.query.filter_by(status="Published")
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
@jwt_required_custom
@role_required("learner")
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
