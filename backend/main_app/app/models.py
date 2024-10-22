from typing import Union

from pydantic import BaseModel


class EventModel(BaseModel):
    id: int
    name: str
    description: str
    age: int
    likes: int
    dislikes: int
    type: dict
    min_price: Union[int, None]
    photo_url: str
    max_price: Union[int, None]
    photo_url_big: str
    location_id: int
    location_name: str
    address: Union[str, None]
    tags: list
    themes: list
    date: list