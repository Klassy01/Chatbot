from pydantic import BaseModel
from typing import List

class ChatRequest(BaseModel):
    user_id: str
    message: str

class ChatResponse(BaseModel):
    response: str
    chat_history: List[str]
