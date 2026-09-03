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
    # or any blueprint touches the database. Add yours to app/models/__init__.py
    # as you build it, not here.
    #
    # NOTE: must be `from app import models`, NOT `import app.models` — the
    # latter binds the bare name `app` in this function's local scope,
    # silently overwriting the `app = Flask(__name__)` variable above it.
    from app import models  # noqa: F401

    from app.routes.auth import auth_bp
    from app.routes.resources import resources_bp
    from app.routes.gamification import gamification_bp
    from app.routes.contributor import contributor_bp
    from app.routes.users import users_bp
    from app.routes.discussions import discussions_bp
    from app.routes.reports import reports_bp
    from app.routes.admin import admin_bp
    from app.routes.learning_paths import learning_paths_bp
    from app.routes.modules import modules_bp
    from app.routes.quizzes import quizzes_bp
    from app.routes.progress import progress_bp

    # Every blueprint below declares its own url_prefix (all under /api/...)
    # at Blueprint() construction time in its own file — that's the single
    # source of truth for its routes, so nothing is overridden here. The
    # one exception is auth_bp, which historically didn't declare one; it's
    # supplied here instead. VITE_API_URL / api.js's BASE_URL fallback on
    # the frontend must end in /api for any of this to actually connect.
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(resources_bp)
    app.register_blueprint(gamification_bp)
    app.register_blueprint(contributor_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(discussions_bp)
    app.register_blueprint(reports_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(learning_paths_bp)
    app.register_blueprint(modules_bp)
    app.register_blueprint(quizzes_bp)
    app.register_blueprint(progress_bp)

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
