from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class PropertyFeatureBase(BaseModel):
    feature_name: str
    feature_value: str

class PropertyFeatureCreate(PropertyFeatureBase):
    property_id: Optional[int] = None

class PropertyFeatureRead(PropertyFeatureBase):
    feature_id: int
    property_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)