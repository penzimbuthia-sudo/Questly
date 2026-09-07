"""add comment moderation reason

Revision ID: 7a3b2c1d4e50
Revises: 6f2a1b8c9d30
Create Date: 2026-09-06
"""

from alembic import op
import sqlalchemy as sa


revision = "7a3b2c1d4e50"
down_revision = "6f2a1b8c9d30"
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("comments", schema=None) as batch_op:
        batch_op.add_column(sa.Column("flag_reason", sa.String(length=100), nullable=True))


def downgrade():
    with op.batch_alter_table("comments", schema=None) as batch_op:
        batch_op.drop_column("flag_reason")
