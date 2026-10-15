from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.assessment import Assessment


def calculate_percentage(score: float, max_score: float) -> float:
    if max_score <= 0:
        raise ValueError("Maximum score must be greater than zero")

    if score < 0 or score > max_score:
        raise ValueError("Score must be between zero and maximum score")

    return round(score / max_score * 100, 2)


def grade_assessment(
    score: float,
    max_score: float,
    passing_percentage: float = 60.0,
) -> dict:
    percentage = calculate_percentage(score, max_score)

    return {
        "percentage": percentage,
        "passed": percentage >= passing_percentage,
        "passing_percentage": passing_percentage,
    }


def get_assessment(
    db: Session,
    assessment_id: int,
    user_id: int,
) -> Assessment:
    assessment = db.query(Assessment).filter(
        Assessment.id == assessment_id,
        Assessment.user_id == user_id,
    ).first()

    if assessment is None:
        raise HTTPException(
            status_code=404,
            detail="Assessment not found",
        )

    return assessment


def estimate_proficiency(
    assessment_scores: list[float],
) -> float | None:
    """
    Return a simple average of valid assessment percentages.

    This is an estimate, not verified proficiency.
    """
    valid_scores = [
        max(0.0, min(100.0, float(score)))
        for score in assessment_scores
    ]

    if not valid_scores:
        return None

    return round(sum(valid_scores) / len(valid_scores), 2)