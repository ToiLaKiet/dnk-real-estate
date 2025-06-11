from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

from app.models.user_model import User
from app.schemas.user_schema import UserCreate, UserLogin, UserUpdate, TokenResponse
from app.utils.hash import get_password_hash, verify_password
from app.utils.token import create_access_token
from typing import Optional, List
from sqlalchemy import or_

# -------------------------------
# ✅ Đăng ký user mới
def create_user(db: Session, user_data: UserCreate) -> User:
    hashed_password = get_password_hash(user_data.password)

    new_user = User(
        phone_number=user_data.phone_number,
        password_hash=hashed_password,
        role=user_data.role,
        is_phone_number_verified=True
    )
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Số điện thoại đã tồn tại")

# -------------------------------
# ✅ Đăng nhập -> trả về access token
def login_user(db: Session, login_data: UserLogin) -> TokenResponse:
    user = db.query(User).filter(
        (User.phone_number == login_data.login) | (User.email == login_data.login)
    ).first()

    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Thông tin đăng nhập không chính xác")

    access_token = create_access_token(data={"sub": str(user.user_id)})
    return TokenResponse(access_token=access_token)

# -------------------------------
# ✅ Tìm user theo ID
def get_user_by_id(db: Session, user_id: int) -> User:
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Người dùng không tồn tại")
    return user

# -------------------------------
# ✅ Cập nhật thông tin user
def update_user(db: Session, user_id: int, user_update: UserUpdate) -> User:
    user = get_user_by_id(db, user_id)
    for field, value in user_update.model_dump(exclude_unset=True).items():
        setattr(user, field, value)
        if field == "email":
            user.is_email_verified = True 

    db.commit()
    db.refresh(user)
    return user

def get_user_by_phone_or_email(db: Session, target_type: str, target: str) -> Optional[User]:
    if target_type == "phone":
        return db.query(User).filter(User.phone_number == target).first()
    elif target_type == "email":
        return db.query(User).filter(User.email == target).first()
    else:
        return None
    

def change_password_by_phone(db: Session, phone_number: str, new_password: str) -> User:
    user = db.query(User).filter(User.phone_number == phone_number).first()
    if not user:
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng với số điện thoại này")

    user.password_hash = get_password_hash(new_password)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email_or_phone(db: Session, identifier: str) -> Optional[User]:
    return db.query(User).filter(
        or_(User.email == identifier, User.phone_number == identifier)
    ).first()

def get_all_users(db: Session) -> List[User]:
    return db.query(User).all()