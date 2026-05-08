import httpx

from app.config import OPENROUTER_API_KEY


async def get_ai_response(message: str, model: str):

    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": model,
        "messages": [
            {
                "role": "user",
                "content": message
            }
        ]
    }

    try:

        async with httpx.AsyncClient(timeout=60.0) as client:

            response = await client.post(
                url,
                headers=headers,
                json=payload
            )

        data = response.json()

        return data["choices"][0]["message"]["content"]

    except httpx.ReadTimeout:

        return "The AI model took too long to respond."

    except Exception as e:

        return f"Error: {str(e)}"