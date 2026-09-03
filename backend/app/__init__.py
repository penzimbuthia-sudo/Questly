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

    # Registers every model with SQLAlchemy's metadata before Flask-Migrate
    # or any blueprint touches the database. Add yours to
    # app/models/__init__.py as you build it, not here.
    #
    # NOTE: must be `from app import models`, NOT `import app.models` — the
    # latter binds the bare name `app` in this function's local scope,
    # silently overwriting the `app = Flask(__name__)` variable above it.
    from app import models  # noqa: F401

    from app.routes.auth import auth_bp
    from app.routes.learning_paths import learning_paths_bp
    from app.routes.modules import modules_bp
    from app.routes.quizzes import quizzes_bp
    from app.routes.progress import progress_bp
    from app.routes.resources import resources_bp
    from app.routes.gamification import gamification_bp
    from app.routes.contributor import contributor_bp
    from app.routes.users import users_bp
    from app.routes.discussions import discussions_bp
    from app.routes.reports import reports_bp
    from app.routes.admin import admin_bp

    # IMPORTANT — url_prefix is passed explicitly here for every blueprint,
    # deliberately overriding whatever each blueprint file declares for
    # itself (Flask uses the registration-time value, not the blueprint's
    # own, when both are given). This file has been rewritten several
    # times by different people, each time with a different, inconsistent
    # prefix convention (some bare, some /api/..., some empty relying on
    # full paths in the route decorators) — this is now the ONE place
    # that decides final URLs. The frontend's services/api.js always
    # builds requests as `${VITE_API_URL}${path}` where VITE_API_URL ends
    # in /api, so every route in this app must live under /api for the
    # frontend to ever reach it. Please don't "simplify" this by removing
    # the explicit prefixes in favor of each blueprint's own — that's
    # exactly what broke this repeatedly.
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(learning_paths_bp, url_prefix="/api/learning-paths")
    app.register_blueprint(modules_bp, url_prefix="/api")  # routes already start with /learning-paths or /modules
    app.register_blueprint(quizzes_bp, url_prefix="/api")  # routes already start with /modules
    app.register_blueprint(progress_bp, url_prefix="/api")  # routes already start with /progress or /resources
    app.register_blueprint(resources_bp, url_prefix="/api/resources")
    app.register_blueprint(gamification_bp, url_prefix="/api/gamification")
    app.register_blueprint(contributor_bp, url_prefix="/api/contributor")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(discussions_bp, url_prefix="/api/discussions")
    app.register_blueprint(reports_bp, url_prefix="/api/reports")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")

    # TODO — still empty, no blueprint defined yet:
    #   from app.routes.challenges import challenges_bp   (B)

    @app.get("/api/health")
    def health():
        return {"status": "ok"}, 200

    @app.errorhandler(404)
    def not_found(_e):
        return error_response("Not found", 404)

    @app.errorhandler(500)
    def server_error(_e):
        return error_response("Internal server error", 500)

    return app
