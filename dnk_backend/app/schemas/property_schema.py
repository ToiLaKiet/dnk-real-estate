from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from app.models.property_model import PropertyTypeEnum, PropertyStatusEnum
from app.schemas.property_feature_schema import PropertyFeatureCreate
from app.schemas.property_image_schema import PropertyImageCreate
from app.schemas.property_video_schema import PropertyVideoCreate

class PropertyBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    area: float
    address: str
    property_type: PropertyTypeEnum
    status: PropertyStatusEnum = PropertyStatusEnum.available

class PropertyCreate(PropertyBase):
    user_id: int
    category_id: int
    location_id: str
    features: List[PropertyFeatureCreate] = []
    images: List[PropertyImageCreate] = []
    videos: List[PropertyVideoCreate] = []

class PropertyRead(PropertyBase):
    property_id: int
    user_id: int
    category_id: int
    location_id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)