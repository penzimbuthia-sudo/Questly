"""
users.py - Admin routes for user management.
"""

from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app import db
from app.models.system_log import SystemLog
from app.models.user import User
from app.utils.decorators import role_required

users_bp = Blueprint("users", __name__, url_prefix="/admin/users")


@users_bp.route("/", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_users():
    """Get all users (admin only)."""
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)
    role = request.args.get("role", None)
    status = request.args.get("status", None)

    query = User.query

    if role:
        query = query.filter_by(role=role)
    if status:
        query = query.filter_by(status=status)

    paginated = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        "data": [u.to_dict() for u in paginated.items],
        "meta": {
            "page": page,
            "per_page": per_page,
            "total": paginated.total,
            "pages": paginated.pages,
        }
    }), 200


@users_bp.route("/<int:user_id>/status", methods=["PATCH"])
@jwt_required()
@role_required("admin")
def update_user_status(user_id):
    """Update a user's status (Active/Inactive/Pending)."""
    data = request.get_json()
    if not data or "status" not in data:
        return jsonify({"error": "Status is required"}), 400

    valid_statuses = ["Active", "Inactive", "Pending"]
    if data["status"] not in valid_statuses:
        return jsonify({"error": f"Invalid status. Must be one of: {valid_statuses}"}), 400

    user = User.query.get_or_404(user_id)
    user.status = data["status"]

    log = SystemLog(
        level="INFO",
        message=f"User status updated to {data['status']}",
        source="users.py",
        admin_id=get_jwt_identity(),
        metadata_json={"user_id": user_id, "status": data["status"]}
    )
    db.session.add(log)
    db.session.commit()

    return jsonify({"data": user.to_dict(), "message": "User status updated successfully"}), 200


@users_bp.route("/stats", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_user_stats():
    """Get user statistics."""
    total = User.query.count()
    active = User.query.filter_by(status="Active").count()
    inactive = User.query.filter_by(status="Inactive").count()
    pending = User.query.filter_by(status="Pending").count()

    role_stats = {
        "Admin": User.query.filter_by(role="Admin").count(),
        "Contributor": User.query.filter_by(role="Contributor").count(),
        "Learner": User.query.filter_by(role="Learner").count(),
    }

    return jsonify({
        "total": total,
        "active": active,
        "inactive": inactive,
        "pending": pending,
        "by_role": role_stats,
    }), 200
