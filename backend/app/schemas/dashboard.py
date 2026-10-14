from pydantic import BaseModel


class DashboardUser(BaseModel):
    id: int
    name: str
    target_role: str | None = None


class DashboardSummary(BaseModel):
    skills_tracked: int
    average_self_reported_proficiency: float
    evidence_items: int
    projects: int
    assessments_completed: int
    roadmaps: int
    tasks_completed: int
    total_tasks: int


class DashboardRoadmap(BaseModel):
    id: int
    title: str
    target_role: str | None
    status: str
    task_count: int
    completed_tasks: int
    progress_percentage: float


class DashboardResponse(BaseModel):
    user: DashboardUser
    summary: DashboardSummary
    roadmaps: list[DashboardRoadmap]