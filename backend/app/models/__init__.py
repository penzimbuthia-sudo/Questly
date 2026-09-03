# from .user import User
from app.models.learning_path import LearningPath
from app.models.module import Module
from app.models.progress import Progress
from app.models.quiz import Quiz
from app.models.quiz_question import QuizQuestion
from app.models.rating import Rating
from app.models.resource import Resource

#
# Every model must be imported here so SQLAlchemy's metadata knows about
# it before db.create_all() / Alembic migrations run. Only models that
# actually have content are imported — add yours here as you build it,
# or `flask db migrate` won't see your table.
from app.models.user import User
from app.models.xp_log import XPLog

from .badge import Badge
from .challenge import Challenge
from .challenge_progress import ChallengeProgress
from .comment import Comment
from .discussion import Discussion
from .password_reset_token import PasswordResetToken
from .report import Report
from .system_log import SystemLog
from .user_badge import UserBadge
