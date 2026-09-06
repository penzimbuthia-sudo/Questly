import re

# A simple pattern for "does this look like an email address".
# It's not perfect, but it catches the obvious mistakes.
EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def is_valid_email(email):
    """Returns True if `email` looks like a real email address."""
    if not email:
        return False
    return bool(EMAIL_PATTERN.match(email))


def is_valid_password(password, min_length=8):
    """
    Returns True if `password` is long enough to be reasonably
    secure. Keeping this simple on purpose — a beginner-friendly
    rule is easier to explain to users than a complex one.
    """
    if not password:
        return False
    return len(password) >= min_length


def is_allowed_status(status, allowed_statuses):
    """
    Checks that `status` is one of the values we actually expect.

    Example:
        is_allowed_status("Published", ["Published", "Pending", "Rejected"])
        -> True

        is_allowed_status("Deleted", ["Published", "Pending", "Rejected"])
        -> False

    This is what stops someone from sending a made-up status
    value through the API that the frontend doesn't know how to
    display.
    """
    return status in allowed_statuses