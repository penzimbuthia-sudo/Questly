import os

import click

from app import create_app
from app.extensions import db
from app.models.user import User

app = create_app(os.environ.get("FLASK_ENV", "development"))

if __name__ == "__main__":
    app.run(debug=app.config["DEBUG"])


@app.cli.command("create-admin")
@click.option("--email", default="admin@test.com", show_default=True)
@click.option("--name", default="Questly Admin", show_default=True)
@click.option("--password", envvar="ADMIN_PASSWORD", prompt=True, hide_input=True)
def create_admin(email, name, password):
    """Create or update a development administrator account."""
    with app.app_context():
        user = User.query.filter_by(email=email).first()
        if user is None:
            user = User(email=email, name=name, role="admin", status="Active")
            db.session.add(user)
        else:
            user.name = name
            user.role = "admin"
            user.status = "Active"

        user.set_password(password)
        db.session.commit()
        click.echo(f"Admin account ready: {email}")
