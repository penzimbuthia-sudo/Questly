"""
gamification.py - the shared blueprint for XP, badges, challenges,
and the leaderboard. Used by ALL THREE roles.
"""

from datetime import date, timedelta

from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity

from app.extensions import db
from app.models.badge import Badge
from app.models.challenge import Challenge
from app.models.challenge_progress import ChallengeProgress
from app.models.user_badge import UserBadge
from app.models.user import User
from app.schemas.challenge_schema import validate_challenge_input
from app.services.leaderboard_service import get_leaderboard
from app.utils.decorators import jwt_required_custom, role_required
from app.utils.responses import error_response, success_response

gamification_bp = Blueprint("gamification", __name__, url_prefix="/gamification")


def _streak_data(user):
    return {
        "streak_days": user.streak_days,
        "streak_last_date": user.streak_last_date.isoformat() if user.streak_last_date else None,
    }


@gamification_bp.route("/streak", methods=["GET"])
@jwt_required_custom
def get_streak():
    user = User.query.get(get_jwt_identity())
    return success_response(data=_streak_data(user))


@gamification_bp.route("/streak/check-in", methods=["POST"])
@jwt_required_custom
def check_in_streak():
    user = User.query.get(get_jwt_identity())
    today = date.today()

    if user.streak_last_date != today:
        if user.streak_last_date == today - timedelta(days=1):
            user.streak_days += 1
        else:
            user.streak_days = 1
        user.streak_last_date = today
        db.session.commit()

    return success_response(data=_streak_data(user), message="Streak checked in.")


@gamification_bp.route("/challenges", methods=["GET"])
@jwt_required_custom
def get_challenges():
    user_id = get_jwt_identity()
    challenges = Challenge.query.all()
    result = []
    for c in challenges:
        data = c.to_dict()
        progress = ChallengeProgress.query.filter_by(
            challenge_id=c.id, user_id=user_id
        ).first()
        data["participants"] = ChallengeProgress.query.filter_by(challenge_id=c.id).count()
        data["joined"] = progress is not None
        data["progress"] = progress.progress if progress else 0
        data["completed"] = progress.completed if progress else False
        result.append(data)
    return success_response(data=result)


@gamification_bp.route("/challenges/<int:challenge_id>/join", methods=["POST"])
@jwt_required_custom
def join_challenge(challenge_id):
    """Enroll the current user in a challenge without duplicating progress."""
    challenge = Challenge.query.get(challenge_id)
    if not challenge:
        return error_response("Challenge not found.", 404)

    user_id = get_jwt_identity()
    progress = ChallengeProgress.query.filter_by(
        challenge_id=challenge_id, user_id=user_id
    ).first()
    if progress is None:
        progress = ChallengeProgress(
            user_id=user_id,
            challenge_id=challenge_id,
            progress=0,
            completed=False,
        )
        db.session.add(progress)
        db.session.commit()

    data = progress.to_dict()
    data["challenge"] = challenge.to_dict()
    data["joined"] = True
    return success_response(data=data, message="Challenge joined.")


@gamification_bp.route("/badges/me", methods=["GET"])
@jwt_required_custom
def get_my_badges():
    """Returns every badge, marking which ones the logged-in user has earned."""
    user_id = get_jwt_identity()
    all_badges = Badge.query.all()
    earned_badge_ids = {
        ub.badge_id for ub in UserBadge.query.filter_by(user_id=user_id).all()
    }

    result = []
    for badge in all_badges:
        badge_data = badge.to_dict()
        badge_data["earned"] = badge.id in earned_badge_ids
        result.append(badge_data)

    return success_response(data=result)


@gamification_bp.route("/leaderboard", methods=["GET"])
@jwt_required_custom
def leaderboard():
    """
    Returns the top users by XP. Accepts an optional ?role=
    query parameter to filter by role, e.g. /leaderboard?role=contributor
    """
    role = request.args.get("role")
    return success_response(data=get_leaderboard(role=role))


@gamification_bp.route("/challenges/<int:challenge_id>", methods=["PATCH"])
@jwt_required_custom
@role_required("admin")
def update_challenge(challenge_id):
    """Admin-only: updates a challenge's details or status."""
    challenge = Challenge.query.get(challenge_id)
    if not challenge:
        return error_response("Challenge not found.", 404)

    data = request.get_json()
    errors = validate_challenge_input(data)
    if errors:
        return error_response(" ".join(errors), 400)

    if "title" in data:
        challenge.title = data["title"]
    if "status" in data:
        challenge.status = data["status"]

    db.session.commit()
    return success_response(data=challenge.to_dict(), message="Challenge updated.")


@gamification_bp.route("/badges/stats", methods=["GET"])
@jwt_required_custom
@role_required("admin")
def get_badge_stats():
    """
    Admin-only: returns every badge along with how many users
    have earned it. This is the function Admin's frontend
    Badges page needs.
    """
    all_badges = Badge.query.all()

    result = []
    for badge in all_badges:
        unlocked_count = UserBadge.query.filter_by(badge_id=badge.id).count()
        badge_data = badge.to_dict()
        badge_data["unlocked_count"] = unlocked_count
        result.append(badge_data)

    return success_response(data=result)