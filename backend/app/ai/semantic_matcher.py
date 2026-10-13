import re
from collections import Counter


STOP_WORDS = {
    "a", "an", "the", "and", "or", "of", "to", "for",
    "in", "on", "with", "by", "is", "are", "be", "as",
    "at", "from", "using", "experience", "knowledge",
    "ability", "strong", "good", "working",
}


def tokenize(text: str) -> list[str]:
    words = re.findall(r"[a-zA-Z0-9+#.]+", text.lower())

    return [
        word for word in words
        if word not in STOP_WORDS and len(word) > 1
    ]


def similarity(text_a: str, text_b: str) -> float:
    """
    Calculate a simple cosine similarity between token frequencies.
    Returns a value between 0 and 1.
    """
    tokens_a = Counter(tokenize(text_a))
    tokens_b = Counter(tokenize(text_b))

    if not tokens_a or not tokens_b:
        return 0.0

    common = set(tokens_a) & set(tokens_b)

    dot_product = sum(
        tokens_a[word] * tokens_b[word]
        for word in common
    )

    norm_a = sum(value * value for value in tokens_a.values()) ** 0.5
    norm_b = sum(value * value for value in tokens_b.values()) ** 0.5

    if norm_a == 0 or norm_b == 0:
        return 0.0

    return round(dot_product / (norm_a * norm_b), 4)


def match_skills(
    text: str,
    skills: list[dict],
) -> list[dict]:
    """
    Rank skills by how closely their names and descriptions
    match the supplied text.

    Each skill dictionary should contain 'name' and may contain
    'description' and 'category'.
    """
    matches = []

    for skill in skills:
        searchable_text = " ".join(
            str(skill.get(field) or "")
            for field in ("name", "description", "category")
        )

        score = similarity(text, searchable_text)

        matches.append({
            "skill_id": skill.get("id"),
            "skill": skill.get("name", ""),
            "similarity": score,
        })

    return sorted(
        matches,
        key=lambda item: item["similarity"],
        reverse=True,
    )