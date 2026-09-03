"""
user_badge.py - a JOIN table connecting users to the badges
they've earned. One row = "this user earned this badge on this
date."
"""

from datetime import datetime

from app.extensions import db


class UserBadge(db.Model):
    __tablename__ = "user_badges"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    badge_id = db.Column(db.Integer, db.ForeignKey("badges.id"), nullable=False)
    earned_at = db.Column(db.DateTime, default=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "badge_id": self.badge_id,
            "earned_at": self.earned_at.isoformat(),
        }