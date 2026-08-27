from app.extensions import db
from app.models.user import User


def get_leaderboard(role=None, limit=10):
    """
    Returns the top users, ranked by XP, highest first.

    role: if given (e.g. "learner" or "contributor"), only ranks
          users with that role. If left as None, ranks everyone.
    limit: how many results to return (default: top 10).

    Returns a list of dictionaries, ready to send back as JSON.
    """
    query = User.query

    if role is not None:
        query = query.filter_by(role=role)

    top_users = query.order_by(User.xp.desc()).limit(limit).all()

    leaderboard = []
    for position, user in enumerate(top_users, start=1):
        leaderboard.append(
            {
                "rank": position,
                "id": user.id,
                "name": user.name,
                "xp": user.xp,
            }
        )

    return leaderboard


def get_user_rank(user_id, role=None):
    
    query = User.query

    if role is not None:
        query = query.filter_by(role=role)

    all_users = query.order_by(User.xp.desc()).all()

    for position, user in enumerate(all_users, start=1):
        if user.id == user_id:
            return position

    return None 