from sqlalchemy import Float, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

class UserSkill(Base):
    __tablename__ = "user_skills"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    skill_id: Mapped[int] = mapped_column(
        ForeignKey("skills.id", ondelete="CASCADE"),
        nullable=False,
    )

    proficiency: Mapped[float] = mapped_column(
        Float,
        default=0.0,
    )

    confidence: Mapped[float] = mapped_column(
        Float,
        default=0.0,
    )

    user = relationship(
        "User",
        back_populates="skills",
    )

    skill = relationship(
        "Skill",
        back_populates="users",
    )