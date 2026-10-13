from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.skill import Skill
from app.models.user import User
from app.models.user_skill import UserSkill
from app.routes.auth import get_current_user

router = APIRouter(prefix="/skills", tags=["Skills"])


class SkillCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    category: str = Field(min_length=1, max_length=100)
    description: str | None = None
    difficulty: str = "beginner"
    market_demand: float = Field(default=0, ge=0, le=1)


class UserSkillUpdate(BaseModel):
    proficiency: float = Field(ge=0, le=100)
    confidence: float = Field(default=50, ge=0, le=100)


def serialize_skill(skill: Skill):
    return {
        "id": skill.id,
        "name": skill.name,
        "category": skill.category,
        "description": skill.description,
        "difficulty": skill.difficulty,
        "market_demand": skill.market_demand,
    }


@router.get("/")
def list_skills(
    search: str | None = None,
    category: str | None = None,
    limit: int = Query(default=100, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
):
    query = db.query(Skill)

    if search:
        query = query.filter(Skill.name.ilike(f"%{search.strip()}%"))

    if category:
        query = query.filter(Skill.category.ilike(category.strip()))

    skills = query.order_by(Skill.name).offset(offset).limit(limit).all()

    return {
        "items": [serialize_skill(skill) for skill in skills],
        "count": len(skills),
    }


@router.post("/", status_code=201)
def create_skill(
    data: SkillCreate,
    db: Session = Depends(get_db),
):
    # Public catalog creation is suitable for development only.
    # Protect this endpoint with admin authorization before deployment.
    name = data.name.strip()

    existing = db.query(Skill).filter(
        Skill.name.ilike(name)
    ).first()

    if existing:
        raise HTTPException(status_code=409, detail="Skill already exists")

    skill = Skill(
        name=name,
        category=data.category.strip(),
        description=data.description,
        difficulty=data.difficulty,
        market_demand=data.market_demand,
    )

    db.add(skill)
    db.commit()
    db.refresh(skill)

    return serialize_skill(skill)


@router.get("/me")
def get_my_skills(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    entries = (
        db.query(UserSkill)
        .filter(UserSkill.user_id == current_user.id)
        .all()
    )

    return [
        {
            "skill_id": entry.skill.id,
            "name": entry.skill.name,
            "category": entry.skill.category,
            "proficiency": entry.proficiency,
            "confidence": entry.confidence,
        }
        for entry in entries
        if entry.skill is not None
    ]


@router.put("/{skill_id}/me")
def update_my_skill(
    skill_id: int,
    data: UserSkillUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()

    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    entry = db.query(UserSkill).filter(
        UserSkill.user_id == current_user.id,
        UserSkill.skill_id == skill_id,
    ).first()

    if entry is None:
        entry = UserSkill(
            user_id=current_user.id,
            skill_id=skill_id,
            proficiency=data.proficiency,
            confidence=data.confidence,
        )
        db.add(entry)
    else:
        entry.proficiency = data.proficiency
        entry.confidence = data.confidence

    db.commit()
    db.refresh(entry)

    return {
        "message": "Skill proficiency saved",
        "skill_id": skill_id,
        "proficiency": entry.proficiency,
        "confidence": entry.confidence,
    }