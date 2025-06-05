from sqlalchemy.orm import Session
from app.models.property_model import Property
from app.schemas.property_schema import PropertyCreate
from app.crud import property_feature_crud, property_image_crud, property_video_crud, location_crud
from app.schemas import property_feature_schema, property_image_schema, property_video_schema, location_schema
from typing import List, Optional
from app.models.location_model import LocationTypeEnum, Location 



def create_property(db: Session, property_data: PropertyCreate):
    # 1. Tạo bản ghi chính trong bảng properties
    db_property = Property(
        user_id=property_data.user_id,
        category_id=property_data.category_id,
        location_id=property_data.location_id,
        title=property_data.title,
        description=property_data.description,
        price=property_data.price,
        area=property_data.area,
        address=property_data.address,
        property_type=property_data.property_type,
        status=property_data.status,
    )
    db.add(db_property)
    db.commit()
    db.refresh(db_property)

    # 2. Thêm các feature
    for feature in property_data.features:
        feature_data = property_feature_schema.PropertyFeatureCreate(
            **feature.model_dump(), property_id=db_property.property_id
        )
        property_feature_crud.create_property_feature(db, feature_data)

    # 3. Thêm các image
    for image in property_data.images:
        image_data = property_image_schema.PropertyImageCreate(
            **image.model_dump(), property_id=db_property.property_id
        )
        property_image_crud.create_property_image(db, image_data)

    # 4. Thêm các video
    for video in property_data.videos:
        video_data = property_video_schema.PropertyVideoCreate(
            **video.model_dump(), property_id=db_property.property_id
        )
        property_video_crud.create_property_video(db, video_data)

    return db_property


def get_properties(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Property).offset(skip).limit(limit).all()

def get_property_by_id(db: Session, property_id: int):
    return db.query(Property).filter(Property.property_id == property_id).first()

def update_property(db: Session, property_id: int, property_data: PropertyCreate):
    # 1. Tìm bất động sản theo ID
    db_property = db.query(Property).filter(Property.property_id == property_id).first()
    if not db_property:
        return None

    # 2. Cập nhật các trường cơ bản
    db_property.user_id = property_data.user_id
    db_property.category_id = property_data.category_id
    db_property.location_id = property_data.location_id
    db_property.title = property_data.title
    db_property.description = property_data.description
    db_property.price = property_data.price
    db_property.area = property_data.area
    db_property.address = property_data.address
    db_property.property_type = property_data.property_type
    db_property.status = property_data.status

    db.commit()

    # 3. Xóa và thêm lại các feature


    # Xóa toàn bộ feature, image, video cũ
    property_feature_crud.delete_features_by_property_id(db, property_id)
    property_image_crud.delete_images_by_property_id(db, property_id)
    property_video_crud.delete_videos_by_property_id(db, property_id)

    # Thêm lại mới
    for feature in property_data.features:
        feature_data = property_feature_schema.PropertyFeatureCreate(
            **feature.model_dump(), property_id=property_id
        )
        property_feature_crud.create_property_feature(db, feature_data)

    for image in property_data.images:
        image_data = property_image_schema.PropertyImageCreate(
            **image.model_dump(), property_id=property_id
        )
        property_image_crud.create_property_image(db, image_data)

    for video in property_data.videos:
        video_data = property_video_schema.PropertyVideoCreate(
            **video.model_dump(), property_id=property_id
        )
        property_video_crud.create_property_video(db, video_data)

    db.refresh(db_property)
    return db_property

def delete_property(db: Session, property_id: int) -> bool:
    property_obj = db.query(Property).filter(Property.property_id == property_id).first()
    if not property_obj:
        return False

    # Nếu bạn muốn, có thể xóa liên quan (images, videos, features, contacts...) ở đây
    db.delete(property_obj)
    db.commit()
    return True

def search_properties(
    db: Session,
    province_id: Optional[str] = None,
    district_id: Optional[str] = None,
    ward_id: Optional[str] = None,
    min_price: float = None,
    max_price: float = None,
    min_area: float = None,
    max_area: float = None,
    property_type: Optional[str] = None,
    status: Optional[str] = None
) -> List[Property]:
    query = db.query(Property)

    # Lọc theo địa điểm
    if ward_id:
        query = query.filter(Property.ward_id == ward_id)
    elif district_id:
        # Lấy tất cả các ward_id thuộc district
        wards = db.query(Location.location_id).filter(
            Location.parent_id == district_id,
            Location.type == LocationTypeEnum.ward
        ).all()
        ward_ids = [w.location_id for w in wards]
        query = query.filter(Property.ward_id.in_(ward_ids))
    elif province_id:
        # Lấy tất cả district trong province
        districts = db.query(Location.location_id).filter(
            Location.parent_id == province_id,
            Location.type == LocationTypeEnum.district
        ).all()
        district_ids = [d.location_id for d in districts]
        wards = db.query(Location.location_id).filter(
            Location.parent_id.in_(district_ids),
            Location.type == LocationTypeEnum.ward
        ).all()
        ward_ids = [w.location_id for w in wards]
        query = query.filter(Property.ward_id.in_(ward_ids))

    # Lọc các điều kiện khác
    if min_price is not None:
        query = query.filter(Property.price >= min_price)
    if max_price is not None:
        query = query.filter(Property.price <= max_price)
    if min_area is not None:
        query = query.filter(Property.area >= min_area)
    if max_area is not None:
        query = query.filter(Property.area <= max_area)
    if property_type:
        query = query.filter(Property.property_type == property_type)
    if status:
        query = query.filter(Property.status == status)

    return query.all()
