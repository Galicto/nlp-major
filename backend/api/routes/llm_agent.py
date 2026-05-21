from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict
from langchain_agent.agent import process_query

router = APIRouter()

class VoiceCommand(BaseModel):
    audio_base64: str

class LLMQuery(BaseModel):
    query: str
    location: Optional[Dict[str, float]] = None

class IncidentRequest(BaseModel):
    incident_id: str

@router.post("/command")
async def process_voice_command(cmd: VoiceCommand):
    transcribed_text = "Show me zone 4 alerts from the last hour"
    response = process_query(transcribed_text)
    return {"transcript": transcribed_text, "response": response}

@router.post("/chat")
def chat_with_agent(req: LLMQuery):
    response = process_query(req.query, req.location)
    return {"response": response}

@router.post("/report")
async def generate_report(req: IncidentRequest):
    response = process_query(f"Generate an incident report for {req.incident_id}")
    return {"report": response}
