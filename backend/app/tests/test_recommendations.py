
from app.services.recommendation_service import build_recommendations
from app.services.readiness_service import calculate_readiness
from app.services.roadmap_service import generate_roadmap


def test_recommendations_prioritize_large_gaps():
    requirements = [
        {
            "skill_id": 1,
            "skill": "Python",
            "required_proficiency": 100,
            "current_proficiency": 20,
            "importance": 1.0,
        },
        {
            "skill_id": 2,
            "skill": "SQL",
            "required_proficiency": 100,
            "current_proficiency": 90,
            "importance": 0.5,
        },
    ]

    result = build_recommendations(requirements)

    assert len(result["recommendations"]) == 2
    assert result["recommendations"][0]["skill"] == "Python"
    assert result["recommendations"][0]["priority"] == "high"
    assert result["readiness"]["readiness_percentage"] < 100


def test_readiness_with_complete_skills():
    requirements = [
        {
            "skill": "Python",
            "required_proficiency": 100,
            "current_proficiency": 100,
            "importance": 1.0,
        }
    ]

    result = calculate_readiness(requirements)

    assert result["readiness_percentage"] == 100
    assert result["readiness_level"] == "strong"


def test_readiness_with_no_requirements():
    result = calculate_readiness([])

    assert result["readiness_percentage"] == 0
    assert result["readiness_level"] == "insufficient_data"


def test_roadmap_contains_prioritized_tasks():
    gaps = [
        {
            "skill_id": 1,
            "skill": "Python",
            "gap": 80,
            "importance": 1.0,
        },
        {
            "skill_id": 2,
            "skill": "SQL",
            "gap": 20,
            "importance": 0.5,
        },
    ]

    result = generate_roadmap(gaps, duration_weeks=4)

    assert result["duration_weeks"] == 4
    assert len(result["tasks"]) == 2
    assert result["tasks"][0]["skill"] == "Python"
    assert result["tasks"][0]["status"] == "pending"


def test_roadmap_with_no_gaps():
    result = generate_roadmap([], duration_weeks=4)

    assert result["tasks"] == []
