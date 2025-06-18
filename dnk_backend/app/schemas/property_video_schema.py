from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class PropertyVideoBase(BaseModel):
    video_url: str

class PropertyVideoCreate(PropertyVideoBase):
    property_id:  Optional[int] = None

class PropertyVideoUpdate(BaseModel):
    video_url: Optional[str] = None

class PropertyVideoRead(PropertyVideoBase):
    video_id: int
    property_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)