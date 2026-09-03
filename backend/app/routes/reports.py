"""
reports.py - Admin routes for report moderation.
"""

from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.report import Report
from app.models.system_log import SystemLog
from app.schemas.report_schema import ReportUpdateSchema
from app.utils.decorators import role_required
from datetime import datetime, timezone

reports_bp = Blueprint("reports", __name__, url_prefix="/api/reports")


@reports_bp.route("/", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_reports():
    """Get all reports (admin only)."""
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)
    status = request.args.get("status", None)
    content_type = request.args.get("content_type", None)

    query = Report.query

    if status:
        query = query.filter_by(status=status)
    if content_type:
        query = query.filter_by(content_type=content_type)

    paginated = query.order_by(Report.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    return jsonify({
        "data": [r.to_dict() for r in paginated.items],
        "meta": {
            "page": page,
            "per_page": per_page,
            "total": paginated.total,
            "pages": paginated.pages,
        }
    }), 200


@reports_bp.route("/<int:report_id>/resolve", methods=["POST"])
@jwt_required()
@role_required("admin")
def resolve_report(report_id):
    """Resolve a report."""
    data = request.get_json() or {}
    note = data.get("resolution_note", "Report resolved by admin")

    report = Report.query.get_or_404(report_id)
    report.status = "Resolved"
    report.resolution_note = note
    report.resolver_id = get_jwt_identity()
    report.resolved_at = datetime.now(timezone.utc)

    log = SystemLog(
        level="INFO",
        message=f"Report resolved: {report.content_title}",
        source="reports.py",
        admin_id=get_jwt_identity(),
        metadata_json={"report_id": report_id, "content_type": report.content_type}
    )
    db.session.add(log)
    db.session.commit()

    return jsonify({"data": report.to_dict(), "message": "Report resolved successfully"}), 200


@reports_bp.route("/<int:report_id>/reject", methods=["POST"])
@jwt_required()
@role_required("admin")
def reject_report(report_id):
    """Reject a report."""
    data = request.get_json() or {}
    note = data.get("resolution_note", "Report rejected by admin")

    report = Report.query.get_or_404(report_id)
    report.status = "Rejected"
    report.resolution_note = note
    report.resolver_id = get_jwt_identity()
    report.resolved_at = datetime.now(timezone.utc)

    log = SystemLog(
        level="INFO",
        message=f"Report rejected: {report.content_title}",
        source="reports.py",
        admin_id=get_jwt_identity(),
        metadata_json={"report_id": report_id, "content_type": report.content_type}
    )
    db.session.add(log)
    db.session.commit()

    return jsonify({"data": report.to_dict(), "message": "Report rejected successfully"}), 200


@reports_bp.route("/stats", methods=["GET"])
@jwt_required()
@role_required("admin")
def get_report_stats():
    """Get report statistics."""
    total = Report.query.count()
    under_review = Report.query.filter_by(status="Under review").count()
    resolved = Report.query.filter_by(status="Resolved").count()
    rejected = Report.query.filter_by(status="Rejected").count()

    type_stats = {
        "resource": Report.query.filter_by(content_type="resource").count(),
        "discussion": Report.query.filter_by(content_type="discussion").count(),
        "path": Report.query.filter_by(content_type="path").count(),
        "comment": Report.query.filter_by(content_type="comment").count(),
    }

    return jsonify({
        "total": total,
        "under_review": under_review,
        "resolved": resolved,
        "rejected": rejected,
        "by_type": type_stats,
    }), 200
