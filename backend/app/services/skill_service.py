from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.skill import Skill
from app.models.user_skill import UserSkill
from app.services.skill_normalization_service import resolve_skill


def list_skills(
    db: Session,
    category: str | None = None,
    search: str | None = None,
) -> list[Skill]:
    query = db.query(Skill)

    if category:
        query = query.filter(Skill.category.ilike(category.strip()))

    if search:
        term = f"%{search.strip()}%"
        query = query.filter(Skill.name.ilike(term))

    return query.order_by(Skill.name.asc()).all()


def get_skill(db: Session, skill_id: int) -> Skill:
    skill = db.query(Skill).filter(Skill.id == skill_id).first()

    if skill is None:
        raise HTTPException(status_code=404, detail="Skill not found")

    return skill


def get_user_skills(db: Session, user_id: int) -> list[UserSkill]:
    return db.query(UserSkill).filter(
        UserSkill.user_id == user_id
    ).all()


def set_user_skill(
    db: Session,
    user_id: int,
    skill_id: int,
    proficiency: float,
) -> UserSkill:
    if not 0 <= proficiency <= 100:
        raise HTTPException(
            status_code=422,
            detail="Proficiency must be between 0 and 100",
        )

    get_skill(db, skill_id)

    item = db.query(UserSkill).filter(
        UserSkill.user_id == user_id,
        UserSkill.skill_id == skill_id,
    ).first()

    if item is None:
        item = UserSkill(
            user_id=user_id,
            skill_id=skill_id,
            proficiency=proficiency,
        )
        db.add(item)
    else:
        item.proficiency = proficiency

    db.commit()
    db.refresh(item)

    return item


def find_skill_by_name(db: Session, name: str) -> Skill:
    skill = resolve_skill(db, name)

    if skill is None:
        raise HTTPException(
            status_code=404,
            detail=f"Skill '{name}' was not found",
        )

    return skill