from flask import Flask

from app.config import config_by_name
from app.extensions import cors, db, jwt, mail, migrate
from app.utils.responses import error_response


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
    from app.routes.contributor import contributor_bp
    from app.routes.gamification import gamification_bp
    from app.routes.resources import resources_bp

    # Add each one as it's ready:
    app.register_blueprint(auth_bp, url_prefix="/auth")

    app.register_blueprint(resources_bp, url_prefix="/resources")

    app.register_blueprint(gamification_bp, url_prefix="/gamification")

    app.register_blueprint(contributor_bp, url_prefix="/contributor")

    @app.errorhandler(404)
    def not_found(_e):
        return error_response("Not found", 404)

    @app.errorhandler(500)
    def server_error(_e):
        return error_response("Internal server error", 500)

    return app