from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import Optional, List

from app.models.property_feature_model import PropertyFeature
from app.schemas.property_feature_schema import PropertyFeatureCreate


# 1. Tạo mới một tính năng cho bất động sản
def create_property_feature(db: Session, feature_create: PropertyFeatureCreate) -> PropertyFeature:
    feature = PropertyFeature(
        property_id=feature_create.property_id,
        feature_name=feature_create.feature_name,
        feature_value=feature_create.feature_value,
    )
    db.add(feature)
    try:
        db.commit()
        db.refresh(feature)
        return feature
    except IntegrityError:
        db.rollback()
        raise ValueError("Tính năng này đã tồn tại cho bất động sản.")


# 2. Lấy tất cả tính năng theo property_id
def get_features_by_property_id(db: Session, property_id: int) -> List[PropertyFeature]:
    return db.query(PropertyFeature).filter(PropertyFeature.property_id == property_id).all()


# 3. Xóa tất cả tính năng theo property_id (dùng khi cập nhật)
def delete_features_by_property_id(db: Session, property_id: int):
    db.query(PropertyFeature).filter(PropertyFeature.property_id == property_id).delete()
    db.commit()


# 4. Cập nhật giá trị tính năng theo property_id và feature_name
def update_feature_value(db: Session, property_id: int, feature_name: str, new_value: str) -> Optional[PropertyFeature]:
    feature = db.query(PropertyFeature).filter(
        PropertyFeature.property_id == property_id,
        PropertyFeature.feature_name == feature_name
    ).first()

    if not feature:
        return None 
    feature.feature_value = new_value
    db.commit()
    db.refresh(feature)
    return feature