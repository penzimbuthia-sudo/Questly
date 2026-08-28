import secrets
import uuid
from datetime import datetime, timedelta

from app.extensions import db

def generate_uuid():
    return str(uuid.uuid4())


def generate_token():
    return secrets.token_urlsafe(32)