from datetime import datetime, timezone
from app.extensions import db

class SystemLog(db.Model):
    __tablename__ = "system_logs"

    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.String(20), nullable=False)
    message = db.Column(db.Text, nullable=False)
    source = db.Column(db.String(100), nullable=True)
    admin_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    ip_address = db.Column(db.String(45), nullable=True)
    user_agent = db.Column(db.String(200), nullable=True)
    log_metadata = db.Column(db.JSON, nullable=True)  # Added this column
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    admin = db.relationship("User", backref="logs")

    def to_dict(self):
        return {
            "id": self.id,
            "level": self.level,
            "message": self.message,
            "source": self.source,
            "admin_id": self.admin_id,
            "ip_address": self.ip_address,
            "user_agent": self.user_agent,
            "log_metadata": self.log_metadata,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
