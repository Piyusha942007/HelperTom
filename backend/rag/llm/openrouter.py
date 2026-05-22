import requests
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")


def generate_openrouter_response(prompt):

    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": 300
        },
        timeout=60
    )

    result = response.json()

    print("\nOPENROUTER RESPONSE:\n")
    print(result)

    if "choices" in result:
        return result["choices"][0]["message"]["content"]

    return f"OpenRouter Error: {result}"