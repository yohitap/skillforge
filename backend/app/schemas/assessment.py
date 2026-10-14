from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class AssessmentCreate(BaseModel):
    skill_id: int
    title: str = Field(min_length=1, max_length=200)
    score: float = Field(ge=0)
    max_score: float = Field(gt=0)
    difficulty: str = "beginner"


class AssessmentResponse(BaseModel):
    id: int
    user_id: int
    skill_id: int
    title: str
    score: float
    max_score: float
    difficulty: str
    completed_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AssessmentResult(BaseModel):
    assessment: AssessmentResponse
    percentage: float = Field(ge=0, le=100)
    passed: bool