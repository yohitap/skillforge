import json
from pathlib import Path

from sqlalchemy.orm import Session

from app.models.job import Job
from app.models.job_skill import JobSkill
from app.models.role import Role
from app.models.skill import Skill
from app.models.skill_alias import SkillAlias
from app.models.skill_dependency import SkillDependency


SEED_DIR = Path(__file__).resolve().parent / "seed"

DEMO_JOBS = [
    {
        "title": "Junior Python Developer",
        "company": "SkillForge Labs",
        "location": "Remote",
        "description": "Build APIs and automation tools with Python.",
        "experience_level": "Junior",
        "role": "Python Developer",
        "skills": ["Python", "FastAPI", "SQL", "Git"],
    },
    {
        "title": "Full-Stack Engineer",
        "company": "Northwind Digital",
        "location": "Hybrid",
        "description": "Ship React frontends and reliable backend services.",
        "experience_level": "Mid",
        "role": "Full-Stack Developer",
        "skills": ["React", "JavaScript", "SQL", "Git"],
    },
]


def seed_catalog(db: Session) -> None:
    if db.query(Skill).count() > 0:
        return

    skills_path = SEED_DIR / "skills.json"
    if skills_path.exists():
        for item in json.loads(skills_path.read_text()):
            skill = Skill(
                name=item["name"],
                category=item.get("category", "General"),
                description=item.get("description"),
                difficulty=item.get("difficulty", "beginner"),
                market_demand=float(item.get("market_demand", 0)),
            )
            db.add(skill)
            db.flush()

            for alias in item.get("aliases", []):
                db.add(
                    SkillAlias(
                        skill_id=skill.id,
                        alias=alias.strip().lower(),
                    )
                )

    deps_path = SEED_DIR / "jobs.json"
    if deps_path.exists():
        skill_by_name = {
            skill.name.lower(): skill.id
            for skill in db.query(Skill).all()
        }

        for item in json.loads(deps_path.read_text()):
            if "skill" not in item:
                continue

            skill_id = skill_by_name.get(item["skill"].lower())
            prereq_name = item.get("prerequisite")
            if not skill_id or not prereq_name:
                continue

            prereq_id = skill_by_name.get(prereq_name.lower())
            if not prereq_id:
                continue

            db.add(
                SkillDependency(
                    skill_id=skill_id,
                    prerequisite_skill_id=prereq_id,
                )
            )

    roles_path = SEED_DIR / "roles.json"
    if roles_path.exists():
        for item in json.loads(roles_path.read_text()):
            db.add(
                Role(
                    name=item["name"],
                    description=item.get("description"),
                )
            )

    db.commit()

    if db.query(Job).count() == 0:
        skill_by_name = {
            skill.name.lower(): skill.id
            for skill in db.query(Skill).all()
        }
        roles = {role.name: role.id for role in db.query(Role).all()}

        for item in DEMO_JOBS:
            job = Job(
                title=item["title"],
                company=item["company"],
                location=item.get("location"),
                description=item.get("description"),
                experience_level=item.get("experience_level"),
                role_id=roles.get(item.get("role")),
            )
            db.add(job)
            db.flush()

            for skill_name in item.get("skills", []):
                skill_id = skill_by_name.get(skill_name.lower())
                if skill_id:
                    db.add(
                        JobSkill(
                            job_id=job.id,
                            skill_id=skill_id,
                            importance=1.0,
                        )
                    )

        db.commit()
