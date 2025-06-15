from sqlalchemy import Column, BigInteger, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base

class WebsiteStats(Base):
    __tablename__ = "website_stats"

    stat_id = Column(BigInteger, primary_key=True, index=True)
    date = Column(TIMESTAMP, server_default=func.now(), unique=True)
    views = Column(BigInteger, default=0)
    new_users = Column(BigInteger, default=0)
    new_properties = Column(BigInteger, default=0)
