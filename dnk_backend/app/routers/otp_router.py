import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.otp_schema import OTPRequest, OTPVerifyRequest
from app.crud import otp_crud, user_crud
from app.database import get_db

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/otp",
    tags=["OTP"]
)

@router.post("/send", summary="Gửi mã OTP đến số điện thoại/email và có kiểm tra sự tồn tại")
def send_otp(request: OTPRequest, db: Session = Depends(get_db)):
    # Kiểm tra xem phone/email đã tồn tại chưa
    existing_user = user_crud.get_user_by_phone_or_email(db, request.target_type, request.target)
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail=f"{'Số điện thoại' if request.target_type == 'phone' else 'Email'} đã được đăng ký"
        )

    otp_entry = otp_crud.create_otp(db, request)
    logger.info(f"OTP gửi đến {request.target_type} '{request.target}': {otp_entry.otp_code}")
    print(f"OTP gửi đến {request.target_type} '{request.target}': {otp_entry.otp_code}")
    return {"message": "OTP đã được gửi thành công."}

@router.post("/send-forgot-password", summary="Gửi mã OTP đến số điện thoại/email")
def send_forgot_password_otp(request: OTPRequest, db: Session = Depends(get_db)):
    otp_entry = otp_crud.create_otp(db, request)
    logger.info(f"OTP gửi đến {request.target_type} '{request.target}': {otp_entry.otp_code}")
    print(f"OTP gửi đến {request.target_type} '{request.target}': {otp_entry.otp_code}")
    return {"message": "OTP đã được gửi thành công."}


@router.post("/verify", summary="Xác minh mã OTP")
def verify_otp(request: OTPVerifyRequest, db: Session = Depends(get_db)):
    # Lấy OTP hợp lệ
    otp_entry = otp_crud.get_valid_otp(db, request.target_type, request.target)

    if not otp_entry or otp_entry.otp_code != request.otp_code:
        raise HTTPException(status_code=400, detail="Mã OTP không hợp lệ hoặc đã hết hạn.")

    # Đánh dấu OTP đã dùng
    otp_crud.mark_otp_as_used(db, otp_entry)

    # Nếu user đã tồn tại, cập nhật trạng thái xác minh
    existing_user = user_crud.get_user_by_phone_or_email(db, request.target_type, request.target)

    if existing_user:
        if request.target_type == "phone":
            existing_user.is_phone_number_verified = True
            print(f"Đã bật cờ phone")
        elif request.target_type == "email":
            existing_user.is_email_verified = True
            print(f"Đã bật cờ email")
        db.commit()

    return {"message": "Mã OTP hợp lệ."}

