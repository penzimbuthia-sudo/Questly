
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from app.config import config_by_name
from app.extensions import db, jwt, mail, migrate
from app.utils.responses import error_response

load_dotenv()

def create_app(config_name="development"):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)

    # CORS configuration - Allow specific origins for development
    CORS(app,
         origins=['http://localhost:5173', 'http://127.0.0.1:5173'],
         allow_headers=['Content-Type', 'Authorization'],
         methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
         supports_credentials=True)

    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    from app.routes.learning_paths import api_learning_paths_bp, learning_paths_bp
    app.register_blueprint(learning_paths_bp)
    app.register_blueprint(api_learning_paths_bp)

    from app.routes.quizzes import quizzes_bp
    app.register_blueprint(quizzes_bp)

    from app.routes.progress import progress_bp
    app.register_blueprint(progress_bp)

    from app.routes.resources import api_resources_bp, resources_bp
    app.register_blueprint(resources_bp)
    app.register_blueprint(api_resources_bp)

    from app.routes.gamification import gamification_bp
    app.register_blueprint(gamification_bp)

    from app.routes.notifications import notifications_bp
    app.register_blueprint(notifications_bp)

    from app.routes.contributor import contributor_bp
    app.register_blueprint(contributor_bp)

    from app.routes.admin import admin_bp, api_admin_resources_bp
    app.register_blueprint(admin_bp)
    app.register_blueprint(api_admin_resources_bp)

    @app.errorhandler(404)
    def not_found(_e):
        return error_response("Not found", 404)

    @app.errorhandler(500)
    def server_error(_e):
        return error_response("Internal server error", 500)

    return app
