from fastapi import FastAPI

from app import db


app = FastAPI(
    docs_url='/docs',
    openapi_url='/openapi.json',
    redoc_url=None
)

# Добавь APIRouter с префиксом '/api/events', например, чтоб было удобнее воспринимать
# Добавь CORS тоже, чтобы запросы с фронтенда могли без проблем поступать

@app.get("/")
async def root():
    events = db.get_events()
    return events
