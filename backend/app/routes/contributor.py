"""
contributor.py - routes specific to the Contributor role that
aren't about resources directly (that's resources.py) — mainly
stats for the Contributor's own dashboard/profile.
"""

from flask import Blueprint
from app.models.resource import Resource
from app.models.user import User
from app.utils.decorators import jwt_required_custom
from app.utils.responses import success_response
from app.services.leaderboard_service import get_user_rank
from flask_jwt_extended import get_jwt_identity

contributor_bp = Blueprint("contributor", __name__, url_prefix="/contributor")


@contributor_bp.route("/me/stats", methods=["GET"])
@jwt_required_custom
def get_my_stats():
    """
    Returns the logged-in contributor's own numbers: xp, level,
    how many resources they've published, total upvotes, and
    their current leaderboard rank.
    """
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    published_resources = Resource.query.filter_by(
        contributor_id=user_id, status="Published"
    ).all()

    total_upvotes = sum(r.upvotes for r in published_resources)
    rank = get_user_rank(user_id, role="contributor")

    return success_response(
        data={
            "xp": user.xp,
            "level": user.level,
            "resources": len(published_resources),
            "upvotes": total_upvotes,
            "rank": rank,
        }
    )