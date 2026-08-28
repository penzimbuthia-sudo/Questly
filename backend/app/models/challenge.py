"""
challenge.py - a time-limited goal, like "The 5-Day Builder" or
"Data Science Month".
"""

from app.extensions import db


class Challenge(db.Model):
    __tablename__ = "challenges"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)

    period_start = db.Column(db.DateTime)
    period_end = db.Column(db.DateTime)

    reward_xp = db.Column(db.Integer, default=0)

    # A challenge might award a badge on completion, or might not
    # — that's why this is nullable.
    reward_badge_id = db.Column(db.Integer, db.ForeignKey("badges.id"), nullable=True)

    # "Active" | "Upcoming" | "Ended"
    status = db.Column(db.String(20), default="Upcoming")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "period_start": self.period_start.isoformat() if self.period_start else None,
            "period_end": self.period_end.isoformat() if self.period_end else None,
            "reward_xp": self.reward_xp,
            "reward_badge_id": self.reward_badge_id,
            "status": self.status,
        }