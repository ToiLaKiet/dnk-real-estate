from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from app.models.property_model import PropertyTypeEnum, PropertyStatusEnum
from app.schemas.property_feature_schema import PropertyFeatureCreate, PropertyFeatureRead
from app.schemas.property_image_schema import PropertyImageCreate, PropertyImageRead
from app.schemas.property_video_schema import PropertyVideoCreate, PropertyVideoRead
from app.schemas.contact_schema import ContactRead

class PropertyBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    area: float
    address: str
    category: str
    lat: Optional[float] = None
    lng: Optional[float] = None
    property_type: PropertyTypeEnum
    expire_at: Optional[datetime] = None

class PropertyCreate(PropertyBase):
    location_id: str
    features: List[PropertyFeatureCreate] = []
    images: List[PropertyImageCreate] = []
    videos: List[PropertyVideoCreate] = []

    contact_name: str
    contact_phone: str
    contact_email: Optional[str] = None
    
class PropertyUpdate(PropertyBase):
    property_id: int 
    location_id: str
    features: List[PropertyFeatureCreate] = []
    images: List[PropertyImageCreate] = []
    videos: List[PropertyVideoCreate] = []

    contact_name: str
    contact_phone: str
    contact_email: Optional[str] = None

class PropertyRead(PropertyBase):
    property_id: int
    location_id: str
    user_id: int
    created_at: datetime
    updated_at: datetime
    status: PropertyStatusEnum

    images: List[PropertyImageRead] = []
    videos: List[PropertyVideoRead] = []
    features: List[PropertyFeatureRead] = []
    contact: Optional[ContactRead] = None 

    model_config = ConfigDict(from_attributes=True)