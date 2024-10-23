import aioredis
from fastapi import Query, APIRouter, Request
from typing import List, Optional
from datetime import datetime, date
from fastapi.params import Cookie
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

from app import db

router = APIRouter(prefix='/events')

@cache()
async def get_cache():
    return 1


@router.post("/")
async def add_fav(request: Request,
                  event_id: int,
                  access_token: str = Query(None)):
    anon_token = request.cookies.get('anonymous_token')
    db.add_favorite(access_token, anon_token, event_id)


@router.get("/favorites")
@cache(expire=300)
async def get_favs(request: Request,
                   access_token: str = Query(None)):
    anon_token = request.cookies.get('anonymous_token')
    events = db.get_events_by_id(db.get_favorite_ids(access_token, anon_token))
    return events


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
async def filtered(theme_id: int,
                   start_date: Optional[date] = None,
                   end_date: Optional[date] = None,
                   tags: list[int] = Query(None),
                   age: list[int] = Query(None),
                   ):
    query = f"""
    SELECT DISTINCT e.id
    FROM events e
    JOIN event_and_themes et ON e.id = et.event_id
    JOIN event_and_dates ed ON e.id = ed.event_id
    JOIN dates d ON ed.date_id = d.id
    WHERE et.theme_id = %s
    """
    params = [theme_id]

    if start_date and end_date:
        query += " AND DATE(d.date) BETWEEN %s AND %s"
        params.append(start_date)
        params.append(end_date)
    elif start_date:
        query += " AND DATE(d.date) = %s"
        params.append(start_date)

    if tags:
        query += """
        AND EXISTS(
            SELECT 1 FROM event_and_tags etg
            WHERE etg.event_id = e.id
            AND etg.tag_id = ANY(%s)
        )
        """
        params.append(tags)

    if age:
        query += " AND e.age = ANY(%s)"
        params.append(age)

    filtered = db.get_events_by_id(db.get_filtered_ids(query, params))
    return filtered


@router.on_event("startup")
async def startup():
    redis = await aioredis.from_url("redis://localhost", encoding="utf-8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")