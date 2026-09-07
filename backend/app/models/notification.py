"""
notification.py - in-app notifications shown in the TopBar bell.
Created server-side when something happens a user should know about
(a resource gets approved, a badge is earned, etc.) — see
notification_service.py for the one function everything calls.
"""

from datetime import datetime, timezone

from app.extensions import db


class Notification(db.Model):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(30), nullable=False, default="info")  # info | success | warning
    read = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "message": self.message,
            "type": self.type,
            "read": self.read,
            "created_at": self.created_at.isoformat(),
        }