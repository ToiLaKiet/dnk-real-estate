from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import datetime
from app.models.user_model import UserRoleEnum

# -------------------------------
# ✅ Schema cơ bản: base
class UserBase(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone_number: str
    tax_number: Optional[str] = None
    company_name: Optional[str] = None
    address: Optional[str] = None
    role: Optional[UserRoleEnum] = UserRoleEnum.buyer

# -------------------------------
# ✅ Schema khi đăng ký
class UserCreate(BaseModel):
    phone_number: str = Field(..., example="0909123456")
    password: str = Field(..., min_length=6)
    role: str

# -------------------------------
# ✅ Schema khi đăng nhập
class UserLogin(BaseModel):
    login: str = Field(..., example="email@example.com or 0909123456")  # có thể là email hoặc SĐT
    password: str

# -------------------------------
# ✅ Schema khi hiển thị thông tin người dùng
class UserRead(UserBase):
    user_id: int
    is_email_verified: bool
    is_phone_number_verified: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

# -------------------------------
# ✅ Schema để cập nhật thông tin người dùng
class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    tax_number: Optional[str] = None
    company_name: Optional[str] = None
    address: Optional[str] = None


class ChangePasswordRequest(BaseModel):
    phone_number: str
    new_password: str = Field(..., min_length=6)

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"