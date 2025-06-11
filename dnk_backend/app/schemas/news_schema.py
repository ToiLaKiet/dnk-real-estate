from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Schema cơ bản cho tin tức
class NewsBase(BaseModel):
    title: str
    content: str
    thumbnail_url: Optional[str] = None

# Schema khi tạo tin tức
class NewsCreate(NewsBase):
    pass

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    thumbnail_url: Optional[str] = None

# Schema đọc tin tức (thêm ID và thời gian tạo)
class NewsRead(NewsBase):
    news_id: int
    created_at: datetime
    updated_at: datetime
