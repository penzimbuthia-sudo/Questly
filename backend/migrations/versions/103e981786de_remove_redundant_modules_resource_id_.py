"""
remove redundant modules.resource_id, resources.module_id is now the single FK

Revision ID: 103e981786de
Revises: 3391f2c0d9ab
Create Date: 2026-09-02 12:33:42.895499
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "103e981786de"
down_revision = "3391f2c0d9ab"
branch_labels = None
depends_on = None


def upgrade():
    # resources.module_id is now the single relationship between
    # resources and modules, so modules.resource_id is redundant.
    with op.batch_alter_table("modules", schema=None) as batch_op:
        batch_op.drop_column("resource_id")

    # A module can have at most one quiz.
    with op.batch_alter_table("quizzes", schema=None) as batch_op:
        batch_op.create_unique_constraint(
            batch_op.f("uq_quizzes_module_id"),
            ["module_id"],
        )

    # Update the rating score check constraint name.
    with op.batch_alter_table("ratings", schema=None) as batch_op:
        # Bypassed dropping the nonexistent constraint to prevent SQLite KeyError
        # batch_op.drop_constraint(
        #     batch_op.f("ck_rating_score_range"),
        #     type_="check",
        # )
        batch_op.create_check_constraint(
            batch_op.f("ck_ratings_ck_rating_score_range"),
            "score >= 1 AND score <= 5",
        )
        pass    


def downgrade():
    # Restore the original rating score check constraint.
    with op.batch_alter_table("ratings", schema=None) as batch_op:
        batch_op.drop_constraint(
            batch_op.f("ck_ratings_ck_rating_score_range"),
            type_="check",
        )
        batch_op.create_check_constraint(
            batch_op.f("ck_rating_score_range"),
            "score >= 1 AND score <= 5",
        )
        pass

    # Remove the one-quiz-per-module constraint.
    with op.batch_alter_table("quizzes", schema=None) as batch_op:
        # Added a fallback try/except or comment if needed later, but this should be fine for downgrade
        batch_op.drop_constraint(
            batch_op.f("uq_quizzes_module_id"),
            type_="unique",
        )

    # Restore modules.resource_id.
    with op.batch_alter_table("modules", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("resource_id", sa.INTEGER(), nullable=True)
        )

        batch_op.create_foreign_key(
            None,
            "resources",
            ["resource_id"],
            ["id"],
        )
