from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.progress import Progress
from app.models.roadmap import Roadmap
from app.models.user import User
from app.routes.auth import get_current_user

router = APIRouter(prefix="/roadmaps", tags=["Roadmaps"])


class RoadmapCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    target_role: str | None = None
    description: str | None = None
    duration_weeks: int = Field(default=8, ge=1, le=104)


class TaskCreate(BaseModel):
    task_title: str = Field(min_length=1, max_length=250)
    task_type: str = "learning"
    skill_id: int | None = None


class TaskUpdate(BaseModel):
    completion_percentage: float = Field(ge=0, le=100)


def serialize_task(task: Progress):
    return {
        "id": task.id,
        "task_title": task.task_title,
        "task_type": task.task_type,
        "skill_id": task.skill_id,
        "completion_percentage": task.completion_percentage,
        "status": task.status,
        "completed_at": task.completed_at,
    }


def serialize_roadmap(roadmap: Roadmap):
    tasks = sorted(roadmap.progress, key=lambda item: item.id)

    average = (
        sum(task.completion_percentage for task in tasks) / len(tasks)
        if tasks else 0
    )

    return {
        "id": roadmap.id,
        "title": roadmap.title,
        "target_role": roadmap.target_role,
        "description": roadmap.description,
        "duration_weeks": roadmap.duration_weeks,
        "status": roadmap.status,
        "progress_percentage": round(average, 2),
        "tasks": [serialize_task(task) for task in tasks],
        "created_at": roadmap.created_at,
    }


def get_owned_roadmap(
    roadmap_id: int,
    user_id: int,
    db: Session,
):
    roadmap = db.query(Roadmap).filter(
        Roadmap.id == roadmap_id,
        Roadmap.user_id == user_id,
    ).first()

    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")

    return roadmap


@router.post("/", status_code=201)
def create_roadmap(
    data: RoadmapCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    roadmap = Roadmap(
        **data.model_dump(),
        user_id=current_user.id,
    )

    db.add(roadmap)
    db.commit()
    db.refresh(roadmap)

    return serialize_roadmap(roadmap)


@router.get("/")
def list_roadmaps(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    roadmaps = (
        db.query(Roadmap)
        .filter(Roadmap.user_id == current_user.id)
        .order_by(Roadmap.created_at.desc())
        .all()
    )

    return [serialize_roadmap(item) for item in roadmaps]


@router.get("/{roadmap_id}")
def get_roadmap(
    roadmap_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    roadmap = get_owned_roadmap(
        roadmap_id, current_user.id, db
    )

    return serialize_roadmap(roadmap)


@router.post("/{roadmap_id}/tasks", status_code=201)
def create_task(
    roadmap_id: int,
    data: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    roadmap = get_owned_roadmap(
        roadmap_id, current_user.id, db
    )

    task = Progress(
        user_id=current_user.id,
        roadmap_id=roadmap.id,
        task_title=data.task_title,
        task_type=data.task_type,
        skill_id=data.skill_id,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return serialize_task(task)


@router.patch("/{roadmap_id}/tasks/{task_id}")
def update_task(
    roadmap_id: int,
    task_id: int,
    data: TaskUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    get_owned_roadmap(roadmap_id, current_user.id, db)

    task = db.query(Progress).filter(
        Progress.id == task_id,
        Progress.user_id == current_user.id,
        Progress.roadmap_id == roadmap_id,
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.completion_percentage = data.completion_percentage

    if task.completion_percentage == 100:
        task.status = "completed"
        if task.completed_at is None:
            task.mark_completed()
    elif task.completion_percentage > 0:
        task.status = "in_progress"
        task.completed_at = None
    else:
        task.status = "pending"
        task.completed_at = None

    db.commit()
    db.refresh(task)

    return serialize_task(task)


@router.delete("/{roadmap_id}/tasks/{task_id}")
def delete_task(
    roadmap_id: int,
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    get_owned_roadmap(roadmap_id, current_user.id, db)

    task = db.query(Progress).filter(
        Progress.id == task_id,
        Progress.user_id == current_user.id,
        Progress.roadmap_id == roadmap_id,
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Roadmap task deleted"}