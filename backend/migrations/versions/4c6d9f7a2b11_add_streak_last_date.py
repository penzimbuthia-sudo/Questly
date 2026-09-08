"""add last activity date for user streaks

Revision ID: 4c6d9f7a2b11
Revises: 1ce274a8c686
Create Date: 2026-09-07
"""

from alembic import op
import sqlalchemy as sa


revision = "4c6d9f7a2b11"
down_revision = "1ce274a8c686"
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("streak_last_date", sa.Date(), nullable=True)
        )


def downgrade():
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_column("streak_last_date")
