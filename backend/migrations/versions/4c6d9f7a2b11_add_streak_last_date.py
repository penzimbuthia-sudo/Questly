"""add last activity date for user streaks

Revision ID: 4c6d9f7a2b11
Revises: ebb934a9fa0a
Create Date: 2026-09-06
"""

from alembic import op
import sqlalchemy as sa


revision = "4c6d9f7a2b11"
down_revision = "ebb934a9fa0a"
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(sa.Column("streak_last_date", sa.Date(), nullable=True))


def downgrade():
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_column("streak_last_date")