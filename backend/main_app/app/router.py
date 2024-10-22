import aioredis
from fastapi import FastAPI, Query, APIRouter
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

from app import db

router = APIRouter(prefix='/events')

@cache()
async def get_cache():
    return 1


@router.get("/")
@cache(expire=300)
async def all_events():
    events = db.get_all_events()
    return events


@router.get("/id={id}")
@cache(expire=300)
async def event_by_id(id: int):
    event = db.get_events_by_id([id])
    return event


@router.get("/filtered")
@cache(expire=300)
async def filtered(ages: list[int] = Query(None),
                      themes: list[int] = Query(None),
                      tags: list[int] = Query(None),
                      dates: list[int] = Query(None),
                      type: list[int] = Query(None),
                      locations: list[int] = Query(None)):
    filtered = db.get_events_by_id(db.get_filtered_ids(ages, themes, tags, dates, type, locations))
    return filtered


@router.on_event("startup")
async def startup():
    redis = await aioredis.from_url("redis://localhost", encoding="utf-8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")