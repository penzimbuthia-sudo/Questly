# app/schemas/learning_path_schema.py

from marshmallow import Schema, fields


class ResourceSummarySchema(Schema):
    id = fields.Int()
    title = fields.Str()
    url = fields.Str(allow_none=True)
    type = fields.Str()


class ModuleSchema(Schema):
    id = fields.Int()
    learning_path_id = fields.Int()
    title = fields.Str()
    order_index = fields.Int()
    xp_value = fields.Int()
    has_quiz = fields.Bool()
    resource = fields.Nested(ResourceSummarySchema, allow_none=True)
    # Only populated when the route annotates modules with the current
    # user's progress; absent (not just null) for anonymous/browse views.
    completed = fields.Bool(dump_default=None)


class LearningPathSchema(Schema):
    """Used for the browse/list view — no module list, keeps payloads small."""

    id = fields.Int()
    title = fields.Str()
    description = fields.Str(allow_none=True)
    category = fields.Str(allow_none=True)
    level = fields.Str()
    xp_reward = fields.Int()
    total_modules = fields.Int()


class LearningPathDetailSchema(LearningPathSchema):
    """Used for the single-path view — includes ordered modules."""

    modules = fields.List(fields.Nested(ModuleSchema))


class FollowedPathSchema(Schema):
    """A path the current user follows, with their progress on it."""

    learning_path = fields.Nested(LearningPathSchema)
    modules_completed = fields.Int()
    total_modules = fields.Int()
    percent = fields.Int()
