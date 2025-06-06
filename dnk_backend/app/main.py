from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, SessionLocal, Base
from app import models  
from sqlalchemy.orm import Session
from app.routers import *

app = FastAPI()

origins = [
    "http://localhost:3000",           # frontend local
    "http://172.16.2.54:3000",         # nếu frontend chạy từ IP backend (máy bạn)
    "http://172.16.2.54:8080",         # để test API trực tiếp từ browser
    "http://<IP máy frontend>:3000",   # nếu frontend ở máy khác
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # Có thể thay bằng ["*"] nếu muốn thử nhanh
    allow_credentials=True,
    allow_methods=["*"],             # Cho phép tất cả method, gồm OPTIONS
    allow_headers=["*"],             # Cho phép tất cả headers (như Content-Type, Authorization,...)
)

#Base.metadata.drop_all(bind=engine) 
Base.metadata.create_all(bind=engine)


app.include_router(user_router.router)
app.include_router(otp_router.router)
app.include_router(property_router.router)
app.include_router(location_router.router)
app.include_router(property_feature_router.router)
app.include_router(property_image_router.router)
app.include_router(property_video_router.router)
app.include_router(category_router.router)
