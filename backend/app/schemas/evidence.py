from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class EvidenceCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str | None = None
    evidence_type: str = Field(min_length=1, max_length=50)
    skill_id: int | None = None
    source_url: HttpUrl | None = None


class EvidenceUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    description: str | None = None
    evidence_type: str | None = Field(default=None, max_length=50)
    source_url: HttpUrl | None = None


class EvidenceResponse(BaseModel):
    id: int
    user_id: int
    skill_id: int | None
    title: str
    description: str | None
    evidence_type: str
    source_url: str | None
    strength: float
    verified: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)