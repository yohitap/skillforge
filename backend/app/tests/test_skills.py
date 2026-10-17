
from app.services.skill_normalization_service import (
    normalize_skill_list,
    normalize_skill_name,
    normalize_text,
)


def test_normalize_text():
    assert normalize_text("  Python   Programming ") == "python programming"


def test_normalize_common_aliases():
    assert normalize_skill_name("JS") == "javascript"
    assert normalize_skill_name("ReactJS") == "react"
    assert normalize_skill_name("PY") == "python"
    assert normalize_skill_name("Fast API") == "fastapi"


def test_unknown_skill_is_normalized():
    assert normalize_skill_name("  Kubernetes ") == "kubernetes"


def test_normalize_skill_list_removes_duplicates():
    skills = ["Python", "PY", "JavaScript", "JS", "SQL"]

    result = normalize_skill_list(skills)

    assert result == ["python", "javascript", "sql"]


def test_normalize_skill_list_preserves_order():
    result = normalize_skill_list(["Docker", "Python", "Git"])

    assert result == ["docker", "python", "git"]


def test_empty_skill_names_are_ignored():
    result = normalize_skill_list(["Python", "", "  ", "PY"])

    assert result == ["python"]
