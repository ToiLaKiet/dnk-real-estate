from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime

class ContactBase(BaseModel):
    name: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None  

class ContactCreate(ContactBase):
    property_id: Optional[int] = None

class ContactUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None

class ContactRead(ContactBase):
    contact_id: int
    property_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)