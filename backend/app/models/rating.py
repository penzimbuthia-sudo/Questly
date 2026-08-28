# app/models/rating.py

from datetime import datetime, timezone
from app.extensions import db


class Rating(db.Model):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    resource_id = db.Column(db.Integer, db.ForeignKey("resources.id"), nullable=False)

    score = db.Column(db.Integer, nullable=False)  # 1-5
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    # One rating per user per resource — re-rating updates it (see routes),
    # it doesn't create a second row.
    __table_args__ = (
        db.UniqueConstraint("user_id", "resource_id", name="uq_rating_user_resource"),
        db.CheckConstraint("score >= 1 AND score <= 5", name="ck_rating_score_range"),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "resource_id": self.resource_id,
            "user_id": self.user_id,
            "score": self.score,
            "comment": self.comment,
        }
