from app.extensions import db
from app.models.notification import Notification


def notify(user_id, message, type="info"):
    notification = Notification(user_id=user_id, message=message, type=type)
    db.session.add(notification)
    db.session.commit()
    return notification