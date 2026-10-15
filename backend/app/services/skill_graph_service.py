from sqlalchemy.orm import Session

from app.models.skill import Skill
from app.models.skill_dependency import SkillDependency


def get_prerequisites(
    db: Session,
    skill_id: int,
) -> list[Skill]:
    dependencies = db.query(SkillDependency).filter(
        SkillDependency.skill_id == skill_id
    ).all()

    result = []

    for dependency in dependencies:
        prerequisite_id = getattr(
            dependency, "prerequisite_skill_id", None
        )

        if prerequisite_id is None:
            prerequisite_id = getattr(
                dependency, "depends_on_skill_id", None
            )

        if prerequisite_id is None:
            continue

        skill = db.query(Skill).filter(
            Skill.id == prerequisite_id
        ).first()

        if skill is not None:
            result.append(skill)

    return result


def get_learning_order(
    db: Session,
    skill_ids: list[int],
) -> list[int]:
    """
    Return a prerequisite-first order for the requested skills.

    Raises ValueError if the requested dependency graph contains a cycle.
    Dependencies outside the requested set are not added automatically.
    """
    requested = set(skill_ids)
    visited = set()
    active = set()
    ordered = []

    def visit(skill_id: int):
        if skill_id in visited:
            return

        if skill_id in active:
            raise ValueError("Cycle detected in skill dependencies")

        active.add(skill_id)

        for prerequisite in get_prerequisites(db, skill_id):
            if prerequisite.id in requested:
                visit(prerequisite.id)

        active.remove(skill_id)
        visited.add(skill_id)
        ordered.append(skill_id)

    for skill_id in skill_ids:
        visit(skill_id)

    return ordered