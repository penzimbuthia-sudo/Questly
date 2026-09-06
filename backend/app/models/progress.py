# app/models/progress.py
#
# One table covers two related states, distinguished by module_id:
#   - module_id IS NULL  -> "following" this learning path (enrollment)
#   - module_id IS NOT NULL -> that specific module has been completed
#
# The partial unique indexes below only take effect on Postgres (this
# project's real target per Pipfile's psycopg2-binary); SQLAlchemy simply
# skips postgresql_where on other dialects. Routes also check-then-insert
# defensively so duplicates can't slip in locally on SQLite either.

from datetime import datetime, timezone

from app.extensions import db


class Progress(db.Model):
    __tablename__ = "progress"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    learning_path_id = db.Column(
        db.Integer, db.ForeignKey("learning_paths.id"), nullable=False
    )
    module_id = db.Column(db.Integer, db.ForeignKey("modules.id"), nullable=True)

    status = db.Column(db.String(20), nullable=False, default="following")  # following | completed
    score = db.Column(db.Integer, nullable=True)  # quiz score (%) when completed via a quiz
    completed_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        db.Index(
            "uq_progress_follow",
            "user_id",
            "learning_path_id",
            "module_id",
            unique=True,
            postgresql_where=db.text("module_id IS NULL"),
            sqlite_where=db.text("module_id IS NULL"),
        ),
        db.Index(
            "uq_progress_module_complete",
            "user_id",
            "module_id",
            unique=True,
            postgresql_where=db.text("module_id IS NOT NULL"),
            sqlite_where=db.text("module_id IS NOT NULL"),
        ),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "learning_path_id": self.learning_path_id,
            "module_id": self.module_id,
            "status": self.status,
            "score": self.score,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
        }
