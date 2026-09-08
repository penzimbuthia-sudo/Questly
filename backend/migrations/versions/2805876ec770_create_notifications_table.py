"""create notifications table

Revision ID: 2805876ec770
Revises: 4c6d9f7a2b11
Create Date: 2026-09-07 18:55:14.956778

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2805876ec770'
down_revision = '4c6d9f7a2b11'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'notifications',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.String(length=36), nullable=False),
        sa.Column('message', sa.String(length=255), nullable=False),
        sa.Column('type', sa.String(length=30), nullable=False),
        sa.Column('read', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(
            ['user_id'],
            ['users.id'],
            name=op.f('fk_notifications_user_id_users')
        ),
        sa.PrimaryKeyConstraint(
            'id',
            name=op.f('pk_notifications')
        )
    )


def downgrade():
    op.drop_table('notifications')