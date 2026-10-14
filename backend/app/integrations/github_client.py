import httpx

from app.core.config import settings


class GitHubClient:
    def __init__(self):
        self.base_url = settings.GITHUB_API_URL.rstrip("/")
        self.timeout = 15.0

    async def _get(self, endpoint: str):
        headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }

        async with httpx.AsyncClient(
            timeout=self.timeout,
            follow_redirects=True,
        ) as client:
            response = await client.get(
                f"{self.base_url}{endpoint}",
                headers=headers,
            )

        if response.status_code == 404:
            return None

        response.raise_for_status()
        return response.json()

    async def get_user(self, username: str) -> dict | None:
        username = username.strip()

        if not username or "/" in username:
            raise ValueError("Provide a valid GitHub username")

        data = await self._get(f"/users/{username}")

        if data is None:
            return None

        return {
            "username": data.get("login"),
            "name": data.get("name"),
            "bio": data.get("bio"),
            "public_repositories": data.get("public_repos", 0),
            "followers": data.get("followers", 0),
            "profile_url": data.get("html_url"),
        }

    async def get_repositories(
        self,
        username: str,
        limit: int = 30,
    ) -> list[dict]:
        username = username.strip()

        if not username or "/" in username:
            raise ValueError("Provide a valid GitHub username")

        limit = max(1, min(limit, 100))

        data = await self._get(
            f"/users/{username}/repos"
            f"?per_page={limit}&sort=updated"
        )

        if data is None:
            return []

        return [
            {
                "name": repo.get("name"),
                "description": repo.get("description"),
                "language": repo.get("language"),
                "stars": repo.get("stargazers_count", 0),
                "forks": repo.get("forks_count", 0),
                "url": repo.get("html_url"),
                "updated_at": repo.get("updated_at"),
                "topics": repo.get("topics", []),
            }
            for repo in data
        ]


github_client = GitHubClient()