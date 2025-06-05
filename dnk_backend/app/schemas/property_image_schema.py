from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class PropertyImageBase(BaseModel):
    image_url: str
    caption: Optional[str] = None
    is_primary: bool = False

class PropertyImageCreate(PropertyImageBase):
    property_id: Optional[int] = None

class PropertyImageRead(PropertyImageBase):
    image_id: int
    property_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)