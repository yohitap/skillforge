from app.services.priority_service import rank_skill_gaps


def generate_roadmap(
    skill_gaps: list[dict],
    duration_weeks: int = 8,
) -> dict:
    duration_weeks = max(1, min(104, duration_weeks))
    ranked = rank_skill_gaps(skill_gaps)

    if not ranked:
        return {
            "duration_weeks": duration_weeks,
            "tasks": [],
            "message": "Add skill requirements to generate a roadmap.",
        }

    tasks = []
    total = len(ranked)

    for index, item in enumerate(ranked):
        week = min(
            duration_weeks,
            (index * duration_weeks // total) + 1,
        )

        skill_name = item.get("skill", "Unknown skill")
        gap = item.get("gap", 0)

        tasks.append({
            "week": week,
            "skill_id": item.get("skill_id"),
            "skill": skill_name,
            "priority": item.get("priority", "low"),
            "task_title": f"Improve {skill_name}",
            "activities": [
                f"Study the core concepts of {skill_name}.",
                f"Complete a practical exercise in {skill_name}.",
                f"Record project or assessment evidence for {skill_name}.",
            ],
            "estimated_gap": gap,
            "status": "pending",
        })

    tasks.sort(key=lambda task: (task["week"], -task["estimated_gap"]))

    return {
        "duration_weeks": duration_weeks,
        "tasks": tasks,
        "message": (
            "This is a suggested roadmap. Adjust it to your schedule "
            "and validate progress through practical evidence."
        ),
    }