from sqlalchemy import Column, BigInteger, String, Boolean, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy.orm import relationship

class PropertyVideo(Base):
    __tablename__ = "property_videos"

    video_id = Column(BigInteger, primary_key=True, index=True)
    property_id = Column(BigInteger, ForeignKey("properties.property_id"), nullable=False)
    video_url = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    property = relationship("Property", back_populates="videos")
