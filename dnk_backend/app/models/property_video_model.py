from sqlalchemy import Column, BigInteger, String, Boolean, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class PropertyVideo(Base):
    __tablename__ = "property_videos"

    video_id = Column(BigInteger, primary_key=True, index=True)
    property_id = Column(BigInteger, ForeignKey("properties.property_id"), nullable=False)
    video_url = Column(String(255), nullable=False)
    caption = Column(String(255), nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())