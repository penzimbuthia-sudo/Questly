from app import create_app
from app.extensions import db
from app.models.user import User

def seed_users():
    """Creates a handful of sample users, one of each role."""
    sample_users = [
        User(name="Aisha K.", email="aisha.k@questly.io", role="contributor", xp=4820),
        User(name="Brian O.", email="brian.o@questly.io", role="contributor", xp=4560),
        User(name="Chinedu M.", email="chinedu.m@questly.io", role="learner", xp=2190),
        User(name="Penzi M.", email="penzi.m@questly.io", role="admin", xp=0),
    ]

    for user in sample_users:
        db.session.add(user)

    db.session.commit()
    print(f"Added {len(sample_users)} sample users.")


def run_seed():
    """Runs every seed function, in order."""
    app = create_app()

    with app.app_context():
        seed_users()

    print("Seeding complete.")


if __name__ == "__main__":
    run_seed()