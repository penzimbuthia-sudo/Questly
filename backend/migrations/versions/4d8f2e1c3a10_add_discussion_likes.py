"""add discussion likes

Revision ID: 4d8f2e1c3a10
Revises: 8c95dd2a7a03
"""
from alembic import op
import sqlalchemy as sa

revision = "4d8f2e1c3a10"
down_revision = "8c95dd2a7a03"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("discussions", sa.Column("likes", sa.Integer(), nullable=True))
    op.execute("UPDATE discussions SET likes = 0 WHERE likes IS NULL")


def downgrade():
    op.drop_column("discussions", "likes")