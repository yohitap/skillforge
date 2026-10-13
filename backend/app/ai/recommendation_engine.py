def generate_recommendations(
    skill_gaps: list[dict],
    limit: int = 5,
) -> list[dict]:
    """
    Turn skill-gap results into prioritized actions.

    Expected fields per item:
      skill_id, skill, gap, importance, priority
    """
    recommendations = []

    priority_rank = {
        "high": 3,
        "medium": 2,
        "low": 1,
    }

    ordered_gaps = sorted(
        skill_gaps,
        key=lambda item: (
            priority_rank.get(item.get("priority", "low"), 1),
            float(item.get("gap", 0))
            * float(item.get("importance", 1)),
        ),
        reverse=True,
    )

    for item in ordered_gaps[:max(0, limit)]:
        skill_name = item.get("skill", "this skill")
        gap = float(item.get("gap", 0))

        if gap >= 60:
            action_type = "learn"
            action = (
                f"Study the fundamentals of {skill_name} and complete "
                "a guided practical exercise."
            )
        elif gap >= 30:
            action_type = "practice"
            action = (
                f"Build a small project using {skill_name} and document "
                "the decisions you made."
            )
        else:
            action_type = "validate"
            action = (
                f"Complete a focused assessment in {skill_name} and "
                "review any weak areas."
            )

        recommendations.append({
            "skill_id": item.get("skill_id"),
            "skill": skill_name,
            "priority": item.get("priority", "low"),
            "gap": round(gap, 2),
            "action_type": action_type,
            "action": action,
            "reason": (
                "Prioritized using the estimated skill gap and the "
                "importance assigned to this skill by the target job."
            ),
        })

    return recommendations