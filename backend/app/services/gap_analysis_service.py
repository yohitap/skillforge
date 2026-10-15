def calculate_skill_gap(
    required_proficiency: float,
    current_proficiency: float,
) -> float:
    required = max(0.0, min(100.0, required_proficiency))
    current = max(0.0, min(100.0, current_proficiency))

    return round(max(0.0, required - current), 2)


def analyze_gaps(requirements: list[dict]) -> dict:
    results = []
    weighted_gap = 0.0
    total_weight = 0.0

    for requirement in requirements:
        required = float(
            requirement.get("required_proficiency", 100)
        )
        current = float(
            requirement.get("current_proficiency", 0)
        )
        importance = max(
            0.0,
            float(requirement.get("importance", 1)),
        )

        gap = calculate_skill_gap(required, current)

        if gap >= 60:
            priority = "high"
        elif gap >= 30:
            priority = "medium"
        else:
            priority = "low"

        weighted_gap += gap * importance
        total_weight += importance

        results.append({
            **requirement,
            "gap": gap,
            "priority": priority,
        })

    results.sort(
        key=lambda item: item["gap"] * item["importance"],
        reverse=True,
    )

    return {
        "overall_weighted_gap": round(
            weighted_gap / total_weight if total_weight else 0,
            2,
        ),
        "matched_skill_count": sum(
            1 for item in results if item["gap"] == 0
        ),
        "required_skill_count": len(results),
        "skill_gaps": results,
    }