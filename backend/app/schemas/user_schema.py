from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    id = fields.String(dump_only=True)
    name = fields.String(required=True, validate=validate.Length(min=1, max=120))
    email = fields.Email(required=True)
    role = fields.String(dump_only=True)
    xp_total = fields.Integer(dump_only=True)
    streak_days = fields.Integer(dump_only=True)

class RegisterSchema(Schema):
    name = fields.String(required=True, validate=validate.Length(min=1, max=120))
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=validate.Length(min=8))
    role = fields.String(
        required=False,
        load_default="learner",
        validate=validate.OneOf(["learner", "contributor"]),
    )

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True)

class ForgotPasswordSchema(Schema):
    email = fields.Email(required=True)


class ResetPasswordSchema(Schema):
    token = fields.String(required=True)
    password = fields.String(required=True, validate=validate.Length(min=8))