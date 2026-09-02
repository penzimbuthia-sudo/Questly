"""
badge_engine.py - the "brain" that decides when a user has
earned a badge.

This gets CALLED FROM several other places:
- Learner's progress route, after a module is completed
- Contributor's resource route, after a resource is published
- Admin's challenge management, after a challenge is completed

Rather than each of those places re-writing "check if they
earned a badge" logic, they all call ONE function here:
check_and_award_badges(user_id).
"""

from app.extensions import db
from app.models.badge import Badge
from app.models.resource import Resource
from app.models.user import User
from app.models.user_badge import UserBadge


def _has_badge(user_id, badge_name):
    """Internal helper: has this user already earned this badge?"""
    badge = Badge.query.filter_by(name=badge_name).first()
    if not badge:
        return True  # if the badge doesn't exist yet, treat it as "already handled"

    existing = UserBadge.query.filter_by(user_id=user_id, badge_id=badge.id).first()
    return existing is not None


def _award_badge(user_id, badge_name):
    """Internal helper: gives a user a badge, if they don't already have it."""
    if _has_badge(user_id, badge_name):
        return  # don't award the same badge twice

    badge = Badge.query.filter_by(name=badge_name).first()
    if not badge:
        return  # badge doesn't exist in the database — nothing to award

    new_user_badge = UserBadge(user_id=user_id, badge_id=badge.id)
    db.session.add(new_user_badge)
    db.session.commit()


def check_and_award_badges(user_id):
    """
    The main function everyone calls. Checks EVERY badge rule we
    know about, and awards any the user has now qualified for.

    This function is meant to grow over time — as more badge
    rules get added to the game, they get added here, in one
    place, instead of scattered across every route that could
    trigger a badge.
    """
    published_count = Resource.query.filter_by(
        contributor_id=user_id, status="Published"
    ).count()

    if published_count >= 1:
        _award_badge(user_id, "Spark ignited")

    if published_count >= 20:
        _award_badge(user_id, "Prolific creator")

    user = User.query.get(user_id)
    if user and user.streak_days >= 7:
        _award_badge(user_id, "Streak keeper")

    # More rules get added here as the game grows — e.g. quiz
    # scores, learning path completions, leaderboard position.