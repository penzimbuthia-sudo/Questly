# app/schemas/quiz_schema.py

from marshmallow import Schema, fields, validate, ValidationError


class QuizOptionSchema(Schema):
    id = fields.Str()  # 'a' | 'b' | 'c' | 'd'
    text = fields.Str()


class QuizQuestionSchema(Schema):
    """Public-facing shape — never include correct_option here, or a
    learner could read the answer straight out of the network tab."""

    id = fields.Int()
    prompt = fields.Str()
    options = fields.List(fields.Nested(QuizOptionSchema))


class QuizQuestionReviewSchema(QuizQuestionSchema):
    """Post-submission review shape — safe to reveal the answer once the
    quiz has actually been graded."""

    correct_option = fields.Str()
    explanation = fields.Str(allow_none=True)


class QuizSchema(Schema):
    id = fields.Int()
    module_id = fields.Int()
    title = fields.Str()
    pass_score = fields.Int()
    questions = fields.List(fields.Nested(QuizQuestionSchema))


class QuizAnswerSchema(Schema):
    question_id = fields.Int(required=True)
    option_id = fields.Str(required=True, validate=validate.OneOf(["a", "b", "c", "d"]))


class QuizSubmissionSchema(Schema):
    """Validates the incoming payload for POST /modules/<id>/quiz/submit.

    Expected shape:
        { "answers": [ { "question_id": 1, "option_id": "b" }, ... ] }
    """

    answers = fields.List(fields.Nested(QuizAnswerSchema), required=True, validate=validate.Length(min=1))

    def to_answer_map(self, data):
        """{question_id: option_id} — convenient shape for grading."""
        return {a["question_id"]: a["option_id"] for a in data["answers"]}


class QuizResultSchema(Schema):
    score = fields.Int()
    correct_count = fields.Int()
    total_questions = fields.Int()
    pass_score = fields.Int()
    passed = fields.Bool()
    xp_awarded = fields.Int()
    questions = fields.List(fields.Nested(QuizQuestionReviewSchema))
