from google import genai
from dotenv import load_dotenv
import os

# Load environment variables absolutely
backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
env_path = os.path.join(backend_dir, ".env")
load_dotenv(dotenv_path=env_path)

# Get Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)


def generate_gemini_response(prompt):

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )

    return response.text

