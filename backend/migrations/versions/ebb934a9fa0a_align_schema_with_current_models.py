"""align schema with current models

Revision ID: ebb934a9fa0a
Revises: 103e981786de
Create Date: 2026-09-03
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "ebb934a9fa0a"
down_revision = "103e981786de"
branch_labels = None
depends_on = None


def upgrade():
    # ------------------------------------------------------------------
    # learning_paths.contributor_id
    # INTEGER -> VARCHAR(36)
    #
    # Existing values are already UUID strings, so the SQLite table
    # rebuild preserves the actual stored values.
    # ------------------------------------------------------------------
    with op.batch_alter_table("learning_paths", schema=None) as batch_op:
        batch_op.alter_column(
            "contributor_id",
            existing_type=sa.Integer(),
            type_=sa.String(length=36),
            existing_nullable=True,
        )

    # ------------------------------------------------------------------
    # progress.user_id
    # INTEGER -> VARCHAR(36)
    # ------------------------------------------------------------------
    with op.batch_alter_table("progress", schema=None) as batch_op:
        batch_op.alter_column(
            "user_id",
            existing_type=sa.Integer(),
            type_=sa.String(length=36),
            existing_nullable=False,
        )

    # ------------------------------------------------------------------
    # ratings.user_id
    # INTEGER -> VARCHAR(36)
    # ------------------------------------------------------------------
    with op.batch_alter_table("ratings", schema=None) as batch_op:
        batch_op.alter_column(
            "user_id",
            existing_type=sa.Integer(),
            type_=sa.String(length=36),
            existing_nullable=False,
        )

    # ------------------------------------------------------------------
    # user_badges.user_id
    # INTEGER -> VARCHAR(36)
    # ------------------------------------------------------------------
    with op.batch_alter_table("user_badges", schema=None) as batch_op:
        batch_op.alter_column(
            "user_id",
            existing_type=sa.Integer(),
            type_=sa.String(length=36),
            existing_nullable=False,
        )

    # ------------------------------------------------------------------
    # xp_logs.user_id
    # INTEGER -> VARCHAR(36)
    # ------------------------------------------------------------------
    with op.batch_alter_table("xp_logs", schema=None) as batch_op:
        batch_op.alter_column(
            "user_id",
            existing_type=sa.Integer(),
            type_=sa.String(length=36),
            existing_nullable=False,
        )

    # ------------------------------------------------------------------
    # progress.uq_progress_follow
    #
    # Old index:
    #   (user_id, learning_path_id)
    #
    # Current model:
    #   (user_id, learning_path_id, module_id)
    # ------------------------------------------------------------------
    op.drop_index("uq_progress_follow", table_name="progress")

    op.create_index(
        "uq_progress_follow",
        "progress",
        ["user_id", "learning_path_id", "module_id"],
        unique=True,
        sqlite_where=sa.text("module_id IS NULL"),
        postgresql_where=sa.text("module_id IS NULL"),
    )

    # ------------------------------------------------------------------
    # system_logs.extra_data -> system_logs.metadata
    # ------------------------------------------------------------------
    with op.batch_alter_table("system_logs", schema=None) as batch_op:
        batch_op.alter_column(
            "extra_data",
            existing_type=sa.JSON(),
            new_column_name="metadata",
            existing_nullable=True,
        )


def downgrade():
    # Reverse system_logs.metadata -> extra_data
    with op.batch_alter_table("system_logs", schema=None) as batch_op:
        batch_op.alter_column(
            "metadata",
            existing_type=sa.JSON(),
            new_column_name="extra_data",
            existing_nullable=True,
        )

    # Restore old progress index
    op.drop_index("uq_progress_follow", table_name="progress")

    op.create_index(
        "uq_progress_follow",
        "progress",
        ["user_id", "learning_path_id"],
        unique=True,
        sqlite_where=sa.text("module_id IS NULL"),
        postgresql_where=sa.text("module_id IS NULL"),
    )

    # Restore INTEGER user IDs
    with op.batch_alter_table("xp_logs", schema=None) as batch_op:
        batch_op.alter_column(
            "user_id",
            existing_type=sa.String(length=36),
            type_=sa.Integer(),
            existing_nullable=False,
        )

    with op.batch_alter_table("user_badges", schema=None) as batch_op:
        batch_op.alter_column(
            "user_id",
            existing_type=sa.String(length=36),
            type_=sa.Integer(),
            existing_nullable=False,
        )

    with op.batch_alter_table("ratings", schema=None) as batch_op:
        batch_op.alter_column(
            "user_id",
            existing_type=sa.String(length=36),
            type_=sa.Integer(),
            existing_nullable=False,
        )

    with op.batch_alter_table("progress", schema=None) as batch_op:
        batch_op.alter_column(
            "user_id",
            existing_type=sa.String(length=36),
            type_=sa.Integer(),
            existing_nullable=False,
        )

    with op.batch_alter_table("learning_paths", schema=None) as batch_op:
        batch_op.alter_column(
            "contributor_id",
            existing_type=sa.String(length=36),
            type_=sa.Integer(),
            existing_nullable=True,
        )