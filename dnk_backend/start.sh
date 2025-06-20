#!/bin/bash
pip install -r requirements.txt  # Bắt buộc nếu không có buildCommand
uvicorn app.main:app --host 0.0.0.0 --port 10000
