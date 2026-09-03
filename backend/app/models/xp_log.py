"""
xp_log.py - a running LEDGER of every XP-earning action.

Instead of just storing one "xp" number on the user and editing
it directly, we keep a row for every single change. This means
we can always answer "why did this user's XP change on this
date?" and it makes the numbers much easier to double-check.
"""

from datetime import datetime

from app.extensions import db


class XPLog(db.Model):
    __tablename__ = "xp_logs"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Can be negative, in case XP ever needs to be taken away
    # (e.g. a resource gets rejected after already being counted).
    amount = db.Column(db.Integer, nullable=False)

    reason = db.Column(db.String(200))  # e.g. "completed module"
    # What triggered this XP award, e.g. ("module", 42) or ("quiz", 7).
    # Optional — lets the leaderboard/activity feed link back to the
    # source without every caller needing to know its exact table.
    source_type = db.Column(db.String(30), nullable=True)
    source_id = db.Column(db.Integer, nullable=True)

    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "amount": self.amount,
            "reason": self.reason,
            "created_at": self.created_at.isoformat(),
        }