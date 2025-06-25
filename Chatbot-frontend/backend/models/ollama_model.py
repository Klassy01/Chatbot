import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3:8b"

def get_ollama_response(prompt: str) -> str:
    try:
        # Optional system instruction to ensure English-only replies
        payload = {
            "model": MODEL_NAME,
            "prompt": prompt,
            "system": "You are an intelligent assistant. Always reply in English.",
            "stream": False
        }

        response = requests.post(
            OLLAMA_URL,
            json=payload,
            timeout=120  # increase if needed
        )

        if response.status_code == 200:
            result = response.json()
            return result.get("response", "⚠️ No response text").strip()

        return f"❌ Error: Ollama returned status code {response.status_code}"

    except requests.exceptions.Timeout:
        return "❌ Timeout: Ollama did not respond within 60 seconds."
    except requests.exceptions.ConnectionError:
        return "❌ Connection error: Unable to reach Ollama at localhost:11434."
    except Exception as e:
        return f"❌ Unexpected error while contacting Ollama: {e}"
