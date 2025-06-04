from sqlalchemy import Column, BigInteger, String, Text, Numeric, Enum, TIMESTAMP, ForeignKey, Index
from sqlalchemy.sql import func
from app.database import Base
import enum

# Enum Python ánh xạ ENUM PostgreSQL
class PropertyTypeEnum(str, enum.Enum):
    sell = "sell"
    rent = "rent"
    project = "project"


class PropertyStatusEnum(str, enum.Enum):
    available = "available"
    sold = "sold"
    rented = "rented"
    pending = "pending"

class Property(Base):
    __tablename__ = "properties"
    
    property_id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(BigInteger, ForeignKey("users.user_id"), nullable=False)
    category_id = Column(BigInteger, ForeignKey("categories.category_id"), nullable=False)
    location_id = Column(String, ForeignKey("locations.location_id"), nullable=False, index=True)  
    title = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Numeric(15, 2), nullable=False, index=True)  # thêm index tại cột price
    area = Column(Numeric(10, 2), nullable=False, index=True)   # thêm index tại cột area
    address = Column(Text, nullable=False)
    property_type = Column(Enum(PropertyTypeEnum), nullable=False)
    status = Column(Enum(PropertyStatusEnum), default=PropertyStatusEnum.available)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        Index('idx_price', 'price'),
        Index('idx_area', 'area'),
    )