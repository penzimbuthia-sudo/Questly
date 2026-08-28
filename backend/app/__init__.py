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