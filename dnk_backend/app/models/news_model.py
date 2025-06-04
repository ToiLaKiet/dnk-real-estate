from sqlalchemy import Column, BigInteger, String, Text, Enum, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
import enum

class NewsStatusEnum(str, enum.Enum):
    draft = "draft"
    published = "published"

class News(Base):
    __tablename__ = "news"

    news_id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(BigInteger, ForeignKey("users.user_id"), nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    thumbnail_url = Column(String(255), nullable=True)
    status = Column(Enum(NewsStatusEnum), default=NewsStatusEnum.draft)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
