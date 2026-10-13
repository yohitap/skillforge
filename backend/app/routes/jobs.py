from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.job import Job
from app.models.job_skill import JobSkill
from app.models.role import Role
from app.models.skill import Skill

router = APIRouter(prefix="/jobs", tags=["Jobs"])


class JobCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    company: str = Field(min_length=1, max_length=200)
    location: str | None = None
    description: str | None = None
    experience_level: str | None = None
    source_url: str | None = None
    role_id: int | None = None


class JobSkillInput(BaseModel):
    skill_id: int
    importance: float = Field(default=1.0, ge=0, le=1)


class JobSkillsUpdate(BaseModel):
    skills: list[JobSkillInput]


def serialize_job(job: Job):
    return {
        "id": job.id,
        "title": job.title,
        "company": job.company,
        "location": job.location,
        "description": job.description,
        "experience_level": job.experience_level,
        "source_url": job.source_url,
        "role_id": job.role_id,
        "role": job.role.name if job.role else None,
        "skills": [
            {
                "id": item.skill.id,
                "name": item.skill.name,
                "category": item.skill.category,
                "importance": item.importance,
            }
            for item in job.skills
            if item.skill is not None
        ],
    }


@router.get("/")
def list_jobs(
    search: str | None = None,
    role_id: int | None = None,
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
):
    query = db.query(Job).options(
        joinedload(Job.role),
        joinedload(Job.skills).joinedload(JobSkill.skill),
    )

    if search:
        term = f"%{search.strip()}%"
        query = query.filter(
            Job.title.ilike(term) | Job.company.ilike(term)
        )

    if role_id is not None:
        query = query.filter(Job.role_id == role_id)

    jobs = query.order_by(Job.id.desc()).offset(offset).limit(limit).all()

    return {
        "items": [serialize_job(job) for job in jobs],
        "count": len(jobs),
    }


@router.get("/{job_id}")
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = (
        db.query(Job)
        .options(
            joinedload(Job.role),
            joinedload(Job.skills).joinedload(JobSkill.skill),
        )
        .filter(Job.id == job_id)
        .first()
    )

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return serialize_job(job)


@router.post("/", status_code=201)
def create_job(
    data: JobCreate,
    db: Session = Depends(get_db),
):
    # Development/demo endpoint. Add administrator authorization
    # before exposing job creation in production.
    if data.role_id is not None:
        role = db.query(Role).filter(Role.id == data.role_id).first()
        if not role:
            raise HTTPException(status_code=404, detail="Role not found")

    job = Job(**data.model_dump())
    db.add(job)
    db.commit()
    db.refresh(job)

    return serialize_job(job)


@router.put("/{job_id}/skills")
def set_job_skills(
    job_id: int,
    data: JobSkillsUpdate,
    db: Session = Depends(get_db),
):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    skill_ids = [item.skill_id for item in data.skills]

    if len(skill_ids) != len(set(skill_ids)):
        raise HTTPException(
            status_code=400,
            detail="Duplicate skill IDs are not allowed",
        )

    if skill_ids:
        found_ids = {
            skill_id
            for (skill_id,) in db.query(Skill.id)
            .filter(Skill.id.in_(skill_ids))
            .all()
        }

        if found_ids != set(skill_ids):
            raise HTTPException(
                status_code=404,
                detail="One or more skills were not found",
            )

    db.query(JobSkill).filter(JobSkill.job_id == job_id).delete(
        synchronize_session=False
    )

    for item in data.skills:
        db.add(
            JobSkill(
                job_id=job_id,
                skill_id=item.skill_id,
                importance=item.importance,
            )
        )

    db.commit()

    return {
        "message": "Job requirements updated",
        "job_id": job_id,
        "skill_count": len(data.skills),
    }