import secrets
import uuid
from datetime import datetime, timedelta

from app.extensions import db


def generate_uuid():
    return str(uuid.uuid4())


def generate_token():
    return secrets.token_urlsafe(32)

class PasswordResetToken(db.Model):
    __tablename__ = "password_reset_tokens"

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    token = db.Column(db.String(128), unique=True, nullable=False, default=generate_token, index=True)
    expires_at = db.Column(
        db.DateTime, nullable=False, default=lambda: datetime.now() + timedelta(hours=1)
    )
    used = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    def is_valid(self):
        return not self.used and self.expires_at > datetime.now()