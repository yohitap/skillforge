from sqlalchemy import ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class SkillAlias(Base):
    __tablename__ = "skill_aliases"
    __table_args__ = (
        UniqueConstraint("alias", name="uq_skill_alias"),
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

    alias: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        index=True,
    )

    skill = relationship(
        "Skill",
        back_populates="aliases",
    )
