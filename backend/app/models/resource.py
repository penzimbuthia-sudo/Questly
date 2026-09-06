"""
resource.py - a piece of content a Contributor shares: a video,
article, or tutorial.
"""

from datetime import datetime

from app.extensions import db


class Resource(db.Model):
    __tablename__ = "resources"

    id = db.Column(db.Integer, primary_key=True)

    # A resource can exist before it's attached to a module, so
    # this is allowed to be empty (nullable=True).
    module_id = db.Column(db.Integer, db.ForeignKey("modules.id"), nullable=True)

    contributor_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)

    title = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(20), nullable=False)  # "Video" | "Article" | "Tutorial"
    url = db.Column(db.String(500))
    description = db.Column(db.Text)

    views = db.Column(db.Integer, default=0)
    upvotes = db.Column(db.Integer, default=0)

    # "Published" | "Pending" | "Rejected"
    status = db.Column(db.String(20), default="Pending")

    created_at = db.Column(db.DateTime, default=datetime.now)

    def to_dict(self):
        """
        Turns this database row into a plain dictionary, so Flask
        can convert it to JSON. Every model gets one of these —
        it's what the schema files will eventually replace with
        something more automatic, but this works fine for now.
        """
        return {
            "id": self.id,
            "module_id": self.module_id,
            "contributor_id": self.contributor_id,
            "title": self.title,
            "type": self.type,
            "url": self.url,
            "description": self.description,
            "views": self.views,
            "upvotes": self.upvotes,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
        }