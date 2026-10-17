
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine

# Import every model so SQLAlchemy registers its tables.
from app.models import (  # noqa: F401
    assessment,
    assessment_result,
    activity,
    certification,
    evidence,
    github_repository,
    job,
    job_skill,
    learning_resource,
    notification,
    progress,
    project,
    resume,
    roadmap,
    role,
    skill,
    skill_alias,
    skill_dependency,
    user,
    user_skill,
)

from app.routes import (
    assessments,
    auth,
    dashboard,
    evidence as evidence_routes,
    jobs,
    projects,
    recommendations,
    roadmap as roadmap_routes,
    skills,
    users,
)

app = FastAPI(
    title="SkillForge API",
    description=(
        "A skill intelligence platform for tracking skills, "
        "analyzing career gaps, and generating learning roadmaps."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=getattr(
        settings,
        "CORS_ORIGINS",
        ["http://localhost:5173"],
    ),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Convenient for local development. Use Alembic migrations in production.
if getattr(settings, "AUTO_CREATE_TABLES", True):
    Base.metadata.create_all(bind=engine)

routers = [
    auth.router,
    users.router,
    skills.router,
    jobs.router,
    evidence_routes.router,
    projects.router,
    assessments.router,
    roadmap_routes.router,
    recommendations.router,
    dashboard.router,
]

for api_router in routers:
    app.include_router(api_router, prefix="/api")


@app.get("/")
def root():
    return {
        "name": "SkillForge API",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
