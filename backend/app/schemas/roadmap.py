from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class RoadmapCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    target_role: str | None = None
    description: str | None = None
    duration_weeks: int = Field(default=8, ge=1, le=104)


class RoadmapResponse(BaseModel):
    id: int
    user_id: int
    title: str
    target_role: str | None
    description: str | None
    duration_weeks: int
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RoadmapTaskCreate(BaseModel):
    task_title: str = Field(min_length=1, max_length=250)
    task_type: str = "learning"
    skill_id: int | None = None


class RoadmapTaskUpdate(BaseModel):
    completion_percentage: float = Field(ge=0, le=100)


class RoadmapTaskResponse(BaseModel):
    id: int
    user_id: int
    roadmap_id: int | None
    skill_id: int | None
    task_title: str
    task_type: str
    completion_percentage: float
    status: str
    completed_at: datetime | None

    model_config = ConfigDict(from_attributes=True)