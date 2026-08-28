from datetime import datetime, timezone
from app.extensions import db


class LearningPath(db.Model):
    __tablename__ = "learning_paths"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(50), nullable=True)  # e.g. Frontend, Backend, Data science
    level = db.Column(db.String(20), nullable=False, default="Beginner")  # Beginner | Intermediate | Advanced
    xp_reward = db.Column(db.Integer, nullable=False, default=0)
    contributor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    modules = db.relationship(
        "Module",
        backref="learning_path",
        order_by="Module.order_index",
        cascade="all, delete-orphan",
    )
    progress_entries = db.relationship(
        "Progress", backref="learning_path", cascade="all, delete-orphan"
    )

    @property
    def total_modules(self):
        return len(self.modules)

    def to_dict(self, include_modules=False):
        data = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "level": self.level,
            "xp_reward": self.xp_reward,
            "total_modules": self.total_modules,
        }
        if include_modules:
            data["modules"] = [m.to_dict() for m in self.modules]
        return data
