from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.evidence import Evidence
from app.models.skill import Skill
from app.models.user import User
from app.routes.auth import get_current_user

router = APIRouter(prefix="/evidence", tags=["Evidence"])


class EvidenceCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str | None = None
    evidence_type: str = Field(min_length=1, max_length=50)
    skill_id: int | None = None
    source_url: str | None = None


def serialize_evidence(item: Evidence):
    return {
        "id": item.id,
        "title": item.title,
        "description": item.description,
        "evidence_type": item.evidence_type,
        "skill_id": item.skill_id,
        "skill_name": item.skill.name if item.skill else None,
        "source_url": item.source_url,
        "strength": item.strength,
        "verified": item.verified,
        "created_at": item.created_at,
    }


@router.post("/", status_code=201)
def create_evidence(
    data: EvidenceCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if data.skill_id is not None:
        skill = db.query(Skill).filter(
            Skill.id == data.skill_id
        ).first()

        if not skill:
            raise HTTPException(status_code=404, detail="Skill not found")

    item = Evidence(
        **data.model_dump(),
        user_id=current_user.id,
        strength=0.0,
        verified=False,
    )

    db.add(item)
    db.commit()
    db.refresh(item)

    return serialize_evidence(item)


@router.get("/")
def list_evidence(
    skill_id: int | None = None,
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    query = (
        db.query(Evidence)
        .options(joinedload(Evidence.skill))
        .filter(Evidence.user_id == current_user.id)
    )

    if skill_id is not None:
        query = query.filter(Evidence.skill_id == skill_id)

    items = (
        query.order_by(Evidence.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    return [serialize_evidence(item) for item in items]


@router.delete("/{evidence_id}")
def delete_evidence(
    evidence_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = db.query(Evidence).filter(
        Evidence.id == evidence_id,
        Evidence.user_id == current_user.id,
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Evidence not found")

    db.delete(item)
    db.commit()

    return {"message": "Evidence deleted successfully"}