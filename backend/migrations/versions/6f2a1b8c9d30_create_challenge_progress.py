"""create challenge progress table

Revision ID: 6f2a1b8c9d30
Revises: 8c95dd2a7a03
Create Date: 2026-09-06
"""

from alembic import op
import sqlalchemy as sa


revision = "6f2a1b8c9d30"
down_revision = "8c95dd2a7a03"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "challenge_progress",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("challenge_id", sa.Integer(), nullable=False),
        sa.Column("progress", sa.Integer(), nullable=True),
        sa.Column("completed", sa.Boolean(), nullable=True),
        sa.ForeignKeyConstraint(["challenge_id"], ["challenges.id"]),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("challenge_progress")
