FROM python:3.9

WORKDIR /code

COPY . .

RUN pip install fastapi
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

CMD ["fastapi", "run", "--workers", "4", "app/main.py"]
