"""
resource_schema.py - checks that data coming IN from the frontend
(e.g. someone submitting a new resource) looks correct, before we
try to save it.

This is simpler validation than a full library like Marshmallow
— just plain functions, easy to read for a beginner.
"""

from app.utils.validators import is_allowed_status

ALLOWED_TYPES = ["Video", "Article", "Tutorial"]
ALLOWED_STATUSES = ["Published", "Pending", "Rejected"]


def validate_resource_input(data):
    """
    Checks the dictionary `data` (usually straight from
    request.get_json()) has everything needed to create a
    resource.

    Returns a list of error messages. An empty list means
    everything looks good.
    """
    errors = []

    if not data.get("title", "").strip():
        errors.append("Title is required.")

    if data.get("type") not in ALLOWED_TYPES:
        errors.append(f"Type must be one of: {', '.join(ALLOWED_TYPES)}.")

    return errors


def validate_status_update(status):
    """Checks a status value is one Admin/Contributor is allowed to set."""
    if not is_allowed_status(status, ALLOWED_STATUSES):
        return f"Status must be one of: {', '.join(ALLOWED_STATUSES)}."
    return None