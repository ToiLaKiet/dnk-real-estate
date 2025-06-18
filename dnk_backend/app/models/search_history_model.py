from sqlalchemy import Column, BigInteger, Text, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class SearchHistory(Base):
    __tablename__ = "search_history"

    search_id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(BigInteger, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    query_text = Column(Text, nullable=False)  
    created_at = Column(TIMESTAMP, server_default=func.now())
