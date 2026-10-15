def calculate_readiness(requirements: list[dict]) -> dict:
    if not requirements:
        return {
            "readiness_percentage": 0.0,
            "readiness_level": "insufficient_data",
            "message": "No skill requirements are available.",
        }

    weighted_score = 0.0
    total_weight = 0.0

    for item in requirements:
        current = max(
            0.0,
            min(100.0, float(item.get("current_proficiency", 0))),
        )
        required = max(
            0.0,
            min(100.0, float(item.get("required_proficiency", 100))),
        )
        weight = max(0.0, float(item.get("importance", 1)))

        if required == 0:
            score = 100.0
        else:
            score = min(100.0, current / required * 100)

        weighted_score += score * weight
        total_weight += weight

    if total_weight == 0:
        return {
            "readiness_percentage": 0.0,
            "readiness_level": "insufficient_data",
            "message": "Skill importance weights are unavailable.",
        }

    readiness = round(weighted_score / total_weight, 2)

    if readiness >= 85:
        level = "strong"
        message = "Your declared skills align well with the requirements."
    elif readiness >= 65:
        level = "developing"
        message = "Strengthen your remaining skill gaps."
    else:
        level = "early_stage"
        message = "Focus on the highest-priority foundational gaps."

    return {
        "readiness_percentage": readiness,
        "readiness_level": level,
        "message": message,
        "disclaimer": (
            "An estimate based on declared proficiency, not a guarantee "
            "of hiring success or verified job readiness."
        ),
    }