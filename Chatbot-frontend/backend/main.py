from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas.chat_schema import ChatRequest, ChatResponse
from models.ollama_model import get_ollama_response
from memory.history import get_history, update_history

app = FastAPI()

# ✅ FIX: Allow all origins for now (or specify yours)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:3000"] in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "DeepSeek Chatbot API running."}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    user_input = req.message
    user_id = req.user_id

    update_history(user_id, f"You: {user_input}")
    reply = get_ollama_response(user_input)
    update_history(user_id, f"Bot: {reply}")

    return ChatResponse(
        response=reply,
        chat_history=get_history(user_id)
    )
