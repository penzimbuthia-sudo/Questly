"""
platform_settings.py - a single row holding platform-wide toggles
managed from Admin's Settings page. Always exactly one row — see
get_or_create() below.
"""

from app.extensions import db


class PlatformSettings(db.Model):
    __tablename__ = "platform_settings"

    id = db.Column(db.Integer, primary_key=True)
    review_before_publish = db.Column(db.Boolean, nullable=False, default=True)
    auto_flag = db.Column(db.Boolean, nullable=False, default=True)
    weekly_reset = db.Column(db.Boolean, nullable=False, default=True)
    seasonal_badges = db.Column(db.Boolean, nullable=False, default=False)
    maintenance_mode = db.Column(db.Boolean, nullable=False, default=False)

    @classmethod
    def get_or_create(cls):
        settings = cls.query.first()
        if settings is None:
            settings = cls()
            db.session.add(settings)
            db.session.commit()
        return settings

    def to_dict(self):
        return {
            "reviewBeforePublish": self.review_before_publish,
            "autoFlag": self.auto_flag,
            "weeklyReset": self.weekly_reset,
            "seasonalBadges": self.seasonal_badges,
            "maintenanceMode": self.maintenance_mode,
        }