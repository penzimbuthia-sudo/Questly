"""
challenge_progress.py - tracks how far ALONG one specific user is
in one specific challenge. Separate from Challenge itself, since
many users can be at different points in the same challenge at
the same time.
"""

from app.extensions import db


class ChallengeProgress(db.Model):
    __tablename__ = "challenge_progress"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    challenge_id = db.Column(db.String(36), db.ForeignKey("challenges.id"), nullable=False)

    progress = db.Column(db.Integer, default=0)  # e.g. 3 (out of a goal of 5)
    completed = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "challenge_id": self.challenge_id,
            "progress": self.progress,
            "completed": self.completed,
        }