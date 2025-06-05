from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.category_schema import CategoryCreate, CategoryRead
from app.crud import category_crud
from app.database import get_db

router = APIRouter(prefix="/categories", tags=["Categories"])

# Tạo mới danh mục
@router.post("/", response_model=List[CategoryRead])
def create_category(categories: List[CategoryCreate], db: Session = Depends(get_db)):
    created_categories = []

    for category_data in categories:
        # Kiểm tra xem category đã tồn tại chưa
        existing_category = category_crud.get_category_by_name_and_type(
            db, category_data.name, category_data.category_type
        )
        
        if existing_category:
            continue  # Nếu đã tồn tại, bỏ qua

        try:
            new_category = category_crud.create_category(db, category_data)
            created_categories.append(new_category)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    if not created_categories:
        raise HTTPException(status_code=400, detail="Tất cả loại danh mục đã tồn tại hoặc không hợp lệ.")

    return created_categories




# Lấy tất cả danh mục
@router.get("/", response_model=List[CategoryRead])
def get_all_categories(db: Session = Depends(get_db)):
    return category_crud.get_all_categories(db)


# Lấy danh mục theo type
@router.get("/{category_type}", response_model=CategoryRead)
def get_category_by_type(category_type: str, db: Session = Depends(get_db)):
    category = category_crud.get_category_by_type(db, category_type)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


# Xóa danh mục
@router.delete("/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    success = category_crud.delete_category(db, category_id)
    if not success:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"detail": "Category deleted successfully"}
