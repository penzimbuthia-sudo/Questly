"""
resources.py - routes for Contributors managing their own resources.
"""

from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity

from app.extensions import db
from app.models.resource import Resource
from app.schemas.resource_schema import validate_resource_input
from app.services.badge_engine import check_and_award_badges
from app.utils.decorators import jwt_required_custom
from app.utils.responses import error_response, success_response
from app.models.learning_path import LearningPath

resources_bp = Blueprint("resources", __name__, url_prefix="/contributor")


@resources_bp.route("/resources", methods=["GET"])
@jwt_required_custom
def get_my_resources():
    """Returns every resource the logged-in contributor has submitted."""
    user_id = get_jwt_identity()
    resources = Resource.query.filter_by(contributor_id=user_id).all()
    return success_response(data=[r.to_dict() for r in resources])


@resources_bp.route("/resources", methods=["POST"])
@jwt_required_custom
def create_resource():
    """Submits a new resource. Starts as 'Pending' until an Admin approves it."""
    data = request.get_json()

    errors = validate_resource_input(data)
    if errors:
        return error_response(" ".join(errors), 400)

    user_id = get_jwt_identity()

    new_resource = Resource(
        contributor_id=user_id,
        title=data["title"],
        type=data["type"],
        url=data.get("url"),
        description=data.get("description"),
        status="Pending",
    )

    db.session.add(new_resource)
    db.session.commit()

    check_and_award_badges(user_id)

    return success_response(data=new_resource.to_dict(), message="Resource submitted for review.", status=201)


@resources_bp.route("/learning-paths", methods=["POST"])
@jwt_required_custom
def create_learning_path():
    """Contributor creates a new learning path — starts 'Pending' until
    Admin approves it, same lifecycle as a Resource."""
    data = request.get_json() or {}
    if not data.get("title", "").strip():
        return error_response("Title is required.", 400)

    user_id = get_jwt_identity()
    path = LearningPath(
        title=data["title"],
        description=data.get("description"),
        category=data.get("category"),
        level=data.get("level", "Beginner"),
        xp_reward=data.get("xp_reward", 0),
        contributor_id=user_id,
        status="Pending",
    )
    db.session.add(path)
    db.session.commit()
    return success_response(data=path.to_dict(), message="Learning path submitted for review.", status_code=201)