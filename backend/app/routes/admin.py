"""
admin.py - General admin dashboard routes.
"""

from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.discussion import Discussion
from app.models.report import Report
from app.models.system_log import SystemLog
from app.models.resource import Resource
from app.models.learning_path import LearningPath
from app.models.quiz import Quiz
from app.models.badge import Badge
from app.models.challenge import Challenge
from app.utils.decorators import role_required
from sqlalchemy import func
from datetime import datetime, timedelta

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")


@admin_bp.route("/dashboard/stats", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_dashboard_stats():
    """Get all dashboard statistics."""
    week_ago = datetime.now() - timedelta(days=7)

    return jsonify({
        "users": {
            "total": User.query.count(),
            "active": User.query.filter_by(status="Active").count(),
        },
        "content": {
            "resources": Resource.query.count(),
            "learning_paths": LearningPath.query.count(),
            "quizzes": Quiz.query.count(),
            "discussions": Discussion.query.count(),
        },
        "reports": {
            "total": Report.query.count(),
            "pending": Report.query.filter_by(status="Under review").count(),
            "resolved": Report.query.filter_by(status="Resolved").count(),
            "rejected": Report.query.filter_by(status="Rejected").count(),
        },
        "pending_review": {
            "resources": Resource.query.filter_by(status="Pending").count(),
            "learning_paths": LearningPath.query.filter_by(status="Pending").count(),
        },
        "recent_activity": {
            "new_users": User.query.filter(User.created_at >= week_ago).count(),
            "new_discussions": Discussion.query.filter(Discussion.created_at >= week_ago).count(),
        }
    }), 200


@admin_bp.route("/system-logs", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_system_logs():
    """Get system logs with pagination and filtering."""
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)
    level = request.args.get("level", None)
    source = request.args.get("source", None)

    query = SystemLog.query

    if level:
        query = query.filter_by(level=level)
    if source:
        query = query.filter_by(source=source)

    paginated = query.order_by(SystemLog.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    return jsonify({
        "data": [log.to_dict() for log in paginated.items],
        "meta": {
            "page": page,
            "per_page": per_page,
            "total": paginated.total,
            "pages": paginated.pages,
        }
    }), 200


@admin_bp.route("/system-logs/levels", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_log_level_stats():
    """Get system log statistics by level."""
    return jsonify({
        "INFO": SystemLog.query.filter_by(level="INFO").count(),
        "WARN": SystemLog.query.filter_by(level="WARN").count(),
        "ERROR": SystemLog.query.filter_by(level="ERROR").count(),
    }), 200


@admin_bp.route("/role-distribution", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_role_distribution():
    """Get user role distribution."""
    return jsonify({
        "Admin": User.query.filter_by(role="Admin").count(),
        "Contributor": User.query.filter_by(role="Contributor").count(),
        "Learner": User.query.filter_by(role="Learner").count(),
        "total": User.query.count(),
    }), 200


@admin_bp.route("/system-health", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_system_health():
    """Get system health status."""
    return jsonify({
        "reports": {
            "under_review": Report.query.filter_by(status="Under review").count(),
            "resolved": Report.query.filter_by(status="Resolved").count(),
            "rejected": Report.query.filter_by(status="Rejected").count(),
        },
        "content": {
            "resources": Resource.query.count(),
            "learning_paths": LearningPath.query.count(),
        }
    }), 200
