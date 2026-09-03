"""
discussions.py - Admin routes for discussion moderation.
"""

from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app import db
from app.models.discussion import Discussion
from app.models.system_log import SystemLog
from app.schemas.discussion_schema import DiscussionUpdateSchema
from app.utils.decorators import role_required

discussions_bp = Blueprint("discussions", __name__, url_prefix="/api/discussions")


@discussions_bp.route("/", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_discussions():
    """Get all discussions for moderation (admin only)."""
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)
    status = request.args.get("status", None)

    query = Discussion.query

    if status:
        query = query.filter_by(status=status)

    paginated = query.order_by(Discussion.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    return jsonify({
        "data": [d.to_dict() for d in paginated.items],
        "meta": {
            "page": page,
            "per_page": per_page,
            "total": paginated.total,
            "pages": paginated.pages,
        }
    }), 200


@discussions_bp.route("/<int:discussion_id>", methods=["PATCH"])
@jwt_required()
@role_required("admin")
def update_discussion(discussion_id):
    """Update a discussion (title, content, flag status)."""
    data = request.get_json()
    schema = DiscussionUpdateSchema()
    validated = schema.load(data, partial=True)

    discussion = Discussion.query.get_or_404(discussion_id)

    for key, value in validated.items():
        setattr(discussion, key, value)

    log = SystemLog(
        level="INFO",
        message=f"Discussion updated: {discussion.title}",
        source="discussions.py",
        admin_id=get_jwt_identity(),
        metadata={"discussion_id": discussion_id, "changes": validated}
    )
    db.session.add(log)
    db.session.commit()

    return jsonify({"data": discussion.to_dict(), "message": "Discussion updated successfully"}), 200


@discussions_bp.route("/<int:discussion_id>/flag", methods=["POST"])
@jwt_required()
@role_required("admin")
def flag_discussion(discussion_id):
    """Flag a discussion."""
    data = request.get_json()
    reason = data.get("reason", "Flagged by admin")

    discussion = Discussion.query.get_or_404(discussion_id)
    discussion.is_flagged = True
    discussion.flag_reason = reason
    discussion.status = "Flagged"

    log = SystemLog(
        level="WARN",
        message=f"Discussion flagged: {discussion.title}",
        source="discussions.py",
        admin_id=get_jwt_identity(),
        metadata={"discussion_id": discussion_id, "reason": reason}
    )
    db.session.add(log)
    db.session.commit()

    return jsonify({"data": discussion.to_dict(), "message": "Discussion flagged successfully"}), 200


@discussions_bp.route("/<int:discussion_id>/unflag", methods=["POST"])
@jwt_required()
@role_required("admin")
def unflag_discussion(discussion_id):
    """Unflag a discussion."""
    discussion = Discussion.query.get_or_404(discussion_id)
    discussion.is_flagged = False
    discussion.flag_reason = None
    discussion.status = "Clear"

    log = SystemLog(
        level="INFO",
        message=f"Discussion unflagged: {discussion.title}",
        source="discussions.py",
        admin_id=get_jwt_identity(),
        metadata={"discussion_id": discussion_id}
    )
    db.session.add(log)
    db.session.commit()

    return jsonify({"data": discussion.to_dict(), "message": "Discussion unflagged successfully"}), 200


@discussions_bp.route("/stats", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_discussion_stats():
    """Get discussion statistics."""
    total = Discussion.query.count()
    clear = Discussion.query.filter_by(status="Clear").count()
    flagged = Discussion.query.filter_by(is_flagged=True).count()

    return jsonify({
        "total": total,
        "clear": clear,
        "flagged": flagged,
    }), 200
