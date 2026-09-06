from app.extensions import mail
from flask import current_app, render_template_string
from flask_mail import Message

RESET_EMAIL_TEMPLATE = """
<p>Hi {{ name }},</p>
<p>We received a request to reset your Questly password. Click the link below to choose a new one:</p>
<p><a href="{{ reset_url }}">{{ reset_url }}</a></p>
<p>This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
"""

def send_password_reset_email(user, token):
    reset_url = f"{current_app.config['FRONTEND_URL']}/reset-password?token={token}"

    html = render_template_string(RESET_EMAIL_TEMPLATE, name=user.name, reset_url=reset_url)

    msg = Message(
        subject="Reset your Questly password",
        recipients=[user.email],
        html=html,
    )

    try:
        mail.send(msg)
        return True
    except Exception as exc:  # noqa: BLE001
        # Don't let an email provider outage crash the request — the user
        # still gets a generic "if that email exists..." response either way.
        current_app.logger.error(f"Failed to send password reset email to {user.email}: {exc}")
        return False
