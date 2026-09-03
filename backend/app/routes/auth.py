from flask import Blueprint, request
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
from app.utils.responses import error_response, success_response

auth_bp = Blueprint("auth", __name__)

register_schema = RegisterSchema()
login_schema = LoginSchema()
forgot_password_schema = ForgotPasswordSchema()
reset_password_schema = ResetPasswordSchema()


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
        identity=str(user.id),
        additional_claims={"role": user.role, "name": user.name, "email": user.email},
    )

    return success_response({"token": token, "user": user.to_dict()}, 201)

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        payload = login_schema.load(request.get_json() or {})
    except ValidationError as err:
        return error_response(err.messages, 422)

    user = User.query.filter_by(email=payload["email"]).first()

    if not user or not user.check_password(payload["password"]):
        return error_response("Incorrect email or password.", 401)

    token = create_access_token(
        identity=str(user.id),
        additional_claims={"role": user.role, "name": user.name, "email": user.email},
    )

    return success_response({"token": token, "user": user.to_dict()})

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    try:
        payload = forgot_password_schema.load(request.get_json() or {})
    except ValidationError as err:
        return error_response(err.messages, 422)

    user = User.query.filter_by(email=payload["email"]).first()

    # Always respond the same way whether or not the email exists — this
    # prevents leaking which emails are registered, a standard requirement
    # for "forgot password" flows.
    if user:
        reset_token = PasswordResetToken(user_id=user.id)
        db.session.add(reset_token)
        db.session.commit()
        send_password_reset_email(user, reset_token.token)

    return success_response({"message": "If that email exists, a reset link has been sent."})

@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    try:
        payload = reset_password_schema.load(request.get_json() or {})
    except ValidationError as err:
        return error_response(err.messages, 422)

    reset_token = PasswordResetToken.query.filter_by(token=payload["token"]).first()

    if not reset_token or not reset_token.is_valid():
        return error_response("This reset link is invalid or has expired.", 400)

    user = User.query.get(reset_token.user_id)
    user.set_password(payload["password"])
    reset_token.used = True

    db.session.commit()

    return success_response({"message": "Password updated successfully."})
