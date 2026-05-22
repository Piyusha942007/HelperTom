from llm.gemini import generate_gemini_response
from llm.openrouter import generate_openrouter_response


def generate_llm_response(prompt):

    try:
        print("Using Gemini...")

        return generate_gemini_response(prompt)

    except Exception as e:

        print("Gemini failed:", e)

        print("Switching to OpenRouter...")

        return generate_openrouter_response(prompt)