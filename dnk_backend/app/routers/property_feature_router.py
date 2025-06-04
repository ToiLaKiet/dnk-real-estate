from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.property_feature_schema import PropertyFeatureCreate, PropertyFeatureRead
from app.crud import property_feature_crud
from app.database import get_db

router = APIRouter(prefix="/features", tags=["Property Features"])

# 1. Tạo mới một tính năng
@router.post("/", response_model=PropertyFeatureRead)
def create_feature(feature: PropertyFeatureCreate, db: Session = Depends(get_db)):
    try:
        return property_feature_crud.create_property_feature(db, feature)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# 2. Lấy tất cả tính năng theo property_id
@router.get("/{property_id}", response_model=List[PropertyFeatureRead])
def get_features(property_id: int, db: Session = Depends(get_db)):
    return property_feature_crud.get_features_by_property_id(db, property_id)


# 3. Xóa tất cả tính năng theo property_id
@router.delete("/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_features(property_id: int, db: Session = Depends(get_db)):
    property_feature_crud.delete_features_by_property_id(db, property_id)
    return


# 4. Cập nhật giá trị tính năng theo property_id và feature_name
@router.put("/", response_model=PropertyFeatureRead)
def update_feature_value(
    property_id: int,
    feature_name: str,
    new_value: str,
    db: Session = Depends(get_db)
):
    feature = property_feature_crud.update_feature_value(db, property_id, feature_name, new_value)
    if feature is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy tính năng.")
    return feature
