from sqlalchemy import Column, BigInteger, String, TIMESTAMP, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from app.database import Base

class PropertyFeature(Base):
    __tablename__ = "property_features"

    feature_id = Column(BigInteger, primary_key=True, index=True)
    property_id = Column(BigInteger, ForeignKey("properties.property_id"), nullable=False)
    feature_name = Column(String(100), nullable=False)
    feature_value = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    __table_args__ = (
        UniqueConstraint('property_id', 'feature_name', name='uq_property_feature_name'),
    )
