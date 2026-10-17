
import pytest

from app.services.gap_analysis_service import (
    analyze_gaps,
    calculate_skill_gap,
)


def test_calculate_skill_gap():
    assert calculate_skill_gap(100, 40) == 60
    assert calculate_skill_gap(80, 80) == 0
    assert calculate_skill_gap(50, 75) == 0


def test_gap_values_are_bounded():
    assert calculate_skill_gap(100, -10) == 100
    assert calculate_skill_gap(100, 120) == 0


def test_analyze_gaps_returns_weighted_gap():
    requirements = [
        {
            "skill_id": 1,
            "skill": "Python",
            "required_proficiency": 100,
            "current_proficiency": 40,
            "importance": 1.0,
        },
        {
            "skill_id": 2,
            "skill": "SQL",
            "required_proficiency": 100,
            "current_proficiency": 80,
            "importance": 0.5,
        },
    ]

    result = analyze_gaps(requirements)

    # (60 * 1.0 + 20 * 0.5) / (1.0 + 0.5)
    assert result["overall_weighted_gap"] == pytest.approx(46.67, abs=0.01)
    assert result["matched_skill_count"] == 0
    assert result["required_skill_count"] == 2


def test_analyze_gaps_ranks_larger_weighted_gaps_first():
    requirements = [
        {
            "skill_id": 1,
            "skill": "SQL",
            "required_proficiency": 100,
            "current_proficiency": 90,
            "importance": 0.5,
        },
        {
            "skill_id": 2,
            "skill": "Python",
            "required_proficiency": 100,
            "current_proficiency": 20,
            "importance": 1.0,
        },
    ]

    result = analyze_gaps(requirements)

    assert result["skill_gaps"][0]["skill"] == "Python"
    assert result["skill_gaps"][0]["priority"] == "high"


def test_empty_requirements():
    result = analyze_gaps([])

    assert result["required_skill_count"] == 0
    assert result["matched_skill_count"] == 0
    assert result["overall_weighted_gap"] == 0
    assert result["skill_gaps"] == []
