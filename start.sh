#!/bin/bash
# Startup script with correct gunicorn syntax
PORT=${PORT:-5000}
gunicorn --bind 0.0.0.0:$PORT --workers 1 --timeout 120 app:app