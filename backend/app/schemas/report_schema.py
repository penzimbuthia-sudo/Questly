"""
report_schema.py - Validation schema for reports.
"""

from marshmallow import Schema, fields, validate


class ReportSchema(Schema):
    id = fields.Integer(dump_only=True)
    content_type = fields.String(
        required=True,
        validate=validate.OneOf(["resource", "discussion", "comment", "path"])
    )
    content_id = fields.Integer(required=True)
    content_title = fields.String(allow_none=True)
    reason = fields.String(required=True, validate=validate.Length(min=1, max=200))
    description = fields.String(allow_none=True)
    reporter_id = fields.Integer(dump_only=True)
    resolver_id = fields.Integer(allow_none=True)
    status = fields.String(dump_only=True)
    resolution_note = fields.String(allow_none=True)
    created_at = fields.DateTime(dump_only=True)
    resolved_at = fields.DateTime(dump_only=True)


class ReportUpdateSchema(Schema):
    status = fields.String(validate=validate.OneOf(["Under review", "Resolved", "Rejected"]))
    resolution_note = fields.String(allow_none=True)
