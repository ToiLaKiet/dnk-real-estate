from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Literal
from datetime import datetime

OTPType = Literal["phone", "email"]

class OTPRequest(BaseModel):
    target_type: OTPType = Field(..., example="phone")
    target: str = Field(..., example="0909123456")  # hoặc email

class OTPVerifyRequest(BaseModel):
    target_type: OTPType
    target: str
    otp_code: str = Field(..., min_length=6, max_length=6)

class OTPResponse(BaseModel):
    message: str

class OTPRead(BaseModel):
    id: int
    target_type: OTPType
    target: str
    otp_code: str
    is_used: bool
    created_at: datetime
    expires_at: datetime

    model_config = ConfigDict(from_attributes=True)
