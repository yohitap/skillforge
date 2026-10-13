from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.assessment import Assessment
from app.models.evidence import Evidence
from app.models.progress import Progress
from app.models.project import Project
from app.models.roadmap import Roadmap
from app.models.user import User
from app.models.user_skill import UserSkill
from app.routes.auth import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/")
def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    skills = db.query(UserSkill).filter(
        UserSkill.user_id == current_user.id
    ).all()

    evidence_count = db.query(Evidence).filter(
        Evidence.user_id == current_user.id
    ).count()

    project_count = db.query(Project).filter(
        Project.user_id == current_user.id
    ).count()

    assessment_count = db.query(Assessment).filter(
        Assessment.user_id == current_user.id
    ).count()

    roadmaps = db.query(Roadmap).filter(
        Roadmap.user_id == current_user.id
    ).all()

    tasks = db.query(Progress).filter(
        Progress.user_id == current_user.id
    ).all()

    average_proficiency = (
        sum(item.proficiency for item in skills) / len(skills)
        if skills else 0.0
    )

    completed_tasks = sum(
        1 for task in tasks if task.status == "completed"
    )

    roadmap_summaries = []

    for roadmap in roadmaps:
        roadmap_tasks = [
            task for task in tasks
            if task.roadmap_id == roadmap.id
        ]

        completion = (
            sum(task.completion_percentage for task in roadmap_tasks)
            / len(roadmap_tasks)
            if roadmap_tasks else 0.0
        )

        roadmap_summaries.append({
            "id": roadmap.id,
            "title": roadmap.title,
            "target_role": roadmap.target_role,
            "status": roadmap.status,
            "task_count": len(roadmap_tasks),
            "completed_tasks": sum(
                1 for task in roadmap_tasks
                if task.status == "completed"
            ),
            "progress_percentage": round(completion, 2),
        })

    return {
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "target_role": current_user.target_role,
        },
        "summary": {
            "skills_tracked": len(skills),
            "average_self_reported_proficiency": round(
                average_proficiency, 2
            ),
            "evidence_items": evidence_count,
            "projects": project_count,
            "assessments_completed": assessment_count,
            "roadmaps": len(roadmaps),
            "tasks_completed": completed_tasks,
            "total_tasks": len(tasks),
        },
        "roadmaps": roadmap_summaries,
    }