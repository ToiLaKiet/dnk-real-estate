from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime
from app.database import Base
import enum

class ReportStatusEnum(str, enum.Enum):
    resolved = "resolved"       
    pending = "pending"         # Đang chờ xử lý


class Report(Base):
    __tablename__ = "reports"

    report_id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.property_id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    reason = Column(String, nullable=False)
    description = Column(String, nullable=True)
    status = Column(Enum(ReportStatusEnum), default=ReportStatusEnum.pending)
    created_at = Column(TIMESTAMP, server_default=func.now())

    property = relationship("Property", back_populates="reports")
    user = relationship("User", back_populates="reports")

