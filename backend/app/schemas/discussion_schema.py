"""
discussion_schema.py - Validation schema for discussions.
"""

from marshmallow import Schema, fields, validate


class DiscussionSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True, validate=validate.Length(min=1, max=200))
    content = fields.String(required=True, validate=validate.Length(min=1))
    author_id = fields.Integer(dump_only=True)
    learning_path_id = fields.Integer(allow_none=True)
    is_flagged = fields.Boolean(dump_only=True)
    flag_reason = fields.String(allow_none=True)
    status = fields.String(dump_only=True)
    comment_count = fields.Integer(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class DiscussionUpdateSchema(Schema):
    title = fields.String(validate=validate.Length(min=1, max=200))
    content = fields.String(validate=validate.Length(min=1))
    learning_path_id = fields.Integer(allow_none=True)
    is_flagged = fields.Boolean()
    flag_reason = fields.String(allow_none=True)
    status = fields.String(validate=validate.OneOf(["Clear", "Flagged", "Pending"]))
