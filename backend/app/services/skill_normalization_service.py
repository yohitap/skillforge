import re
from sqlalchemy.orm import Session

from app.models.skill import Skill
from app.models.skill_alias import SkillAlias


BUILT_IN_ALIASES = {
    "js": "javascript",
    "javascript": "javascript",
    "reactjs": "react",
    "react.js": "react",
    "py": "python",
    "cpp": "c++",
    "nodejs": "node.js",
    "node.js": "node.js",
    "postgres": "postgresql",
    "mongo db": "mongodb",
    "cyber security": "cybersecurity",
    "infosec": "cybersecurity",
    "ml": "machine learning",
    "fast api": "fastapi",
}


def normalize_text(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"\s+", " ", value)
    return value


def normalize_skill_name(name: str) -> str:
    normalized = normalize_text(name)
    return BUILT_IN_ALIASES.get(normalized, normalized)


def resolve_skill(db: Session, name: str) -> Skill | None:
    normalized = normalize_skill_name(name)

    skills = db.query(Skill).all()

    for skill in skills:
        if normalize_skill_name(skill.name) == normalized:
            return skill

    aliases = db.query(SkillAlias).all()

    for alias in aliases:
        alias_value = getattr(alias, "alias", None)
        skill_id = getattr(alias, "skill_id", None)

        if alias_value and normalize_text(alias_value) == normalized:
            return db.query(Skill).filter(
                Skill.id == skill_id
            ).first()

    return None


def normalize_skill_list(names: list[str]) -> list[str]:
    """Normalize and deduplicate a list while preserving its order."""
    result = []
    seen = set()

    for name in names:
        normalized = normalize_skill_name(name)

        if normalized and normalized not in seen:
            result.append(normalized)
            seen.add(normalized)

    return result