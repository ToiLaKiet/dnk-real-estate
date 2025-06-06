from sqlalchemy.orm import Session
from datetime import datetime, timedelta, UTC
import random

from app.models.otp_model import OTPCode, OTPTargetType
from app.schemas.otp_schema import OTPRequest

# ⚙️ Tạo OTP ngẫu nhiên
def generate_otp_code(length: int = 6) -> str:
    return ''.join(random.choices('0123456789', k=length))


# ✅ Tạo OTP mới (ghi DB)
def create_otp(db: Session, otp_request: OTPRequest, expires_minutes: int = 5) -> OTPCode:
    # 🧹 Dọn dẹp các OTP đã hết hạn trước khi tạo mới
    delete_expired_otps(db)

    otp_code = generate_otp_code()
    now = datetime.now(UTC)
    expires_at = now + timedelta(minutes=expires_minutes)

    otp_entry = OTPCode(
        target_type=otp_request.target_type,
        target=otp_request.target,
        otp_code=otp_code,
        expires_at=expires_at,
    )

    db.add(otp_entry)
    db.commit()
    db.refresh(otp_entry)
    return otp_entry


# ✅ Lấy OTP mới nhất, chưa dùng, còn hạn
def get_valid_otp(db: Session, target_type: OTPTargetType, target: str) -> OTPCode:
    now = datetime.now(UTC)

    return db.query(OTPCode)\
        .filter(
            OTPCode.target_type == target_type,
            OTPCode.target == target,
            OTPCode.is_used == False,
            OTPCode.expires_at >= now
        )\
        .order_by(OTPCode.created_at.desc())\
        .first()


# ✅ Đánh dấu OTP đã dùng
def mark_otp_as_used(db: Session, otp: OTPCode):
    otp.is_used = True
    db.commit()
    db.refresh(otp)


# 🧹 Xoá các OTP đã hết hạn
def delete_expired_otps(db: Session):
    now = datetime.now(UTC)
    db.query(OTPCode).filter(OTPCode.expires_at < now).delete()
    db.commit()

