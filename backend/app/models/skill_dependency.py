from sqlalchemy import ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class SkillDependency(Base):
    __tablename__ = "skill_dependencies"
    __table_args__ = (
        UniqueConstraint(
            "skill_id",
            "prerequisite_skill_id",
            name="uq_skill_prerequisite",
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    skill_id: Mapped[int] = mapped_column(
        ForeignKey("skills.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    prerequisite_skill_id: Mapped[int] = mapped_column(
        ForeignKey("skills.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    skill = relationship(
        "Skill",
        foreign_keys=[skill_id],
        back_populates="dependencies",
    )

    prerequisite = relationship(
        "Skill",
        foreign_keys=[prerequisite_skill_id],
    )
