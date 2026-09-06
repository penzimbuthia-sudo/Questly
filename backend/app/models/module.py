from datetime import datetime, timezone

from app.extensions import db


class Module(db.Model):
    __tablename__ = "modules"

    id = db.Column(db.Integer, primary_key=True)
    learning_path_id = db.Column(
        db.Integer, db.ForeignKey("learning_paths.id"), nullable=False
    )
    # resource_id column removed — a module can hold many resources,
    # via Resource.module_id (see resource.py). See commit message /
    # migration for why this changed from a 1-to-1 to a 1-to-many.

    title = db.Column(db.String(200), nullable=False)
    order_index = db.Column(db.Integer, nullable=False, default=0)
    xp_value = db.Column(db.Integer, nullable=False, default=100)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    resources = db.relationship(
        "Resource",
        backref="module",
        foreign_keys="Resource.module_id",
    )
    quiz = db.relationship(
        "Quiz", backref="module", uselist=False, cascade="all, delete-orphan"
    )
    progress_entries = db.relationship(
        "Progress", backref="module", cascade="all, delete-orphan"
    )

    __table_args__ = (
        db.UniqueConstraint("learning_path_id", "order_index", name="uq_module_path_order"),
    )

    def to_dict(self, viewer_progress=None):
        data = {
            "id": self.id,
            "learning_path_id": self.learning_path_id,
            "title": self.title,
            "order_index": self.order_index,
            "xp_value": self.xp_value,
            "has_quiz": self.quiz is not None,
            "resources": [r.to_dict() for r in self.resources],
        }
        if viewer_progress is not None:
            data["completed"] = viewer_progress
        return data