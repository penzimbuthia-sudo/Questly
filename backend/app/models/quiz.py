# app/models/quiz.py

from datetime import datetime, timezone

from app.extensions import db


class Quiz(db.Model):
    __tablename__ = "quizzes"

    id = db.Column(db.Integer, primary_key=True)
    # One quiz per module (see uselist=False on Module.quiz).
    module_id = db.Column(
        db.Integer, db.ForeignKey("modules.id"), nullable=False, unique=True
    )
    title = db.Column(db.String(200), nullable=False)
    pass_score = db.Column(db.Integer, nullable=False, default=70)  # percent
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    questions = db.relationship(
        "QuizQuestion",
        backref="quiz",
        order_by="QuizQuestion.id",
        cascade="all, delete-orphan",
    )

    def to_dict(self, reveal_answers=False):
        return {
            "id": self.id,
            "module_id": self.module_id,
            "title": self.title,
            "pass_score": self.pass_score,
            "questions": [q.to_dict(reveal_answer=reveal_answers) for q in self.questions],
        }
