"""
gamification.py - the shared blueprint for XP, badges, challenges,
and the leaderboard. Used by ALL THREE roles.
"""

from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity

from app.extensions import db
from app.models.badge import Badge
from app.models.challenge import Challenge
from app.models.user_badge import UserBadge
from app.schemas.challenge_schema import validate_challenge_input
from app.services.leaderboard_service import get_leaderboard
from app.utils.decorators import jwt_required_custom, role_required
from app.utils.responses import error_response, success_response

gamification_bp = Blueprint("gamification", __name__, url_prefix="/gamification")


@gamification_bp.route("/challenges", methods=["GET"])
@jwt_required_custom
def get_challenges():
    """Returns every challenge, regardless of status."""
    challenges = Challenge.query.all()
    return success_response(data=[c.to_dict() for c in challenges])


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