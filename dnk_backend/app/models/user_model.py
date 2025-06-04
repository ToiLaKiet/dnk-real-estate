from sqlalchemy import Column, BigInteger, String, Text, Enum, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base
import enum

# Enum Python để ánh xạ với ENUM trong PostgreSQL
class UserRoleEnum(str, enum.Enum):
    visitor = "visitor"
    buyer = "buyer"
    seller = "seller"
    admin = "admin"

# Model cho bảng "users"
class User(Base):
    __tablename__ = "users"

    user_id = Column(BigInteger, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(100))
    phone_number = Column(String(20))
    address = Column(Text)
    role = Column(Enum(UserRoleEnum), default=UserRoleEnum.visitor)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
