"""add learning path status and platform settings

Revision ID: 8c95dd2a7a03
Revises: d57c992f9827
Create Date: 2026-09-04 10:00:37.922911

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c95dd2a7a03'
down_revision = 'd57c992f9827'
branch_labels = None
depends_on = None


def upgrade():
    # Create platform settings table
    op.create_table(
        'platform_settings',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('review_before_publish', sa.Boolean(), nullable=False),
        sa.Column('auto_flag', sa.Boolean(), nullable=False),
        sa.Column('weekly_reset', sa.Boolean(), nullable=False),
        sa.Column('seasonal_badges', sa.Boolean(), nullable=False),
        sa.Column('maintenance_mode', sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_platform_settings'))
    )

    # Add status temporarily as nullable so existing rows can be updated
    with op.batch_alter_table('learning_paths', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column('status', sa.String(length=20), nullable=True)
        )

    # Give existing learning paths an initial status
    op.execute(
        "UPDATE learning_paths SET status = 'published' WHERE status IS NULL"
    )

    # Make status required
    with op.batch_alter_table('learning_paths', schema=None) as batch_op:
        batch_op.alter_column(
            'status',
            existing_type=sa.String(length=20),
            nullable=False
        )


def downgrade():
    with op.batch_alter_table('learning_paths', schema=None) as batch_op:
        batch_op.drop_column('status')

    op.drop_table('platform_settings')