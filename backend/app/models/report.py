"""
report.py - Report model for flagged content.
"""

from datetime import datetime, timezone

from app.extensions import db


class Report(db.Model):
    __tablename__ = "reports"

    id = db.Column(db.Integer, primary_key=True)

    # Reported content metadata
    content_type = db.Column(db.String(50), nullable=False)  # "resource" | "discussion" | "comment" | "path"
    content_id = db.Column(db.Integer, nullable=False)
    content_title = db.Column(db.String(200), nullable=True)

    # Report details
    reason = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)

    # Relationships to User (Person A)
    reporter_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    resolver_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=True)

    # Status: "Under review" | "Resolved" | "Rejected"
    status = db.Column(db.String(20), default="Under review")
    resolution_note = db.Column(db.Text, nullable=True)

    # Timestamps
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    resolved_at = db.Column(db.DateTime, nullable=True)

    # Relationships
    reporter = db.relationship("User", foreign_keys=[reporter_id], backref="reports_submitted")
    resolver = db.relationship("User", foreign_keys=[resolver_id], backref="reports_resolved")

    def to_dict(self):
        return {
            "id": self.id,
            "content_type": self.content_type,
            "content_id": self.content_id,
            "content_title": self.content_title,
            "reason": self.reason,
            "description": self.description,
            "reporter_id": self.reporter_id,
            "resolver_id": self.resolver_id,
            "status": self.status,
            "resolution_note": self.resolution_note,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "resolved_at": self.resolved_at.isoformat() if self.resolved_at else None,
        }
