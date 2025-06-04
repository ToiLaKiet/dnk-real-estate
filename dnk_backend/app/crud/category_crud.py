from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.category_model import Category
from app.schemas.category_schema import CategoryCreate


# Tạo mới category
def create_category(db: Session, category_create: CategoryCreate) -> Category:
    category = Category(name=category_create.name, category_type=category_create.category_type)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


# Lấy toàn bộ danh mục
def get_all_categories(db: Session) -> List[Category]:
    return db.query(Category).all()

# 3. Lấy danh mục theo ten và type 
def get_category_by_name_and_type(db: Session, name: str, category_type: str) -> Optional[Category]:
    return db.query(Category).filter(Category.name == name, Category.category_type == category_type).first()

# Lấy category theo type
def get_category_by_type(db: Session, category_type: str) -> Optional[Category]:
    return db.query(Category).filter(Category.category_type == category_type).all()

# Xóa category
def delete_category(db: Session, category_id: int) -> bool:
    category = db.query(Category).filter(Category.category_id == category_id).first()
    if not category:
        return False
    db.delete(category)
    db.commit()
    return True