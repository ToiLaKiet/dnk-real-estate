from fastapi import FastAPI 
from app.database import engine, SessionLocal, Base
from app import models  
from sqlalchemy.orm import Session
from app.routers import *



app = FastAPI()

#Base.metadata.drop_all(bind=engine) 



Base.metadata.create_all(bind=engine)


app.include_router(user_router.router)
app.include_router(property_router.router)
app.include_router(location_router.router)
app.include_router(property_feature_router.router)
app.include_router(property_image_router.router)
app.include_router(property_video_router.router)
app.include_router(category_router.router)
