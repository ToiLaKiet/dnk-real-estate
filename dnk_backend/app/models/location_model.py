from sqlalchemy import Column, BigInteger, String, Enum, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
import enum

# Enum Python tương ứng với ENUM trong PostgreSQL
class LocationTypeEnum(str, enum.Enum):
    province = "province"
    district = "district"
    ward = "ward"

class Location(Base):
    __tablename__ = "locations"

    location_id = Column(String, primary_key=True)
    parent_id = Column(String, ForeignKey("locations.location_id"), nullable=True)
    name = Column(String(100), nullable=False)
    type = Column(Enum(LocationTypeEnum), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
