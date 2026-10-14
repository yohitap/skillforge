from pydantic import BaseModel, Field


class SkillGapItem(BaseModel):
    skill_id: int
    skill: str
    required_proficiency: float = Field(ge=0, le=100)
    current_proficiency: float = Field(ge=0, le=100)
    gap: float = Field(ge=0, le=100)
    importance: float = Field(ge=0, le=1)
    priority: str
    suggested_action: str


class SkillGapResponse(BaseModel):
    job_id: int
    job_title: str
    company: str
    overall_weighted_gap: float
    matched_skill_count: int
    required_skill_count: int
    skill_gaps: list[SkillGapItem]
    note: str


class RecommendationItem(BaseModel):
    skill_id: int | None
    skill: str
    priority: str
    gap: float
    action_type: str
    action: str
    reason: str


class RecommendationResponse(BaseModel):
    recommendations: list[RecommendationItem]