"""
challenge_schema.py - validates challenge data coming in from
Admin (creating/editing a challenge).
"""

ALLOWED_STATUSES = ["Active", "Upcoming", "Ended"]


def validate_challenge_input(data):
    """Checks the dictionary has everything needed to create a challenge."""
    errors = []

    if not data.get("title", "").strip():
        errors.append("Title is required.")

    if data.get("status") and data["status"] not in ALLOWED_STATUSES:
        errors.append(f"Status must be one of: {', '.join(ALLOWED_STATUSES)}.")

    return errors