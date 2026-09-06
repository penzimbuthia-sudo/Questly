from datetime import datetime, timedelta

from app import create_app
from app.extensions import db
from app.models.badge import Badge
from app.models.challenge import Challenge
from app.models.challenge_progress import ChallengeProgress
from app.models.comment import Comment
from app.models.discussion import Discussion
from app.models.learning_path import LearningPath
from app.models.module import Module
from app.models.progress import Progress
from app.models.quiz import Quiz
from app.models.quiz_question import QuizQuestion
from app.models.rating import Rating
from app.models.report import Report
from app.models.resource import Resource
from app.models.user import User
from app.models.user_badge import UserBadge
from app.models.xp_log import XPLog


def _seed_users():
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
    return User.query.all()


def _seed_badges():
    badges = [
        {"name": "Spark Ignited", "criteria": "Complete your first module", "icon_key": "flame"},
        {"name": "Streak Keeper", "criteria": "Maintain a 7-day streak", "icon_key": "zap"},
        {"name": "Quiz Master", "criteria": "Score 100% on 5 quizzes", "icon_key": "trophy"},
        {"name": "Pathfinder", "criteria": "Complete an entire learning path", "icon_key": "map"},
        {"name": "Contributor", "criteria": "Publish 5 resources", "icon_key": "share2"},
        {"name": "Challenger", "criteria": "Complete a time-limited challenge", "icon_key": "flag"},
        {"name": "Social Butterfly", "criteria": "Post 10 comments", "icon_key": "message-circle"},
        {"name": "Rising Star", "criteria": "Earn 5000 XP", "icon_key": "star"},
    ]

    created_count = 0
    for payload in badges:
        if Badge.query.filter_by(name=payload["name"]).first():
            continue

        badge = Badge(
            name=payload["name"],
            criteria=payload["criteria"],
            icon_key=payload["icon_key"],
        )
        db.session.add(badge)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample badges.")
    return Badge.query.all()


def _seed_learning_paths(users):
    contributors = [u for u in users if u.role == "contributor"]
    learner = next((u for u in users if u.role == "learner"), users[2])

    learning_paths = [
        {
            "title": "Introduction to Web Development",
            "description": "Learn HTML, CSS, and JavaScript from scratch.",
            "category": "Frontend",
            "level": "Beginner",
            "xp_reward": 500,
            "contributor": contributors[0],
        },
        {
            "title": "Python for Data Science",
            "description": "Master Python, pandas, and data visualization.",
            "category": "Data Science",
            "level": "Intermediate",
            "xp_reward": 750,
            "contributor": contributors[1],
        },
        {
            "title": "Backend API Design",
            "description": "Build scalable REST APIs with Flask and SQLAlchemy.",
            "category": "Backend",
            "level": "Advanced",
            "xp_reward": 900,
            "contributor": contributors[0],
        },
        {
            "title": "Machine Learning Basics",
            "description": "Understand supervised and unsupervised learning.",
            "category": "Data Science",
            "level": "Beginner",
            "xp_reward": 600,
            "contributor": contributors[1],
        },
    ]

    created_count = 0
    for payload in learning_paths:
        existing = LearningPath.query.filter_by(title=payload["title"]).first()
        if existing:
            continue

        lp = LearningPath(
            title=payload["title"],
            description=payload["description"],
            category=payload["category"],
            level=payload["level"],
            xp_reward=payload["xp_reward"],
            contributor_id=payload["contributor"].id,
        )
        db.session.add(lp)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample learning paths.")
    return LearningPath.query.all()


def _seed_modules(learning_paths):
    modules_data = {
        learning_paths[0].id: [
            {"title": "HTML Fundamentals", "order_index": 1, "xp_value": 100},
            {"title": "CSS Styling", "order_index": 2, "xp_value": 120},
            {"title": "JavaScript Basics", "order_index": 3, "xp_value": 150},
        ],
        learning_paths[1].id: [
            {"title": "Python Syntax", "order_index": 1, "xp_value": 100},
            {"title": "Pandas DataFrames", "order_index": 2, "xp_value": 130},
            {"title": "Data Visualization", "order_index": 3, "xp_value": 140},
        ],
        learning_paths[2].id: [
            {"title": "Flask Setup", "order_index": 1, "xp_value": 100},
            {"title": "SQLAlchemy Models", "order_index": 2, "xp_value": 130},
            {"title": "Authentication & JWT", "order_index": 3, "xp_value": 150},
        ],
        learning_paths[3].id: [
            {"title": "What is ML?", "order_index": 1, "xp_value": 100},
            {"title": "Supervised Learning", "order_index": 2, "xp_value": 120},
        ],
    }

    created_count = 0
    for lp_id, mods in modules_data.items():
        for payload in mods:
            existing = Module.query.filter_by(
                learning_path_id=lp_id, order_index=payload["order_index"]
            ).first()
            if existing:
                continue

            module = Module(
                learning_path_id=lp_id,
                title=payload["title"],
                order_index=payload["order_index"],
                xp_value=payload["xp_value"],
            )
            db.session.add(module)
            created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample modules.")
    return Module.query.order_by(Module.learning_path_id, Module.order_index).all()


def _seed_resources(modules, users):
    contributors = [u for u in users if u.role == "contributor"]
    resources = [
        {"module": modules[0], "contributor": contributors[0], "title": "HTML Crash Course", "type": "Video", "url": "https://example.com/html", "description": "A quick intro to HTML tags.", "views": 120, "upvotes": 15, "status": "Published"},
        {"module": modules[0], "contributor": contributors[0], "title": "HTML Cheat Sheet", "type": "Article", "url": "https://example.com/html-cheat", "description": "Handy reference for HTML elements.", "views": 85, "upvotes": 9, "status": "Published"},
        {"module": modules[1], "contributor": contributors[0], "title": "CSS Flexbox Guide", "type": "Tutorial", "url": "https://example.com/flexbox", "description": "Step-by-step Flexbox tutorial.", "views": 200, "upvotes": 28, "status": "Published"},
        {"module": modules[2], "contributor": contributors[1], "title": "JS Variables & Types", "type": "Video", "url": "https://example.com/js-vars", "description": "Understanding let, const, and types.", "views": 150, "upvotes": 18, "status": "Published"},
        {"module": modules[2], "contributor": contributors[1], "title": "JS Arrow Functions", "type": "Article", "url": "https://example.com/js-arrows", "description": "How arrow functions work.", "views": 90, "upvotes": 7, "status": "Pending"},
        {"module": modules[3], "contributor": contributors[0], "title": "Python Setup", "type": "Tutorial", "url": "https://example.com/python-setup", "description": "Installing Python and pip.", "views": 300, "upvotes": 45, "status": "Published"},
        {"module": modules[4], "contributor": contributors[1], "title": "Pandas Series", "type": "Video", "url": "https://example.com/pandas-series", "description": "Working with Series.", "views": 110, "upvotes": 12, "status": "Published"},
        {"module": modules[5], "contributor": contributors[1], "title": "Matplotlib Basics", "type": "Article", "url": "https://example.com/matplotlib", "description": "Plotting with Matplotlib.", "views": 70, "upvotes": 5, "status": "Rejected"},
        {"module": modules[6], "contributor": contributors[0], "title": "Flask Quickstart", "type": "Tutorial", "url": "https://example.com/flask", "description": "Your first Flask app.", "views": 250, "upvotes": 30, "status": "Published"},
        {"module": modules[7], "contributor": contributors[0], "title": "Defining Models", "type": "Video", "url": "https://example.com/sqlalchemy-models", "description": "SQLAlchemy model definitions.", "views": 180, "upvotes": 22, "status": "Published"},
        {"module": modules[8], "contributor": contributors[1], "title": "JWT in Flask", "type": "Article", "url": "https://example.com/jwt", "description": "Implementing JWT auth.", "views": 140, "upvotes": 16, "status": "Pending"},
        {"module": modules[9], "contributor": contributors[0], "title": "ML Overview", "type": "Video", "url": "https://example.com/ml-overview", "description": "What is machine learning?", "views": 400, "upvotes": 55, "status": "Published"},
    ]

    created_count = 0
    for payload in resources:
        existing = Resource.query.filter_by(
            module_id=payload["module"].id,
            title=payload["title"],
        ).first()
        if existing:
            continue

        resource = Resource(
            module_id=payload["module"].id,
            contributor_id=payload["contributor"].id,
            title=payload["title"],
            type=payload["type"],
            url=payload["url"],
            description=payload["description"],
            views=payload["views"],
            upvotes=payload["upvotes"],
            status=payload["status"],
        )
        db.session.add(resource)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample resources.")
    return Resource.query.all()


def _seed_quizzes_and_questions(modules):
    quizzes_data = [
        {"module": modules[0], "title": "HTML Quiz", "pass_score": 70, "questions": [
            {"prompt": "What does HTML stand for?", "option_a": "Hyper Text Markup Language", "option_b": "High Tech Modern Language", "option_c": "Hyper Transfer Markup Language", "option_d": None, "correct_option": "a", "explanation": "HTML stands for Hyper Text Markup Language."},
            {"prompt": "Which tag is used for the largest heading?", "option_a": "<heading>", "option_b": "<h6>", "option_c": "<h1>", "option_d": "<head>", "correct_option": "c", "explanation": "<h1> defines the largest heading."},
        ]},
        {"module": modules[1], "title": "CSS Quiz", "pass_score": 70, "questions": [
            {"prompt": "Which property changes text color?", "option_a": "text-color", "option_b": "color", "option_c": "font-color", "option_d": None, "correct_option": "b", "explanation": "The color property sets text color."},
            {"prompt": "What does Flexbox help with?", "option_a": "Database queries", "option_b": "Layout alignment", "option_c": "File uploads", "option_d": None, "correct_option": "b", "explanation": "Flexbox is for layout and alignment."},
        ]},
        {"module": modules[5], "title": "Python Quiz", "pass_score": 80, "questions": [
            {"prompt": "Which keyword defines a function?", "option_a": "func", "option_b": "def", "option_c": "function", "option_d": None, "correct_option": "b", "explanation": "Python uses 'def' to define functions."},
        ]},
    ]

    created_count = 0
    for payload in quizzes_data:
        existing = Quiz.query.filter_by(module_id=payload["module"].id).first()
        if existing:
            continue

        quiz = Quiz(
            module_id=payload["module"].id,
            title=payload["title"],
            pass_score=payload["pass_score"],
        )
        db.session.add(quiz)
        db.session.flush()

        for q_payload in payload["questions"]:
            question = QuizQuestion(
                quiz_id=quiz.id,
                prompt=q_payload["prompt"],
                option_a=q_payload["option_a"],
                option_b=q_payload["option_b"],
                option_c=q_payload["option_c"],
                option_d=q_payload["option_d"],
                correct_option=q_payload["correct_option"],
                explanation=q_payload["explanation"],
            )
            db.session.add(question)

        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample quizzes with questions.")


def _seed_progress(users, learning_paths, modules):
    learner = next((u for u in users if u.role == "learner"), users[2])

    progress_entries = [
        {"user": learner, "learning_path": learning_paths[0], "module": None, "status": "following", "score": None, "completed_at": None},
        {"user": learner, "learning_path": learning_paths[0], "module": modules[0], "status": "completed", "score": 90, "completed_at": datetime.now() - timedelta(days=3)},
        {"user": learner, "learning_path": learning_paths[0], "module": modules[1], "status": "completed", "score": 85, "completed_at": datetime.now() - timedelta(days=1)},
        {"user": learner, "learning_path": learning_paths[1], "module": None, "status": "following", "score": None, "completed_at": None},
        {"user": learner, "learning_path": learning_paths[1], "module": modules[3], "status": "completed", "score": 95, "completed_at": datetime.now() - timedelta(days=7)},
    ]

    created_count = 0
    for payload in progress_entries:
        existing = Progress.query.filter_by(
            user_id=payload["user"].id,
            learning_path_id=payload["learning_path"].id,
            module_id=payload["module"].id if payload["module"] else None,
        ).first()
        if existing:
            continue

        progress = Progress(
            user_id=payload["user"].id,
            learning_path_id=payload["learning_path"].id,
            module_id=payload["module"].id if payload["module"] else None,
            status=payload["status"],
            score=payload["score"],
            completed_at=payload["completed_at"],
        )
        db.session.add(progress)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample progress entries.")


def _seed_challenges(users, badges):
    admin = next((u for u in users if u.role == "admin"), users[3])
    challenges = [
        {
            "title": "5-Day Builder",
            "description": "Complete 5 modules in 5 days to earn bonus XP.",
            "period_start": datetime.now() - timedelta(days=2),
            "period_end": datetime.now() + timedelta(days=3),
            "reward_xp": 200,
            "reward_badge": badges[5] if len(badges) > 5 else None,
            "status": "Active",
        },
        {
            "title": "Data Science Month",
            "description": "Finish the entire Data Science learning path this month.",
            "period_start": datetime.now() - timedelta(days=10),
            "period_end": datetime.now() + timedelta(days=20),
            "reward_xp": 500,
            "reward_badge": badges[3] if len(badges) > 3 else None,
            "status": "Active",
        },
        {
            "title": "Backend Bootcamp",
            "description": "Complete all backend modules.",
            "period_start": datetime.now() + timedelta(days=5),
            "period_end": datetime.now() + timedelta(days=25),
            "reward_xp": 350,
            "reward_badge": None,
            "status": "Upcoming",
        },
    ]

    created_count = 0
    for payload in challenges:
        existing = Challenge.query.filter_by(title=payload["title"]).first()
        if existing:
            continue

        challenge = Challenge(
            title=payload["title"],
            description=payload["description"],
            period_start=payload["period_start"],
            period_end=payload["period_end"],
            reward_xp=payload["reward_xp"],
            reward_badge_id=payload["reward_badge"].id if payload["reward_badge"] else None,
            status=payload["status"],
        )
        db.session.add(challenge)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample challenges.")
    return Challenge.query.all()


def _seed_challenge_progress(users, challenges):
    learner = next((u for u in users if u.role == "learner"), users[2])

    entries = [
        {"user": learner, "challenge": challenges[0], "progress": 3, "completed": False},
        {"user": learner, "challenge": challenges[1], "progress": 2, "completed": False},
    ]

    created_count = 0
    for payload in entries:
        existing = ChallengeProgress.query.filter_by(
            user_id=payload["user"].id,
            challenge_id=payload["challenge"].id,
        ).first()
        if existing:
            continue

        cp = ChallengeProgress(
            user_id=payload["user"].id,
            challenge_id=payload["challenge"].id,
            progress=payload["progress"],
            completed=payload["completed"],
        )
        db.session.add(cp)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample challenge progress entries.")


def _seed_user_badges(users, badges):
    learner = next((u for u in users if u.role == "learner"), users[2])
    contributor = next((u for u in users if u.role == "contributor"), users[0])

    entries = [
        {"user": learner, "badge": badges[0], "earned_at": datetime.now() - timedelta(days=10)},
        {"user": learner, "badge": badges[1], "earned_at": datetime.now() - timedelta(days=5)},
        {"user": contributor, "badge": badges[4], "earned_at": datetime.now() - timedelta(days=2)},
        {"user": contributor, "badge": badges[7], "earned_at": datetime.now() - timedelta(days=1)},
    ]

    created_count = 0
    for payload in entries:
        existing = UserBadge.query.filter_by(
            user_id=payload["user"].id,
            badge_id=payload["badge"].id,
        ).first()
        if existing:
            continue

        ub = UserBadge(
            user_id=payload["user"].id,
            badge_id=payload["badge"].id,
            earned_at=payload["earned_at"],
        )
        db.session.add(ub)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample user badges.")


def _seed_discussions(users, learning_paths):
    contributors = [u for u in users if u.role == "contributor"]
    discussions = [
        {"author": contributors[0], "learning_path": learning_paths[0], "title": "Best practices for CSS layouts?", "content": "What are some modern CSS layout techniques you recommend?", "is_flagged": False, "flag_reason": None, "status": "Clear"},
        {"author": contributors[1], "learning_path": learning_paths[1], "title": "Pandas vs NumPy", "content": "When should I use Pandas over NumPy?", "is_flagged": False, "flag_reason": None, "status": "Clear"},
        {"author": contributors[0], "learning_path": learning_paths[2], "title": "Flask vs FastAPI", "content": "Which framework is better for new projects?", "is_flagged": True, "flag_reason": "Spam", "status": "Flagged"},
    ]

    created_count = 0
    for payload in discussions:
        existing = Discussion.query.filter_by(
            title=payload["title"],
            author_id=payload["author"].id,
        ).first()
        if existing:
            continue

        discussion = Discussion(
            author_id=payload["author"].id,
            learning_path_id=payload["learning_path"].id,
            title=payload["title"],
            content=payload["content"],
            is_flagged=payload["is_flagged"],
            flag_reason=payload["flag_reason"],
            status=payload["status"],
        )
        db.session.add(discussion)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample discussions.")
    return Discussion.query.all()


def _seed_comments(users, discussions):
    contributors = [u for u in users if u.role == "contributor"]
    comments = [
        {"author": contributors[1], "discussion": discussions[0], "content": "Flexbox and Grid are the way to go!", "is_flagged": False, "flag_reason": None},
        {"author": contributors[0], "discussion": discussions[0], "content": "Agreed, especially CSS Grid for 2D layouts.", "is_flagged": False, "flag_reason": None},
        {"author": contributors[1], "discussion": discussions[1], "content": "Use Pandas for tabular data and NumPy for numerical arrays.", "is_flagged": False, "flag_reason": None},
        {"author": contributors[0], "discussion": discussions[2], "content": "Depends on your async needs.", "is_flagged": False, "flag_reason": None},
    ]

    created_count = 0
    for payload in comments:
        existing = Comment.query.filter_by(
            discussion_id=payload["discussion"].id,
            author_id=payload["author"].id,
            content=payload["content"],
        ).first()
        if existing:
            continue

        comment = Comment(
            author_id=payload["author"].id,
            discussion_id=payload["discussion"].id,
            content=payload["content"],
            is_flagged=payload["is_flagged"],
            flag_reason=payload["flag_reason"],
        )
        db.session.add(comment)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample comments.")


def _seed_ratings(users, resources):
    learner = next((u for u in users if u.role == "learner"), users[2])
    contributor = next((u for u in users if u.role == "contributor"), users[0])

    ratings = [
        {"user": learner, "resource": resources[0], "score": 5, "comment": "Excellent intro video!"},
        {"user": contributor, "resource": resources[0], "score": 4, "comment": "Very clear explanations."},
        {"user": learner, "resource": resources[2], "score": 5, "comment": "Flexbox finally makes sense."},
        {"user": contributor, "resource": resources[5], "score": 4, "comment": "Great setup guide."},
    ]

    created_count = 0
    for payload in ratings:
        existing = Rating.query.filter_by(
            user_id=payload["user"].id,
            resource_id=payload["resource"].id,
        ).first()
        if existing:
            continue

        rating = Rating(
            user_id=payload["user"].id,
            resource_id=payload["resource"].id,
            score=payload["score"],
            comment=payload["comment"],
        )
        db.session.add(rating)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample ratings.")


def _seed_reports(users, resources, discussions):
    contributor = next((u for u in users if u.role == "contributor"), users[0])
    admin = next((u for u in users if u.role == "admin"), users[3])

    reports = [
        {"content_type": "discussion", "content_id": discussions[2].id, "content_title": discussions[2].title, "reason": "Spam", "description": "This looks like a promotional post.", "reporter": contributor, "resolver": admin, "status": "Resolved", "resolution_note": "Discussion removed.", "created_at": datetime.now() - timedelta(days=2), "resolved_at": datetime.now() - timedelta(days=1)},
        {"content_type": "resource", "content_id": resources[7].id, "content_title": resources[7].title, "reason": "Inappropriate content", "description": "Resource contains misleading info.", "reporter": contributor, "resolver": None, "status": "Under review", "resolution_note": None, "created_at": datetime.now(), "resolved_at": None},
    ]

    created_count = 0
    for payload in reports:
        existing = Report.query.filter_by(
            content_type=payload["content_type"],
            content_id=payload["content_id"],
            reporter_id=payload["reporter"].id,
        ).first()
        if existing:
            continue

        report = Report(
            content_type=payload["content_type"],
            content_id=payload["content_id"],
            content_title=payload["content_title"],
            reason=payload["reason"],
            description=payload["description"],
            reporter_id=payload["reporter"].id,
            resolver_id=payload["resolver"].id if payload["resolver"] else None,
            status=payload["status"],
            resolution_note=payload["resolution_note"],
            created_at=payload["created_at"],
            resolved_at=payload["resolved_at"],
        )
        db.session.add(report)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample reports.")


def _seed_xp_logs(users):
    learner = next((u for u in users if u.role == "learner"), users[2])
    contributor = next((u for u in users if u.role == "contributor"), users[0])

    logs = [
        {"user": learner, "amount": 120, "reason": "completed module", "source_type": "module", "source_id": 1, "created_at": datetime.now() - timedelta(days=3)},
        {"user": learner, "amount": 130, "reason": "completed module", "source_type": "module", "source_id": 2, "created_at": datetime.now() - timedelta(days=1)},
        {"user": learner, "amount": 50, "reason": "quiz bonus", "source_type": "quiz", "source_id": 1, "created_at": datetime.now() - timedelta(days=3)},
        {"user": contributor, "amount": 150, "reason": "resource published", "source_type": "resource", "source_id": 1, "created_at": datetime.now() - timedelta(days=4)},
    ]

    created_count = 0
    for payload in logs:
        existing = XPLog.query.filter_by(
            user_id=payload["user"].id,
            reason=payload["reason"],
            source_type=payload["source_type"],
            source_id=payload["source_id"],
        ).first()
        if existing:
            continue

        log = XPLog(
            user_id=payload["user"].id,
            amount=payload["amount"],
            reason=payload["reason"],
            source_type=payload["source_type"],
            source_id=payload["source_id"],
            created_at=payload["created_at"],
        )
        db.session.add(log)
        created_count += 1

    db.session.commit()
    print(f"Added {created_count} sample XP logs.")


def run_seed():
    """Runs every seed function, in order."""
    app = create_app()

    with app.app_context():
        users = _seed_users()
        badges = _seed_badges()
        learning_paths = _seed_learning_paths(users)
        modules = _seed_modules(learning_paths)
        _seed_resources(modules, users)
        _seed_quizzes_and_questions(modules)
        _seed_progress(users, learning_paths, modules)
        challenges = _seed_challenges(users, badges)
        _seed_challenge_progress(users, challenges)
        _seed_user_badges(users, badges)
        discussions = _seed_discussions(users, learning_paths)
        _seed_comments(users, discussions)
        _seed_ratings(users, Resource.query.all())
        _seed_reports(users, Resource.query.all(), discussions)
        _seed_xp_logs(users)

    print("Seeding complete.")


if __name__ == "__main__":
    run_seed()
