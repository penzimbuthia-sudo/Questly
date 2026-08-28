from flask import Flask, jsonify

from app.config import config_by_name
from app.extensions import cors, db, jwt, mail, migrate


def create_app(config_name="development"):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    cors.init_app(app, resources={r"/*": {"origins": app.config["FRONTEND_URL"]}})

    # Import models here (not at module load time) so Flask-Migrate can
    # discover every table via db.metadata once all five people's model
    # files exist, without any circular-import ordering issues.
    from app.models.password_reset_token import PasswordResetToken  # noqa: F401
    from app.models.user import User  # noqa: F401
    from app.routes.auth import auth_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")

    @app.errorhandler(404)
    def not_found(_e):
        return jsonify({"success": False, "error": "Not found"}), 404

    @app.errorhandler(500)
    def server_error(_e):
        return jsonify({"success": False, "error": "Internal server error"}), 500

    return app