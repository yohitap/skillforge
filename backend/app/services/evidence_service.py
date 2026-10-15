from sqlalchemy.orm import Session

from app.models.evidence import Evidence


EVIDENCE_WEIGHTS = {
    "project": 0.9,
    "assessment": 0.8,
    "certification": 0.8,
    "lab": 0.75,
    "course": 0.5,
    "other": 0.3,
}


def calculate_evidence_strength(
    evidence_type: str,
    has_description: bool,
    has_source_url: bool,
) -> float:
    score = EVIDENCE_WEIGHTS.get(evidence_type.lower(), 0.3)

    if has_description:
        score += 0.05

    if has_source_url:
        score += 0.05

    return round(min(score, 1.0), 2)


def list_user_evidence(
    db: Session,
    user_id: int,
    skill_id: int | None = None,
) -> list[Evidence]:
    query = db.query(Evidence).filter(
        Evidence.user_id == user_id
    )

    if skill_id is not None:
        query = query.filter(Evidence.skill_id == skill_id)

    return query.order_by(Evidence.created_at.desc()).all()


def summarize_evidence(items: list[Evidence]) -> dict:
    return {
        "total": len(items),
        "verified": sum(1 for item in items if item.verified),
        "by_type": {
            evidence_type: sum(
                1 for item in items
                if item.evidence_type == evidence_type
            )
            for evidence_type in sorted({
                item.evidence_type for item in items
            })
        },
    }