from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.job import Job
from app.models.job_skill import JobSkill
from app.models.user import User
from app.models.user_skill import UserSkill
from app.routes.auth import get_current_user

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"],
)


@router.get("/skill-gaps/{job_id}")
def analyze_skill_gaps(
    job_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    job = (
        db.query(Job)
        .options(joinedload(Job.skills).joinedload(JobSkill.skill))
        .filter(Job.id == job_id)
        .first()
    )

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    user_skills = {
        item.skill_id: item.proficiency
        for item in db.query(UserSkill)
        .filter(UserSkill.user_id == current_user.id)
        .all()
    }

    results = []
    weighted_gap_sum = 0.0
    total_weight = 0.0

    for requirement in job.skills:
        skill = requirement.skill

        if skill is None:
            continue

        proficiency = user_skills.get(skill.id, 0.0)
        gap = max(0.0, 100.0 - proficiency)
        importance = requirement.importance

        weighted_gap_sum += gap * importance
        total_weight += importance

        if gap >= 60:
            priority = "high"
        elif gap >= 30:
            priority = "medium"
        else:
            priority = "low"

        results.append({
            "skill_id": skill.id,
            "skill": skill.name,
            "required_proficiency": 100,
            "current_proficiency": proficiency,
            "gap": gap,
            "importance": importance,
            "priority": priority,
            "suggested_action": (
                f"Learn and practise {skill.name}, then add a project "
                "or assessment as evidence."
                if gap >= 30
                else f"Practise {skill.name} and validate your proficiency."
            ),
        })

    results.sort(
        key=lambda item: (
            item["gap"] * item["importance"]
        ),
        reverse=True,
    )

    overall_gap = (
        weighted_gap_sum / total_weight
        if total_weight else 0.0
    )

    return {
        "job_id": job.id,
        "job_title": job.title,
        "company": job.company,
        "overall_weighted_gap": round(overall_gap, 2),
        "matched_skill_count": sum(
            1 for item in results if item["gap"] == 0
        ),
        "required_skill_count": len(results),
        "skill_gaps": results,
        "note": (
            "This is a baseline estimate based on self-reported proficiency. "
            "It is not a verified measure of job readiness."
        ),
    }


@router.get("/next-actions")
def get_next_actions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    skills = (
        db.query(UserSkill)
        .options(joinedload(UserSkill.skill))
        .filter(UserSkill.user_id == current_user.id)
        .all()
    )

    if not skills:
        return {
            "message": "Add your skills to receive personalized next actions.",
            "actions": [],
        }

    weak_skills = sorted(
        skills,
        key=lambda item: item.proficiency,
    )[:5]

    actions = []

    for item in weak_skills:
        if item.skill is None:
            continue

        actions.append({
            "skill_id": item.skill.id,
            "skill": item.skill.name,
            "current_proficiency": item.proficiency,
            "action": (
                f"Complete a practical exercise in {item.skill.name} "
                "and record the result as evidence."
            ),
        })

    return {
        "user_id": current_user.id,
        "actions": actions,
    }