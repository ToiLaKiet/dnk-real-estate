from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List

from app.models.property_image_model import PropertyImage
from app.schemas.property_image_schema import PropertyImageCreate


# 1. Tạo ảnh mới cho bất động sản
def create_property_image(db: Session, image_create: PropertyImageCreate) -> PropertyImage:
    image = PropertyImage(
        property_id=image_create.property_id,
        image_url=image_create.image_url,
        caption=image_create.caption,
        is_primary=image_create.is_primary,
    )
    db.add(image)
    db.commit()
    db.refresh(image)
    return image


# 2. Lấy tất cả ảnh theo property_id
def get_images_by_property_id(db: Session, property_id: int) -> List[PropertyImage]:
    return db.query(PropertyImage).filter(PropertyImage.property_id == property_id).all()


# 3. Xóa ảnh cụ thể theo property_id và image_id
def delete_image_by_property_id_and_image_id(db: Session, property_id: int, image_id: int) -> bool:
    image = db.query(PropertyImage).filter(
        PropertyImage.property_id == property_id,
        PropertyImage.image_id == image_id
    ).first()

    if not image:
        return False

    db.delete(image)
    db.commit()
    return True

# 4. Xóa tất cả ảnh của một bất động sản theo property_id
def delete_images_by_property_id(db: Session, property_id: int) -> int:
    deleted_count = db.query(PropertyImage).filter(PropertyImage.property_id == property_id).delete()
    db.commit()
    return deleted_count

