from datetime import datetime, timezone

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Progress(Base):
    __tablename__ = "progress"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    roadmap_id: Mapped[int | None] = mapped_column(
        ForeignKey("roadmaps.id", ondelete="SET NULL"),
        nullable=True,
    )

    skill_id: Mapped[int | None] = mapped_column(
        ForeignKey("skills.id", ondelete="SET NULL"),
        nullable=True,
    )

    task_title: Mapped[str] = mapped_column(
        String(250),
        nullable=False,
    )

    task_type: Mapped[str] = mapped_column(
        String(50),
        default="learning",
    )

    completion_percentage: Mapped[float] = mapped_column(
        Float,
        default=0.0,
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="pending",
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
    )

    user = relationship(
        "User",
        back_populates="progress",
    )

    roadmap = relationship(
        "Roadmap",
        back_populates="progress",
    )

    skill = relationship(
        "Skill",
    )

    def mark_completed(self):
        self.completion_percentage = 100.0
        self.status = "completed"
        self.completed_at = datetime.now(timezone.utc)