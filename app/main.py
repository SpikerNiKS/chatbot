from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.routes.chat import router as chat_router
from app.config import AVAILABLE_MODELS

app = FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), name="static")

templates = Jinja2Templates(directory="app/templates")

app.include_router(chat_router)


@app.get("/")
async def home(request: Request):

    return templates.TemplateResponse(
    request=request,
    name="index.html",
    context={
        "models": AVAILABLE_MODELS
    }
)