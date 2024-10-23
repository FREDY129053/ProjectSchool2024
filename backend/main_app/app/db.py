import time
from base64 import b64decode
from os.path import curdir

import jwt
import psycopg2
from dns.e164 import query

from app.models import EventModel


def db_connect():
    conn = psycopg2.connect(
        dbname="project_school",
        user="postgres",
        password="129053",
        host="postgres_db"
        # host="localhost"
    )

    return conn


def get_all_events():
    conn = db_connect()
    cursor = conn.cursor()
    cursor.execute('SELECT events.id, events.name, events.description, events.age, events.likes, '
                   'events.dislikes, events.min_price, events.photo_url, events.max_price, events.photo_url_big, '
                   'location.id as location_id, location.name as location_name, location.address '
                   'FROM events JOIN location ON events.location_id=location.id')
    desc = cursor.description
    column_names = [col[0] for col in desc]
    data = [dict(zip(column_names, row)) for row in cursor.fetchall()]

    data = add_type_tags_dates(data)

    events = []
    for ev in data:
        event = EventModel.model_validate(ev)
        events.append(event)

    cursor.close()
    conn.close()
    return events


def get_events_by_id(event_ids):
    conn = db_connect()
    cursor = conn.cursor()
    query = ""
    events = []

    if len(event_ids) != 0:
        for id in event_ids:
            query += f"OR events.id={id} "
        query = query[3:]

        cursor.execute(f'SELECT events.id, events.name, events.description, events.age, events.likes, events.dislikes, '
                       f'events.min_price, events.photo_url, events.max_price, events.photo_url_big, '
                       f'location.id as location_id, location.name as location_name, location.address '
                       f'FROM events JOIN location ON events.location_id=location.id '
                       f'WHERE {query}')
        desc = cursor.description
        column_names = [col[0] for col in desc]
        data = [dict(zip(column_names, row)) for row in cursor.fetchall()]

        data = add_type_tags_dates(data)

        for ev in data:
            event = EventModel.model_validate(ev)
            events.append(event)

    cursor.close()
    conn.close()
    return events


def get_filtered_ids(ages=[], themes=[], tags=[], dates=[], type=[], locations=[]):
    filters1 = {"theme": themes, "tag": tags, "date": dates}
    filters2 = {"type_id": type, "age": ages, "location_id": locations}
    ids = set()

    conn = db_connect()
    cursor = conn.cursor()

    for filter in filters1:
        if filters1[filter] is not None:
            data = set()
            for value in filters1[filter]:
                cursor.execute(f"SELECT event_and_{filter}s.event_id FROM event_and_{filter}s "
                               f"WHERE event_and_{filter}s.{filter}_id={value}")

                for id in cursor.fetchall():
                    data.add(id[0])

            ids = update_ids(filters1[filter], ids, data)

    for filter in filters2:
        if filters2[filter] is not None:
            data = set()
            for value in filters2[filter]:
                cursor.execute(f"SELECT events.id FROM events "
                               f"WHERE events.{filter}={value}")

                for id in cursor.fetchall():
                    data.add(id[0])

            ids = update_ids(filters2[filter], ids, data)

    return list(ids)


def add_favorite(access_token, anon_token, event_id):
    conn = db_connect()
    cursor = conn.cursor()

    query, uuid = favorites_query(access_token, anon_token)

    if anon_token != uuid:
        cursor.execute(f"INSERT INTO favorites (event_id, anonym_uuid, user_uuid) "
                       f"VALUES ({event_id}, '{anon_token}', '{uuid}');")
    else:
        cursor.execute(f"INSERT INTO favorites (event_id, anonym_uuid) "
                       f"VALUES ({event_id}, '{anon_token}');")

    conn.commit()

    cursor.close()
    conn.close()


def get_favorite_ids(access_token, anon_token):
    conn = db_connect()
    cursor = conn.cursor()
    data = []

    query, uuid = favorites_query(access_token, anon_token)

    cursor.execute(f"SELECT favorites.event_id FROM favorites "
                   f"WHERE favorites.{query}='{uuid}'")
    for id in cursor.fetchall():
        data.append(id[0])

    cursor.close()
    conn.close()
    return data


def favorites_query(access_token, anon_token):
    if access_token is not None:
        query = "user_uuid"
        number = jwt.decode(access_token, b64decode('thingsboardDefaultSigningKey'), algorithms=["HS256"],
                            options={'verify_signature': False})['phone']
        uuid = ""

        conn = db_connect()
        cursor = conn.cursor()

        cursor.execute(f"SELECT users.uuid FROM users "
                       f"WHERE users.phone_number='{number}'")
        for id in cursor.fetchall():
           uuid = id[0]
    else:
        query = "anonym_uuid"
        uuid = anon_token

    return query, uuid


def update_ids(filter, ids, data):
    if len(filter) != 0:
        if len(ids) != 0:
            ids = set(ids & data)
        else:
            ids = data

    return ids


def add_type_tags_dates(data):
    conn = db_connect()
    cursor = conn.cursor()

    for event in data:
        cursor.execute(f'SELECT type.id as type_id, type.name as type_name '
                       f'FROM events JOIN type ON events.type_id=type.id '
                       f'WHERE events.id={event["id"]}')
        type_id_name = cursor.fetchone()
        type = {"type_id": type_id_name[0], "type_name": type_id_name[1]}
        event.update({"type": type})

        cursor.execute(f'SELECT tags.id as tag_id, tags.name as tag_name '
                       f'FROM event_and_tags JOIN tags ON event_and_tags.tag_id=tags.id '
                       f'WHERE event_and_tags.event_id={event["id"]}')
        tags = [dict(zip(["tag_id", "tag_name"], row)) for row in cursor.fetchall()]
        event.update({"tags": tags})

        cursor.execute(f'SELECT themes.id as theme_id, themes.name as theme_name '
                       f'FROM event_and_themes JOIN themes ON event_and_themes.theme_id=themes.id '
                       f'WHERE event_and_themes.event_id={event["id"]}')
        themes = [dict(zip(["theme_id", "theme_name"], row)) for row in cursor.fetchall()]
        event.update({"themes": themes})

        cursor.execute(f'SELECT dates.id as date_id, dates.date '
                       f'FROM event_and_dates JOIN dates ON event_and_dates.date_id=dates.id '
                       f'WHERE event_and_dates.event_id={event["id"]}')
        dates = [dict(zip(["date_id", "date"], row)) for row in cursor.fetchall()]
        event.update({"date": dates})

    cursor.close()
    conn.close()
    return data
