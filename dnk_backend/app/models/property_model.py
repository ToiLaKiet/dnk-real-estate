from sqlalchemy import Column, BigInteger, String, Text, Numeric, Enum, TIMESTAMP, ForeignKey, Index, Boolean
from sqlalchemy.sql import func
from app.database import Base
import enum
from sqlalchemy.orm import relationship

class PropertyTypeEnum(str, enum.Enum):
    sell = "sell"
    rent = "rent"
    project = "project"

class PropertyStatusEnum(str, enum.Enum):
    available = "available"     # Đang rao bán hoặc cho thuê
    sold = "sold"               # Đã bán
    rented = "rented"           # Đã cho thuê
    pending = "pending"         # Đang chờ xử lý
    inactive = "inactive"       # Đã ẩn hoặc bị khóa
    rejected = "rejected"       # Đã bị từ chối
    
class Property(Base):
    __tablename__ = "properties"

    property_id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(BigInteger, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    location_id = Column(String, ForeignKey("locations.location_id"), nullable=False, index=True)

    category = Column(String(55), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Numeric(15, 2), nullable=False)
    area = Column(Numeric(10, 2), nullable=False)
    address = Column(Text, nullable=False)
    lat = Column(Numeric(9, 6), nullable=True)
    lng = Column(Numeric(9, 6), nullable=True)

    property_type = Column(Enum(PropertyTypeEnum), nullable=False)
    status = Column(Enum(PropertyStatusEnum), default=PropertyStatusEnum.pending)
    expire_at = Column(TIMESTAMP, nullable=True)

    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    
    features = relationship("PropertyFeature", back_populates="property", cascade="all, delete-orphan")
    images = relationship("PropertyImage", back_populates="property", cascade="all, delete-orphan")
    videos = relationship("PropertyVideo", back_populates="property", cascade="all, delete-orphan")
    contact = relationship("Contact", back_populates="property", uselist=False, cascade="all, delete")

    reports = relationship("Report", back_populates="property", cascade="all, delete-orphan")
    user = relationship("User", back_populates="properties")

    __table_args__ = (
        Index('idx_price', 'price'),
        Index('idx_area', 'area'),
        Index('idx_location_lat_lng', 'location_id', 'lat', 'lng'),
    )