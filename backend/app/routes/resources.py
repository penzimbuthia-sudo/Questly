"""
resources.py - routes for Contributors managing their own resources.
"""

from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity

from app.extensions import db
from app.models.learning_path import LearningPath
from app.models.resource import Resource
from app.schemas.resource_schema import validate_resource_input
from app.services.badge_engine import check_and_award_badges
from app.services import leaderboard_service
from app.utils.decorators import jwt_required_custom, role_required
from app.utils.responses import error_response, success_response

resources_bp = Blueprint("resources", __name__, url_prefix="/contributor")
api_resources_bp = Blueprint("api_resources", __name__, url_prefix="/api/resources")


@api_resources_bp.route("", methods=["GET"])
@jwt_required_custom
def list_published_resources():
    """List resources for learners, optionally filtered by status and type."""
    status = request.args.get("status", "Published").lower()
    status_aliases = {"approved": "Published", "published": "Published", "pending": "Pending", "rejected": "Rejected"}
    if status not in status_aliases:
        return error_response("status must be approved, published, pending, or rejected.", 400)

    resource_type = request.args.get("type")
    query = Resource.query.filter_by(status=status_aliases[status])
    if resource_type:
        query = query.filter_by(type=resource_type)
    resources = query.order_by(Resource.created_at.desc()).all()
    return success_response(data=[resource.to_dict() for resource in resources])


@api_resources_bp.route("/mine", methods=["GET"])
@jwt_required_custom
@role_required("contributor")
def list_my_resources_api():
    return get_my_resources()


@api_resources_bp.route("", methods=["POST"])
@jwt_required_custom
@role_required("contributor")
def create_resource_api():
    return create_resource()


@api_resources_bp.route("/<int:resource_id>/upvote", methods=["POST"])
@jwt_required_custom
@role_required("learner")
def upvote_resource_api(resource_id):
    return upvote_resource(resource_id)


@resources_bp.route("/resources", methods=["GET"])
@jwt_required_custom
@role_required("contributor")
def get_my_resources():
    """Returns every resource the logged-in contributor has submitted."""
    user_id = get_jwt_identity()
    resources = Resource.query.filter_by(contributor_id=user_id).all()
    return success_response(data=[r.to_dict() for r in resources])


@resources_bp.route("/resources/mine", methods=["GET"])
@jwt_required_custom
@role_required("contributor")
def get_my_resources_canonical():
    """Canonical contributor-owned resource listing endpoint."""
    return get_my_resources()


@resources_bp.route("/resources", methods=["POST"])
@jwt_required_custom
@role_required("contributor")
def create_resource():
    """Submits a new resource. Starts as 'Pending' until an Admin approves it."""
    data = request.get_json(silent=True) or {}

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

    leaderboard_service.award_xp(
        user_id=user_id,
        amount=25,
        reason=f'Submitted resource "{new_resource.title}"',
        source_type="resource",
        source_id=new_resource.id,
    )
    badges_awarded = check_and_award_badges(user_id)

    response_data = new_resource.to_dict()
    response_data["xp_awarded"] = 25
    response_data["badges_awarded"] = badges_awarded
    return success_response(data=response_data, message="Resource submitted for review.", status=201)


@resources_bp.route("/resources/<int:resource_id>/upvote", methods=["POST"])
@jwt_required_custom
@role_required("learner")
def upvote_resource(resource_id):
    """Add one learner upvote to a published resource."""
    resource = Resource.query.filter_by(id=resource_id, status="Published").first_or_404()
    resource.upvotes = (resource.upvotes or 0) + 1
    db.session.commit()
    return success_response(data={"resource_id": resource.id, "upvotes": resource.upvotes})


@resources_bp.route("/learning-paths", methods=["POST"])
@jwt_required_custom
@role_required("contributor")
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
    leaderboard_service.award_xp(
        user_id=user_id,
        amount=50,
        reason=f'Submitted learning path "{path.title}"',
        source_type="learning_path",
        source_id=path.id,
    )
    data = path.to_dict()
    data["xp_awarded"] = 50
    data["badges_awarded"] = check_and_award_badges(user_id)
    return success_response(data=data, message="Learning path submitted for review.", status=201)