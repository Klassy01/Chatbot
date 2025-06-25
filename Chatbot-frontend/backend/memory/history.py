import json
import os

HISTORY_FILE = "chat_history.json"

# Load history if exists
if os.path.exists(HISTORY_FILE):
    with open(HISTORY_FILE, "r", encoding="utf-8") as f:
        history = json.load(f)
else:
    history = {}

def get_history(user_id: str) -> list[str]:
    return history.get(user_id, [])

def update_history(user_id: str, message: str):
    if user_id not in history:
        history[user_id] = []
    history[user_id].append(message)

    # Save to file
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)
