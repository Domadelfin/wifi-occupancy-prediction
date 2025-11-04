FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential curl libpq-dev bash && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["bash", "-c", "python manage.py migrate --noinput && gunicorn wifi_occupancy_prediction_project.wsgi:application --bind 0.0.0.0:${PORT:-8000}"]