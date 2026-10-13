import httpx

from app.core.config import settings


class LLMClient:
    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        self.base_url = "https://api.openai.com/v1"
        self.model = "gpt-4o-mini"
        self.timeout = 30.0

    @property
    def available(self) -> bool:
        return bool(self.api_key)

    async def generate(
        self,
        prompt: str,
        system_prompt: str = (
            "You are SkillForge, an assistant that helps users "
            "identify career skill gaps and develop practical skills."
        ),
    ) -> str | None:
        if not self.available:
            return None

        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.3,
        }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        try:
            async with httpx.AsyncClient(
                timeout=self.timeout
            ) as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    json=payload,
                    headers=headers,
                )
                response.raise_for_status()
                data = response.json()

            return data["choices"][0]["message"]["content"].strip()

        except (httpx.HTTPError, KeyError, IndexError, TypeError):
            # Keep the core application usable if the AI service fails.
            return None


llm_client = LLMClient()