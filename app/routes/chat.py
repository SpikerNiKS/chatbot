from fastapi import APIRouter

from app.schemas.chat import ChatRequest
from app.services.openrouter import get_ai_response

router = APIRouter()


@router.post("/chat")
async def chat(request: ChatRequest):

    ai_response = await get_ai_response(
        request.message,
        request.model
    )

    return {
        "response": ai_response
    }