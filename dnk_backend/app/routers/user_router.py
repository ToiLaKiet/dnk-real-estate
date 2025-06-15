from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.user_schema import UserCreate, UserLogin, UserRead, UserUpdate, TokenResponse, ChangePasswordRequest, ForgetPasswordRequest
from app.crud import user_crud, otp_crud
from app.database import get_db
from app.utils.auth import get_current_user, get_current_admin_user
from app.models.user_model import User
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
def login_user(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    login_data = UserLogin(login=username, password=password)
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

@router.delete("/me", summary="Xóa tài khoản người dùng")
def delete_user(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user_to_delete = db.query(User).filter(User.user_id == current_user.user_id).first()
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user_to_delete)
    db.commit()
    return {"message": "Tài khoản đã được xóa thành công."}

@router.put("/change-password")
def change_password(password_data: ChangePasswordRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):

    if current_user.phone_number != password_data.phone_number:
        return HTTPException(status_code=403, detail="Bạn không thể đổi mật khẩu cho người khác!")
    
    result = user_crud.change_password(db, password_data.phone_number, password_data.old_password, password_data.new_password)

    if result is None:
        return HTTPException(status_code=400, detail="Mật khẩu cũ không đúng!")

    return result

@router.put("/forget-password", response_model=UserRead)
def forget_password(data: ForgetPasswordRequest, db: Session = Depends(get_db)):
    updated_user = user_crud.forget_password_by_phone(
        db, phone_number=data.phone_number, new_password=data.new_password
    )
    return updated_user

@router.get("/find", response_model=UserRead)
def find_user(identifier: str, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_email_or_phone(db, identifier)
    if not user:
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng")
    return user

@router.delete("/delete", summary="Xóa tài khoản dành cho admin")
def delete_user_by_admin(identifier: str, db: Session = Depends(get_db), admin_user = Depends(get_current_admin_user)):
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

@router.get("/{user_id}", response_model=UserRead, summary="Tìm người dùng theo user_id")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_id(db, user_id)
    
    if not user:  # Nếu không tìm thấy user, trả về lỗi
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng")
    
    return user