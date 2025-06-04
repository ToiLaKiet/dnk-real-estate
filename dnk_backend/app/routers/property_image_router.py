from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.property_image_schema import PropertyImageCreate, PropertyImageRead
from app.crud import property_image_crud
from app.database import get_db

router = APIRouter(prefix="/images", tags=["Property Images"])

# 1. Tạo mới ảnh bất động sản
@router.post("/", response_model=PropertyImageRead)
def create_image(image: PropertyImageCreate, db: Session = Depends(get_db)):
    return property_image_crud.create_property_image(db, image)

# 2. Lấy danh sách ảnh theo property_id
@router.get("/{property_id}", response_model=List[PropertyImageRead])
def get_images(property_id: int, db: Session = Depends(get_db)):
    return property_image_crud.get_images_by_property_id(db, property_id)

# 3. Xóa ảnh cụ thể theo property_id và image_id
@router.delete("/single", status_code=status.HTTP_204_NO_CONTENT)
def delete_image_by_id(property_id: int, image_id: int, db: Session = Depends(get_db)):
    success = property_image_crud.delete_image_by_property_id_and_image_id(db, property_id, image_id)
    if not success:
        raise HTTPException(status_code=404, detail="Không tìm thấy ảnh để xóa.")
    return

# 4. Xóa tất cả ảnh theo property_id
@router.delete("/all", status_code=status.HTTP_204_NO_CONTENT)
def delete_images_by_property(property_id: int, db: Session = Depends(get_db)):
    deleted = property_image_crud.delete_images_by_property_id(db, property_id)
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Không tìm thấy ảnh để xóa.")
    return

