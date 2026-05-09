from fastapi import APIRouter

from app.schemas.chat import ChatRequest
from app.services.openrouter import get_ai_response
from app.db.mongodb import chat_collection

from datetime import datetime

router = APIRouter()


@router.post("/chat")
async def chat(request: ChatRequest):

    ai_response = await get_ai_response(
        request.message,
        request.model
    )

    print("Before insert")

    chat_collection.insert_one({
        "user_message": request.message,
        "ai_response": ai_response,
        "model": request.model,
        "created_at": datetime.utcnow()
    })

    print("After insert")

    return {
        "response": ai_response
    }

@router.get("/chat-history")
async def get_chat_history():

    chats = list(
        chat_collection.find(
            {},
            {
                "_id": 0
            }
        ).sort("created_at", -1)
    )

    return {
        "messages": chats
    }

@router.delete("/chat-history")
async def delete_chat_history():

    chat_collection.delete_many({})

    return {
        "message": "Chat history deleted successfully"
    }