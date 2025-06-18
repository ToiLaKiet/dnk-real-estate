from sqlalchemy import Column, BigInteger, String, Text, Enum, TIMESTAMP, Boolean
from sqlalchemy.sql import func
from app.database import Base
import enum
from sqlalchemy.orm import relationship

# Enum Python để ánh xạ với ENUM trong PostgreSQL
class UserRoleEnum(str, enum.Enum):
    buyer = "buyer"
    seller = "seller"
    admin = "admin"

# Model cho bảng "users"
class User(Base):
    __tablename__ = "users"

    user_id = Column(BigInteger, primary_key=True, index=True)
    email = Column(String(100), unique=True, nullable=True)
    is_email_verified = Column(Boolean, default=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(100))
    phone_number = Column(String(20), unique=True, nullable=False)
    is_phone_number_verified = Column(Boolean, default=False)
    tax_number = Column(String(13), unique=True, nullable=True)
    company_name = Column(String(100), nullable=True)
    address = Column(Text, nullable=True)
    avatar = Column(String(255), nullable=True)
    role = Column(Enum(UserRoleEnum), default=UserRoleEnum.buyer)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    reports = relationship("Report", back_populates="user", cascade="all, delete-orphan")
    properties = relationship("Property", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.user_id} - {self.phone_number}>"