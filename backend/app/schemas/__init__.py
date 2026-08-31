# app/schemas/__init__.py

# Intentionally empty. Import directly from the specific schema module
# you need — e.g. `from app.schemas.user_schema import RegisterSchema` —
# rather than re-exporting everything here. A single bad or mismatched
# import in this file breaks Flask's entire app creation, not just the
# one broken schema, which is what happened here.
#
# The team currently has three different schema conventions in play
# (marshmallow Schema classes, pydantic BaseModel classes, and plain
# validation functions) across different files. That's fine as long as
# each route file imports straight from its own module — don't try to
# force a single unified shape here under deadline pressure.