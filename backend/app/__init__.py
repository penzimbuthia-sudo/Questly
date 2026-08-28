from flask import Flask, jsonify

from app.config import config_by_name
from app.extensions import cors, db, jwt, mail, migrate

