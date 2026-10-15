def calculate_priority(
    gap: float,
    importance: float = 1.0,
) -> dict:
    gap = max(0.0, min(100.0, float(gap)))
    importance = max(0.0, min(1.0, float(importance)))

    if gap >= 60:
        level = "high"
    elif gap >= 30:
        level = "medium"
    else:
        level = "low"

    return {
        "priority": level,
        "priority_score": round(gap * importance, 2),
    }


def rank_skill_gaps(gaps: list[dict]) -> list[dict]:
    ranked = []

    for item in gaps:
        gap = float(item.get("gap", 0))
        importance = float(item.get("importance", 1))

        ranked.append({
            **item,
            **calculate_priority(gap, importance),
        })

    return sorted(
        ranked,
        key=lambda item: item["priority_score"],
        reverse=True,
    )