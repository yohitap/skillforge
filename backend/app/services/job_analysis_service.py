from sqlalchemy.orm import Session, joinedload

from app.models.job import Job
from app.models.job_skill import JobSkill
from app.models.user_skill import UserSkill


def analyze_job(
    db: Session,
    job_id: int,
    user_id: int,
) -> dict:
    job = (
        db.query(Job)
        .options(joinedload(Job.skills).joinedload(JobSkill.skill))
        .filter(Job.id == job_id)
        .first()
    )

    if job is None:
        raise ValueError("Job not found")

    proficiency_by_skill = {
        item.skill_id: item.proficiency
        for item in db.query(UserSkill).filter(
            UserSkill.user_id == user_id
        ).all()
    }

    requirements = []

    for requirement in job.skills:
        skill = requirement.skill

        if skill is None:
            continue

        current = float(proficiency_by_skill.get(skill.id, 0))
        importance = float(requirement.importance)

        requirements.append({
            "skill_id": skill.id,
            "skill": skill.name,
            "current_proficiency": current,
            "required_proficiency": 100.0,
            "gap": max(0.0, 100.0 - current),
            "importance": importance,
        })

    return {
        "job_id": job.id,
        "title": job.title,
        "company": job.company,
        "requirements": requirements,
    }