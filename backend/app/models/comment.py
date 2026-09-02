"""
comment.py - Comment model for replies to discussions.
"""

from datetime import datetime, timezone
from app.extensions import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    # Relationships to User (Person A) and Discussion (E's model)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    discussion_id = db.Column(db.Integer, db.ForeignKey("discussions.id"), nullable=False)

    # Moderation fields
    is_flagged = db.Column(db.Boolean, default=False)
    flag_reason = db.Column(db.String(100), nullable=True)

    # Timestamps
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationship
    author = db.relationship("User", backref="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "author_id": self.author_id,
            "discussion_id": self.discussion_id,
            "is_flagged": self.is_flagged,
            "flag_reason": self.flag_reason,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
