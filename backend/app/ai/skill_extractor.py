import re


DEFAULT_SKILLS = {
    "python": ["python", "python programming"],
    "javascript": ["javascript", "js", "ecmascript"],
    "typescript": ["typescript", "ts"],
    "java": ["java"],
    "c++": ["c++", "cpp"],
    "c": ["c programming", "c language"],
    "sql": ["sql", "structured query language"],
    "html": ["html", "html5"],
    "css": ["css", "css3"],
    "react": ["react", "react.js", "reactjs"],
    "node.js": ["node.js", "nodejs"],
    "fastapi": ["fastapi", "fast api"],
    "flask": ["flask"],
    "django": ["django"],
    "git": ["git", "version control"],
    "docker": ["docker", "containerization"],
    "linux": ["linux"],
    "networking": ["networking", "computer networks"],
    "cybersecurity": ["cybersecurity", "cyber security"],
    "penetration testing": ["penetration testing", "pentesting"],
    "owasp": ["owasp", "owasp top 10"],
    "machine learning": ["machine learning", "ml"],
    "data analysis": ["data analysis", "data analytics"],
    "pandas": ["pandas"],
    "numpy": ["numpy"],
    "mongodb": ["mongodb", "mongo db"],
    "postgresql": ["postgresql", "postgres"],
    "aws": ["aws", "amazon web services"],
    "rest api": ["rest api", "restful api", "rest apis"],
}


def _contains_phrase(text: str, phrase: str) -> bool:
    pattern = r"(?<!\w)" + re.escape(phrase.lower()) + r"(?!\w)"
    return re.search(pattern, text.lower()) is not None


def extract_skills(
    text: str,
    catalog: list[dict] | None = None,
) -> list[dict]:
    """
    Extract recognized skills from text.

    Catalog entries may contain:
      id, name, category, aliases

    When a catalog is supplied, it is the source of recognized
    skill names. Otherwise, built-in aliases are used.
    """
    if not text or not text.strip():
        return []

    results = []

    if catalog is None:
        for canonical_name, aliases in DEFAULT_SKILLS.items():
            found_alias = next(
                (
                    alias for alias in aliases
                    if _contains_phrase(text, alias)
                ),
                None,
            )

            if found_alias:
                results.append({
                    "name": canonical_name,
                    "matched_text": found_alias,
                })

        return results

    for skill in catalog:
        name = str(skill.get("name") or "").strip()

        if not name:
            continue

        aliases = skill.get("aliases") or []
        candidates = [name, *aliases]

        found_alias = next(
            (
                str(alias)
                for alias in candidates
                if alias and _contains_phrase(text, str(alias))
            ),
            None,
        )

        if found_alias:
            results.append({
                "id": skill.get("id"),
                "name": name,
                "category": skill.get("category"),
                "matched_text": found_alias,
            })

    return results