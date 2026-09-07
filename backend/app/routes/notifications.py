from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.extensions import db
from app.models.notification import Notification

notifications_bp = Blueprint("notifications", __name__, url_prefix="/notifications")


@notifications_bp.route("", methods=["GET"])
@jwt_required()
def get_my_notifications():
    user_id = get_jwt_identity()
    items = (
        Notification.query.filter_by(user_id=user_id)
        .order_by(Notification.created_at.desc())
        .limit(20)
        .all()
    )
    return jsonify({"data": [n.to_dict() for n in items]}), 200


@notifications_bp.route("/<int:notification_id>/read", methods=["POST"])
@jwt_required()
def mark_read(notification_id):
    notification = Notification.query.get_or_404(notification_id)
    if notification.user_id != get_jwt_identity():
        return jsonify({"error": "Not your notification."}), 403
    notification.read = True
    db.session.commit()
    return jsonify({"data": notification.to_dict()}), 200


@notifications_bp.route("/read-all", methods=["POST"])
@jwt_required()
def mark_all_read():
    user_id = get_jwt_identity()
    Notification.query.filter_by(user_id=user_id, read=False).update({"read": True})
    db.session.commit()
    return jsonify({"message": "All notifications marked read."}), 200