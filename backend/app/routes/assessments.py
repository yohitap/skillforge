from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.assessment import Assessment
from app.models.skill import Skill
from app.models.user import User
from app.routes.auth import get_current_user

router = APIRouter(prefix="/assessments", tags=["Assessments"])


class AssessmentCreate(BaseModel):
    skill_id: int
    title: str = Field(min_length=1, max_length=200)
    score: float = Field(ge=0)
    max_score: float = Field(gt=0)
    difficulty: str = "beginner"


def serialize_assessment(item: Assessment):
    return {
        "id": item.id,
        "skill_id": item.skill_id,
        "skill_name": item.skill.name if item.skill else None,
        "title": item.title,
        "score": item.score,
        "max_score": item.max_score,
        "percentage": round(
            item.score / item.max_score * 100, 2
        ) if item.max_score > 0 else 0,
        "difficulty": item.difficulty,
        "completed_at": item.completed_at,
    }


@router.post("/", status_code=201)
def create_assessment(
    data: AssessmentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if data.score > data.max_score:
        raise HTTPException(
            status_code=422,
            detail="Score cannot exceed maximum score",
        )

    skill = db.query(Skill).filter(
        Skill.id == data.skill_id
    ).first()

    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    assessment = Assessment(
        **data.model_dump(),
        user_id=current_user.id,
    )

    db.add(assessment)
    db.commit()
    db.refresh(assessment)

    return serialize_assessment(assessment)


@router.get("/")
def list_assessments(
    skill_id: int | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    query = (
        db.query(Assessment)
        .options(joinedload(Assessment.skill))
        .filter(Assessment.user_id == current_user.id)
    )

    if skill_id is not None:
        query = query.filter(Assessment.skill_id == skill_id)

    results = query.order_by(
        Assessment.completed_at.desc()
    ).all()

    return [serialize_assessment(item) for item in results]


@router.get("/{assessment_id}")
def get_assessment(
    assessment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = (
        db.query(Assessment)
        .options(joinedload(Assessment.skill))
        .filter(
            Assessment.id == assessment_id,
            Assessment.user_id == current_user.id,
        )
        .first()
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Assessment not found",
        )

    return serialize_assessment(item)