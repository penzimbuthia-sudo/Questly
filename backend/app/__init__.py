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
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    from app.routes.learning_paths import learning_paths_bp
    app.register_blueprint(learning_paths_bp)

    from app.routes.quizzes import quizzes_bp
    app.register_blueprint(quizzes_bp)

    from app.routes.progress import progress_bp
    app.register_blueprint(progress_bp)

    from app.routes.resources import resources_bp
    app.register_blueprint(resources_bp)

    from app.routes.gamification import gamification_bp
    app.register_blueprint(gamification_bp)

    from app.routes.contributor import contributor_bp
    app.register_blueprint(contributor_bp)

    @app.errorhandler(404)
    def not_found(_e):
        return error_response("Not found", 404)

    @app.errorhandler(500)
    def server_error(_e):
        return error_response("Internal server error", 500)

    return app