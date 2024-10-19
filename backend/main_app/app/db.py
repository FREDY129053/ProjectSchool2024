import psycopg2

from app.models import EventModel


def db_connect():
    conn = psycopg2.connect(
        dbname="project_school",
        user="postgres",
        password="129053",
        host="postgres_db"
        # host="localhost" - указывает, что сервис запущен внутри этого контейнера с Python. У нас БД вынесена в отдельный контейнер.
        # Поэтому нужно указывать имя контейнера с БД как имя хоста, они в одной сети, так что подключится
    )

    return conn


def get_events():
    conn = db_connect()
    cursor = conn.cursor()
    cursor.execute('SELECT events.id, events.name, events.description, events.age, events.likes, '
                   'events.dislikes, events.min_price, events.photo_url, location.id as location_id, '
                   'location.name as location_name, location.address '
                   'FROM events JOIN location ON events.location_id=location.id')
    desc = cursor.description
    column_names = [col[0] for col in desc]
    data = [dict(zip(column_names, row)) for row in cursor.fetchall()]

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

    events = []
    for ev in data:
        event = EventModel.model_validate(ev)
        events.append(event)

    return events