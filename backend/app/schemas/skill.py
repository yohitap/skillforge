from pydantic import BaseModel, ConfigDict, Field


class SkillBase(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    category: str = Field(min_length=1, max_length=100)
    description: str | None = None
    difficulty: str = "beginner"
    market_demand: float = Field(default=0, ge=0, le=1)


class SkillCreate(SkillBase):
    pass


class SkillResponse(SkillBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class UserSkillCreate(BaseModel):
    skill_id: int
    proficiency: float = Field(default=0, ge=0, le=100)
    confidence: float = Field(default=50, ge=0, le=100)


class UserSkillResponse(BaseModel):
    id: int
    user_id: int
    skill_id: int
    proficiency: float
    confidence: float

    model_config = ConfigDict(from_attributes=True)