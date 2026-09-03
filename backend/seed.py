from app import create_app
from app.extensions import db
from app.models.user import User


def seed_users():
    """Creates a handful of sample users, one of each role."""
    sample_users = [
        {
            "name": "Aisha K.",
            "email": "aisha.k@questly.io",
            "role": "contributor",
            "xp_total": 4820,
            "password": "Password123!",
        },
        {
            "name": "Brian O.",
            "email": "brian.o@questly.io",
            "role": "contributor",
            "xp_total": 4560,
            "password": "Password123!",
        },
        {
            "name": "Chinedu M.",
            "email": "chinedu.m@questly.io",
            "role": "learner",
            "xp_total": 2190,
            "password": "Password123!",
        },
        {
            "name": "Penzi M.",
            "email": "penzi.m@questly.io",
            "role": "admin",
            "xp_total": 0,
            "password": "Password123!",
        },
    ]

    created_count = 0

    for payload in sample_users:
        if User.query.filter_by(email=payload["email"]).first():
            continue

        user = User(
            name=payload["name"],
            email=payload["email"],
            role=payload["role"],
            xp_total=payload["xp_total"],
        )
        user.set_password(payload["password"])
        db.session.add(user)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample users.")


def run_seed():
    """Runs every seed function, in order."""
    app = create_app()

    with app.app_context():
        db.create_all()
        seed_users()

    print("Seeding complete.")


if __name__ == "__main__":
    run_seed()