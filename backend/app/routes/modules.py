# app/routes/modules.py

from datetime import datetime, timezone

from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.extensions import db
from app.models.learning_path import LearningPath
from app.models.module import Module
from app.models.progress import Progress
from app.schemas.learning_path_schema import ModuleSchema
from app.services import leaderboard_service

modules_bp = Blueprint("modules", __name__, url_prefix="/api")

module_list_schema = ModuleSchema(many=True)
module_schema = ModuleSchema()


@modules_bp.get("/learning-paths/<int:path_id>/modules")
@jwt_required(optional=True)
def list_modules(path_id):
    LearningPath.query.get_or_404(path_id)
    modules = (
        Module.query.filter_by(learning_path_id=path_id).order_by(Module.order_index).all()
    )
    data = module_list_schema.dump(modules)

    identity = get_jwt_identity()
    if identity is not None:
        user_id = int(identity)
        completed_ids = {
            p.module_id
            for p in Progress.query.filter_by(
                user_id=user_id, learning_path_id=path_id, status="completed"
            ).filter(Progress.module_id.isnot(None))
        }
        for m in data:
            m["completed"] = m["id"] in completed_ids

    return jsonify(data), 200


@modules_bp.get("/modules/<int:module_id>")
@jwt_required(optional=True)
def get_module(module_id):
    module = Module.query.get_or_404(module_id)
    data = module_schema.dump(module)

    identity = get_jwt_identity()
    if identity is not None:
        user_id = int(identity)
        completed = Progress.query.filter_by(
            user_id=user_id, module_id=module_id, status="completed"
        ).first()
        data["completed"] = completed is not None

    return jsonify(data), 200


def _ensure_following(user_id, learning_path_id):
    """Auto-enrolls the user in the parent path if they aren't already
    following it — opening a module directly (e.g. a shared link)
    shouldn't be blocked just because they never hit "follow" first."""
    following = Progress.query.filter_by(
        user_id=user_id, learning_path_id=learning_path_id, module_id=None
    ).first()
    if not following:
        db.session.add(
            Progress(user_id=user_id, learning_path_id=learning_path_id, module_id=None, status="following")
        )


@modules_bp.post("/modules/<int:module_id>/complete")
@jwt_required()
def complete_module(module_id):
    """Direct completion for modules that don't have a quiz. Modules
    with a quiz must go through POST /modules/<id>/quiz/submit instead —
    that's the only path that can actually grade and award XP for them."""
    module = Module.query.get_or_404(module_id)
    user_id = int(get_jwt_identity())

    if module.quiz is not None:
        return (
            jsonify({"error": "This module has a quiz — submit it via /modules/<id>/quiz/submit instead."}),
            400,
        )

    existing = Progress.query.filter_by(
        user_id=user_id, module_id=module_id, status="completed"
    ).first()
    if existing:
        return jsonify({"message": "Already completed", "xp_awarded": 0}), 200

    _ensure_following(user_id, module.learning_path_id)

    entry = Progress(
        user_id=user_id,
        learning_path_id=module.learning_path_id,
        module_id=module_id,
        status="completed",
        completed_at=datetime.now(timezone.utc),
    )
    db.session.add(entry)
    db.session.commit()

    leaderboard_service.award_xp(
        user_id=user_id,
        amount=module.xp_value,
        reason=f'Completed module "{module.title}"',
        source_type="module",
        source_id=module.id,
    )

    return jsonify({"message": "Module completed", "xp_awarded": module.xp_value}), 200
