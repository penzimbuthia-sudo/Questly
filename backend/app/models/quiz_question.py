# app/models/quiz_question.py

from app.extensions import db

OPTION_KEYS = ("a", "b", "c", "d")


class QuizQuestion(db.Model):
    __tablename__ = "quiz_questions"

    id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey("quizzes.id"), nullable=False)

    prompt = db.Column(db.Text, nullable=False)
    option_a = db.Column(db.String(255), nullable=False)
    option_b = db.Column(db.String(255), nullable=False)
    option_c = db.Column(db.String(255), nullable=True)
    option_d = db.Column(db.String(255), nullable=True)

    # 'a' | 'b' | 'c' | 'd' — graded against this in routes/quizzes.py.
    correct_option = db.Column(db.String(1), nullable=False)
    explanation = db.Column(db.Text, nullable=True)

    def options(self):
        """[(key, text)] for every non-empty option, in order."""
        raw = {"a": self.option_a, "b": self.option_b, "c": self.option_c, "d": self.option_d}
        return [(key, raw[key]) for key in OPTION_KEYS if raw[key]]

    def to_dict(self, reveal_answer=False):
        # Shaped to match the frontend's <QuizQuestion /> component:
        # { id, prompt, options: [{ id, text }] }.
        data = {
            "id": self.id,
            "prompt": self.prompt,
            "options": [{"id": key, "text": text} for key, text in self.options()],
        }
        if reveal_answer:
            data["correct_option"] = self.correct_option
            data["explanation"] = self.explanation
        return data
