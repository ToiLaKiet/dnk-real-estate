from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
from app.models.location_model import LocationTypeEnum

class LocationBase(BaseModel):
    location_id: str
    name: str
    type: LocationTypeEnum 
    parent_id: Optional[str] = None

class LocationCreate(LocationBase):
    pass

class LocationRead(LocationBase):
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)