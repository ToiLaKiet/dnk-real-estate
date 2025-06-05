from pydantic import BaseModel, ConfigDict
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    category_type: str
    
class CategoryCreate(CategoryBase):
    pass

class CategoryRead(CategoryBase):
    category_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)