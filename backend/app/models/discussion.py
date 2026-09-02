"""
discussion.py - Discussion model for community threads under learning paths.
"""

from datetime import datetime, timezone
from app.extensions import db


class Discussion(db.Model):
    __tablename__ = "discussions"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)

    # Relationship to User (Person A's model)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    learning_path_id = db.Column(db.Integer, db.ForeignKey("learning_paths.id"), nullable=True)

    # Moderation fields
    is_flagged = db.Column(db.Boolean, default=False)
    flag_reason = db.Column(db.String(100), nullable=True)

    # Status: "Clear" | "Flagged" | "Pending"
    status = db.Column(db.String(20), default="Clear")

    # Timestamps
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    author = db.relationship("User", backref="discussions")
    comments = db.relationship(
        "Comment",
        backref="discussion",
        cascade="all, delete-orphan",
        lazy="dynamic"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "author_id": self.author_id,
            "learning_path_id": self.learning_path_id,
            "is_flagged": self.is_flagged,
            "flag_reason": self.flag_reason,
            "status": self.status,
            "comment_count": self.comments.count(),
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
