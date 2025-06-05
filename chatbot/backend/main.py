from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import subprocess
import whisper
import os
import uuid
from typing import Optional

app = FastAPI()

# CORS Configuration for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Whisper model
whisper_model = whisper.load_model("base")

def query_ollama(prompt: str, image_path: Optional[str] = None) -> str:
    """Query Ollama LLaMA3 model"""
    command = ["ollama", "run", "llama3", prompt]
    
    if image_path:
        command.extend(["--image", image_path])
    
    try:
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip() or "No response from model."
    except subprocess.CalledProcessError as e:
        return f"Ollama Error: {e.stderr.strip() or e.stdout.strip()}"
    except Exception as e:
        return f"Unexpected Error: {str(e)}"

@app.post("/chat/")
async def chat(
    text: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    audio: Optional[UploadFile] = File(None),
):
    temp_files = []
    
    try:
        # Process audio input
        if audio:
            audio_ext = os.path.splitext(audio.filename)[1]
            audio_path = f"/tmp/{uuid.uuid4()}{audio_ext}"
            temp_files.append(audio_path)
            
            with open(audio_path, "wb") as f:
                f.write(await audio.read())
                
            transcription = whisper_model.transcribe(audio_path)
            text_input = transcription.get("text", "").strip()
            
            if not text_input:
                return JSONResponse(
                    status_code=400,
                    content={"error": "Audio transcription failed"}
                )

        # Process image input
        elif image:
            image_ext = os.path.splitext(image.filename)[1]
            image_path = f"/tmp/{uuid.uuid4()}{image_ext}"
            temp_files.append(image_path)
            
            with open(image_path, "wb") as f:
                f.write(await image.read())
                
            text_input = text.strip() if text else "Describe this image"
            response = query_ollama(text_input, image_path)
            return JSONResponse(content={"response": response})

        # Process text input
        elif text:
            text_input = text.strip()
            if not text_input:
                return JSONResponse(
                    status_code=400,
                    content={"error": "Empty text input"}
                )
        else:
            return JSONResponse(
                status_code=400,
                content={"error": "No input provided"}
            )

        # Query the model
        response = query_ollama(text_input)
        return JSONResponse(content={"response": response})

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": f"Server error: {str(e)}"}
        )
    finally:
        # Cleanup
        for path in temp_files:
            try:
                if os.path.exists(path):
                    os.remove(path)
            except:
                pass