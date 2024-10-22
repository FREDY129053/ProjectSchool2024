from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from app.router import router

app = FastAPI(
    docs_url='/docs',
    openapi_url='/openapi.json',
    redoc_url=None
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    'http://localhost:3000',
    'http://127.0.0.1:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=router)

# Добавь APIRouter с префиксом '/api/events', например, чтоб было удобнее воспринимать
# Добавь CORS тоже, чтобы запросы с фронтенда могли без проблем поступать


