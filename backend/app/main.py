from fastapi import FastAPI

from backend.app import db

app = FastAPI()


@app.get("/")
async def root():
    events = db.get_events()
    return events