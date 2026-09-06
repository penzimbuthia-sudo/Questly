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


@users_bp.route("/", methods=["POST"])
@jwt_required()
@role_required("admin")
def create_user():
    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")
    role = data.get("role", "learner")

    if not name or not email or not password:
        return jsonify({"error": "name, email, and password are required"}), 400
    if len(password) < 8:
        return jsonify({"error": "password must be at least 8 characters"}), 400
    if role not in ["learner", "contributor", "admin"]:
        return jsonify({"error": "invalid role"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "An account with this email already exists."}), 409

    user = User(name=name, email=email, role=role, status=data.get("status", "Active"))
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"data": user.to_dict(), "message": "User created successfully"}), 201


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


@users_bp.route("/<user_id>/status", methods=["PATCH"])
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


@users_bp.route("/<user_id>", methods=["PATCH"])
@jwt_required()
@role_required("admin")
def update_user(user_id):
    data = request.get_json(silent=True) or {}
    user = User.query.get_or_404(user_id)

    if "name" in data:
        name = str(data["name"]).strip()
        if not name:
            return jsonify({"error": "name cannot be empty"}), 400
        user.name = name
    if "email" in data:
        email = str(data["email"]).strip().lower()
        if User.query.filter(User.email == email, User.id != user.id).first():
            return jsonify({"error": "An account with this email already exists."}), 409
        user.email = email
    if "role" in data:
        if data["role"] not in ["learner", "contributor", "admin"]:
            return jsonify({"error": "invalid role"}), 400
        user.role = data["role"]
    if "status" in data:
        if data["status"] not in ["Active", "Inactive", "Pending"]:
            return jsonify({"error": "invalid status"}), 400
        user.status = data["status"]
    if data.get("password"):
        if len(data["password"]) < 8:
            return jsonify({"error": "password must be at least 8 characters"}), 400
        user.set_password(data["password"])

    db.session.commit()
    return jsonify({"data": user.to_dict(), "message": "User updated successfully"}), 200


@users_bp.route("/<user_id>", methods=["DELETE"])
@jwt_required()
@role_required("admin")
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    if user.id == get_jwt_identity():
        return jsonify({"error": "You cannot delete your own account"}), 400
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200


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
        "Admin": User.query.filter_by(role="admin").count(),
        "Contributor": User.query.filter_by(role="contributor").count(),
        "Learner": User.query.filter_by(role="learner").count(),
    }

    return jsonify({
        "total": total,
        "active": active,
        "inactive": inactive,
        "pending": pending,
        "by_role": role_stats,
    }), 200
