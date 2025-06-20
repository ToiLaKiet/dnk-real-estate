from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, SessionLocal, Base
from app import models  
from sqlalchemy.orm import Session
from app.routers import *
from app.utils.tracking_middleware import track_visitor
from app.database import get_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://dnk-real-estate.vercel.app"],           
    allow_credentials=True,
    allow_methods=["*"],             # Cho phép tất cả method, gồm OPTIONS
    allow_headers=["*"],             # Cho phép tất cả headers (như Content-Type, Authorization,...)
)

#Base.metadata.drop_all(bind=engine) 
Base.metadata.create_all(bind=engine)

@app.middleware("http")
async def track_middleware(request: Request, call_next):
    with SessionLocal() as db:
        await track_visitor(request, db)
    response = await call_next(request)
    return response

app.include_router(user_router.router)
app.include_router(otp_router.router)
app.include_router(news_router.router)
app.include_router(property_router.router)
app.include_router(recommend_router.router)
app.include_router(favorite_router.router)
app.include_router(report_router.router)
app.include_router(stats_router.router)
app.include_router(location_router.router)
app.include_router(contact_router.router)
app.include_router(property_feature_router.router)
app.include_router(property_image_router.router)
app.include_router(property_video_router.router)


