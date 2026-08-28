# from .user import User
from .discussion import Discussion
from .comment import Comment
from .report import Report
from .system_log import SystemLog
# from .resource import Resource
# from .learning_path import LearningPath
from .badge import Badge
from .challenge import Challenge
# from .module import Module
# from .quiz import Quiz
# from .quiz_question import QuizQuestion
# from .rating import Rating
# from .progress import Progress
from .user_badge import UserBadge
# from .xp_log import XPLog
from .password_reset_token import PasswordResetToken


# app/models/__init__.py
#
# Every model must be imported here so SQLAlchemy's metadata knows about
# it before db.create_all() / Alembic migrations run. Only models that
# actually have content are imported — add yours here as you build it,
# or `flask db migrate` won't see your table.

from app.models.user import User
from app.models.resource import Resource
from app.models.learning_path import LearningPath
from app.models.module import Module
from app.models.quiz import Quiz
from app.models.quiz_question import QuizQuestion
from app.models.progress import Progress
from app.models.rating import Rating
from app.models.xp_log import XPLog

__all__ = [
    "User",
    "Resource",
    "LearningPath",
    "Module",
    "Quiz",
    "QuizQuestion",
    "Progress",
    "Rating",
    "XPLog",
]
