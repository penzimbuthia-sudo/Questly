from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from marshmallow import ValidationError

from app.extensions import db
from app.models.password_reset_token import PasswordResetToken
from app.models.user import User
from app.schemas.user_schema import (
    ForgotPasswordSchema,
    LoginSchema,
    RegisterSchema,
    ResetPasswordSchema,
)
from app.services.email_service import send_password_reset_email

auth_bp = Blueprint("auth", __name__)

register_schema = RegisterSchema()
login_schema = LoginSchema()
forgot_password_schema = ForgotPasswordSchema()
reset_password_schema = ResetPasswordSchema()

def success_response(data=None, status=200):
    return jsonify({"success": True, "data": data}), status


def error_response(message, status=400):
    return jsonify({"success": False, "error": message}), status

@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        payload = register_schema.load(request.get_json() or {})
    except ValidationError as err:
        return error_response(err.messages, 422)

    if User.query.filter_by(email=payload["email"]).first():
        return error_response("An account with this email already exists.", 409)

    user = User(name=payload["name"], email=payload["email"], role=payload["role"])
    user.set_password(payload["password"])

    db.session.add(user)
    db.session.commit()

    token = create_access_token(
        identity=user.id,
        additional_claims={"role": user.role, "name": user.name, "email": user.email},
    )

    return success_response({"token": token, "user": user.to_dict()}, 201)
