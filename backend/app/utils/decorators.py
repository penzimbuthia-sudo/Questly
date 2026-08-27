from functools import wraps

from app.utils.responses import error_response
from flask import g
from flask_jwt_extended import get_jwt, verify_jwt_in_request


def jwt_required_custom(view_function):

    @wraps(view_function)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
        except Exception:  # noqa: BLE001
            return error_response("You must be logged in to do this.", 401)

        return view_function(*args, **kwargs)

    return wrapper


def role_required(required_role):

    def decorator(view_function):
        @wraps(view_function)
        def wrapper(*args, **kwargs):
            claims = get_jwt()  # the data stored inside the JWT
            user_role = claims.get("role")

            if user_role != required_role:
                return error_response(
                    f"This action requires the '{required_role}' role.", 403
                )

            return view_function(*args, **kwargs)

        return wrapper

    return decorator