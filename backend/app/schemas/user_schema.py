from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.String(dump_only=True)
    name = fields.String(required=True, validate=validate.Length(min=1, max=120))
    email = fields.Email(required=True)
    role = fields.String(dump_only=True)
    xp_total = fields.Integer(dump_only=True)
    streak_days = fields.Integer(dump_only=True)
