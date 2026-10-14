from pydantic import BaseModel, ConfigDict, Field


class JobBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    company: str = Field(min_length=1, max_length=200)
    location: str | None = None
    description: str | None = None
    experience_level: str | None = None
    source_url: str | None = None
    role_id: int | None = None


class JobCreate(JobBase):
    pass


class JobResponse(JobBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class JobSkillCreate(BaseModel):
    skill_id: int
    importance: float = Field(default=1, ge=0, le=1)


class JobSkillResponse(BaseModel):
    id: int
    job_id: int
    skill_id: int
    importance: float

    model_config = ConfigDict(from_attributes=True)


class JobSkillRequirements(BaseModel):
    skills: list[JobSkillCreate]