"""
badge.py - defines the badges that exist in Questly, like
"Spark ignited" or "Streak keeper". This is the CATALOG of
badges, not who's earned them — that's a separate table
(user_badges), since many users can earn the same badge.
"""

from app.extensions import db


class Badge(db.Model):
    __tablename__ = "badges"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    criteria = db.Column(db.String(200))  # human-readable, e.g. "Publish 20 resources"
    icon_key = db.Column(db.String(50))   # matches a lucide-react icon name
    xp_reward = db.Column(db.Integer, default=50)
    color = db.Column(db.String(20), default="#FFD700")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "criteria": self.criteria,
            "icon_key": self.icon_key,
            "xp_reward": self.xp_reward,
            "color": self.color,
        }
