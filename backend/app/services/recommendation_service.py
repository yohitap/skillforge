from app.services.gap_analysis_service import analyze_gaps
from app.services.priority_service import rank_skill_gaps
from app.services.readiness_service import calculate_readiness


def build_recommendations(requirements: list[dict]) -> dict:
    gap_analysis = analyze_gaps(requirements)
    ranked = rank_skill_gaps(gap_analysis["skill_gaps"])

    recommendations = []

    for item in ranked:
        skill_name = item.get("skill", "this skill")
        gap = item["gap"]

        if gap >= 60:
            action = (
                f"Learn the fundamentals of {skill_name} and complete "
                "a guided practical exercise."
            )
        elif gap >= 30:
            action = (
                f"Build a small project using {skill_name} and document "
                "your implementation."
            )
        elif gap > 0:
            action = (
                f"Practise {skill_name} and validate your knowledge "
                "with an assessment."
            )
        else:
            action = (
                f"Maintain your {skill_name} skills and collect "
                "evidence of practical proficiency."
            )

        recommendations.append({
            **item,
            "action": action,
            "reason": (
                "Ranked using the estimated skill gap and the importance "
                "of the skill for the selected role."
            ),
        })

    return {
        **gap_analysis,
        "readiness": calculate_readiness(requirements),
        "recommendations": recommendations,
    }