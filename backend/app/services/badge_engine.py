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
from app.models.module import Module
from app.models.progress import Progress
from app.models.resource import Resource
from app.models.user import User
from app.models.user_badge import UserBadge
from app.services.notification_service import notify


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

    notify(user_id, f'You earned the "{badge_name}" badge!', type="success")


def check_and_award_badges(user_id):
    """Award every badge currently earned and return the new badge names."""
    before = {
        badge.name
        for badge in Badge.query.join(UserBadge).filter(UserBadge.user_id == user_id).all()
    }

    published_count = Resource.query.filter_by(
        contributor_id=user_id, status="Published"
    ).count()
    completed_modules = Progress.query.filter_by(
        user_id=user_id, status="completed"
    ).filter(Progress.module_id.isnot(None)).count()
    perfect_quizzes = Progress.query.filter(
        Progress.user_id == user_id,
        Progress.status == "completed",
        Progress.module_id.isnot(None),
        Progress.score == 100,
    ).count()

    if completed_modules >= 1:
        _award_badge(user_id, "Spark Ignited")
    if perfect_quizzes >= 5:
        _award_badge(user_id, "Quiz Master")
    if published_count >= 5:
        _award_badge(user_id, "Contributor")
    if published_count >= 20:
        _award_badge(user_id, "Prolific Creator")

    user = User.query.get(user_id)
    if user and user.streak_days >= 7:
        _award_badge(user_id, "Streak Keeper")
    if user and user.xp_total >= 5000:
        _award_badge(user_id, "Rising Star")

    # A path is complete when every module in it has a completed progress row.
    if completed_modules:
        for path in {progress.learning_path_id for progress in Progress.query.filter_by(user_id=user_id, status="completed").filter(Progress.module_id.isnot(None)).all()}:
            module_count = Progress.query.filter_by(
                user_id=user_id, learning_path_id=path, status="completed"
            ).filter(Progress.module_id.isnot(None)).count()
            if module_count == Module.query.filter_by(learning_path_id=path).count():
                _award_badge(user_id, "Pathfinder")

    after = {
        badge.name
        for badge in Badge.query.join(UserBadge).filter(UserBadge.user_id == user_id).all()
    }
    return sorted(after - before)