"""
helpers.py - small, general-purpose functions that don't belong
to any one feature. If several people need the same small piece
of logic, it goes here instead of being copy-pasted everywhere.
"""

import secrets
from datetime import datetime, timedelta


def generate_token(length=32):
    """
    Creates a random, hard-to-guess string. Used for things like
    password reset tokens.

    `secrets` (not `random`) is used here on purpose — it's
    built specifically for security-sensitive random values.
    """
    return secrets.token_urlsafe(length)


def minutes_from_now(minutes):
    """
    Returns a datetime `minutes` minutes in the future.

    Example: minutes_from_now(30) gives you a timestamp for
    "30 minutes from right now" — useful for setting an
    expires_at value on a password reset token.
    """
    return datetime.now + timedelta(minutes=minutes)  # noqa: DTZ003


def is_expired(expires_at):
    """
    Returns True if `expires_at` (a datetime) is already in the
    past — meaning whatever it was protecting (like a reset
    token) is no longer valid.
    """
    return datetime.now > expires_at  # noqa: DTZ003


def paginate(query, page=1, per_page=20):
    """
    Cuts a long list of database results down into one "page" at
    a time, instead of sending back everything at once.

    query: a SQLAlchemy query (not yet run)
    page: which page the user wants, starting at 1
    per_page: how many results per page

    Returns the actual list of results for that page.
    """
    return query.offset((page - 1) * per_page).limit(per_page).all()