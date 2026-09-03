from app.extensions import db
from app.models.user import User
from app.models.xp_log import XPLog


def award_xp(user_id, amount, reason=None, source_type=None, source_id=None):
    """Credits XP to a user. Called from module completion and quiz
    submission — this is what actually makes gamification real, rather
    than just a number sitting in the database that nothing updates.

    TODO: also write an XPLog row here once its exact column names are
    confirmed (source_type/source_id are already being passed in by
    callers specifically so they can be logged) — intentionally left
    out for now rather than guessing field names and adding a fourth
    mismatch bug today.
    """
    user = User.query.get(user_id)
    if user is None:
        return None

    user.xp_total += amount
    db.session.add(
        XPLog(
            user_id=user_id,
            amount=amount,
            reason=reason,
            source_type=source_type,
            source_id=source_id,
        )
    )
    db.session.commit()
    return user.xp_total


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

    top_users = query.order_by(User.xp_total.desc()).limit(limit).all()

    leaderboard = []
    for position, user in enumerate(top_users, start=1):
        leaderboard.append(
            {
                "rank": position,
                "id": user.id,
                "name": user.name,
                "xp": user.xp_total,
            }
        )

    return leaderboard


def get_user_rank(user_id, role=None):
    query = User.query

    if role is not None:
        query = query.filter_by(role=role)

    all_users = query.order_by(User.xp_total.desc()).all()

    for position, user in enumerate(all_users, start=1):
        if user.id == user_id:
            return position

    return None