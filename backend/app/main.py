
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine

# Import every model so SQLAlchemy registers its tables.
from app.models import (  # noqa: F401
    Assessment,
    Evidence,
    Job,
    JobSkill,
    Progress,
    Project,
    Roadmap,
    Role,
    Skill,
    SkillAlias,
    SkillDependency,
    User,
    UserSkill,
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
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Convenient for local development. Use Alembic migrations in production.
if getattr(settings, "AUTO_CREATE_TABLES", True):
    Base.metadata.create_all(bind=engine)

    from app.core.database import SessionLocal
    from app.seed_loader import seed_catalog

    with SessionLocal() as db:
        seed_catalog(db)

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
