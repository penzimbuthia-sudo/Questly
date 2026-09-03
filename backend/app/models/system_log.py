"""
system_log.py - System log model for admin audit trail.
"""
from datetime import datetime, timezone

from app.extensions import db


class SystemLog(db.Model):
    __tablename__ = "system_logs"
    id = db.Column(db.Integer, primary_key=True)

    # Log details
    level = db.Column(db.String(20), nullable=False)  # "INFO" | "WARN" | "ERROR"
    message = db.Column(db.Text, nullable=False)
    source = db.Column(db.String(100), nullable=True)

    # Admin who performed the action (Person A's User model)
    admin_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    # Additional context
    ip_address = db.Column(db.String(45), nullable=True)
    user_agent = db.Column(db.String(200), nullable=True)
<<<<<<< HEAD
    metadata_json = db.Column("metadata", db.JSON, nullable=True)
=======
    extra_data = db.Column(db.JSON, nullable=True)  # renamed from "metadata"
>>>>>>> f5efc1d411f06c517868a81af5817bca358fcc60

    # Timestamp
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationship
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
<<<<<<< HEAD
            "metadata": self.metadata_json,
=======
            "extra_data": self.extra_data,  # renamed from "metadata"
>>>>>>> f5efc1d411f06c517868a81af5817bca358fcc60
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }