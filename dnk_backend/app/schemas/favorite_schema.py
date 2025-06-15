from pydantic import BaseModel, ConfigDict
from datetime import datetime

class FavoriteBase(BaseModel):
    property_id: int

class FavoriteCreate(FavoriteBase):
    pass

class FavoriteResponse(FavoriteBase):
    #favorite_id: int
    #user_id: int
    #created_at: datetime

    model_config = ConfigDict(from_attributes=True)