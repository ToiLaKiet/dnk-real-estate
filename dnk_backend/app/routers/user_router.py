from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.user_schema import UserCreate, UserLogin, UserRead, UserUpdate, TokenResponse, ChangePasswordRequest
from app.crud import user_crud, otp_crud
from app.database import get_db
from app.utils.auth import get_current_user  # hàm kiểm tra token, mình sẽ hướng dẫn sau
from typing import List

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

# Đăng ký user mới
@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register_user(user_create: UserCreate, db: Session = Depends(get_db)):
    # Tạo user
    user = user_crud.create_user(db, user_create)
    return user

# Đăng nhập, trả về token
@router.post("/login", response_model=TokenResponse)
def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    token = user_crud.login_user(db, login_data)
    return token

# Lấy thông tin user hiện tại theo token
@router.get("/me", response_model=UserRead)
def read_current_user(current_user=Depends(get_current_user)):
    return current_user

# Cập nhật thông tin user hiện tại
@router.put("/me", response_model=UserRead)
def update_current_user(user_update: UserUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    updated_user = user_crud.update_user(db, current_user.user_id, user_update)
    return updated_user


@router.put("/change-password", response_model=UserRead)
def change_password(data: ChangePasswordRequest, db: Session = Depends(get_db)):
    updated_user = user_crud.change_password_by_phone(
        db, phone_number=data.phone_number, new_password=data.new_password
    )
    return updated_user

@router.get("/find", response_model=UserRead)
def find_user(identifier: str, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_email_or_phone(db, identifier)
    if not user:
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng")
    return user

@router.delete("/delete", summary="Xóa tài khoản")
def delete_user(identifier: str, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_email_or_phone(db, identifier)
    if not user:
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng.")

    db.delete(user)
    db.commit()
    return {"message": "Tài khoản đã được xóa thành công."}

@router.get("/list", response_model=List[UserRead], summary="Lấy danh sách tất cả người dùng")
def list_users(db: Session = Depends(get_db)):
    users = user_crud.get_all_users(db)
    return users