# LLaMA Chatbot Backend

## Setup

```bash
pip install -r requirements.txt
ollama run llama3  # In a separate terminal
uvicorn main:app --reload
