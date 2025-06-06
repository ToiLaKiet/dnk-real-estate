from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.sql import func
from app.database import Base
import enum

# Enum để phân loại OTP gửi cho số điện thoại hay email
class OTPTargetType(str, enum.Enum):
    phone = "phone"
    email = "email"

class OTPCode(Base):
    __tablename__ = "otp_codes"

    id = Column(Integer, primary_key=True, index=True)
    target_type = Column(Enum(OTPTargetType), nullable=False)  # 'phone' hoặc 'email'
    target = Column(String(80), nullable=False, index=True)  # SĐT hoặc Email
    otp_code = Column(String(6), nullable=False)
    is_used = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=False)
    failed_attempts = Column(Integer, default=0)

    def __repr__(self):
        return f"<OTPCode(target={self.target}, otp_code={self.otp_code}, used={self.is_used})>"