from sqlalchemy.orm import Session
from app.models import property_model
from app.schemas.property_schema import PropertyCreate, PropertyUpdate
from app.models.property_model import Property
from datetime import datetime, UTC
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.crud import contact_crud
from app.schemas.contact_schema import ContactCreate
from app.schemas.property_feature_schema import PropertyFeatureCreate
from app.schemas.property_image_schema import PropertyImageCreate
from app.schemas.property_video_schema import PropertyVideoCreate
from app.crud import property_feature_crud, property_image_crud, property_video_crud
from app.schemas import property_feature_schema, property_image_schema, property_video_schema
from app.models.property_model import PropertyStatusEnum
from app.models.stats_model import WebsiteStats
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.models.location_model import Location, LocationTypeEnum


def create_property(db: Session, property_in: PropertyCreate, user_id: int):

    # 1. Tạo property
    property_data = property_in.model_dump(
        exclude={"contact_name", "contact_phone", "contact_email", "features", "images", "videos"}
    )
    try:
        db_property = Property(**property_data)
    except Exception as e:
        print(f"Error creating Property: {e}")
        return None

    
    db_property.user_id = user_id
    db_property.created_at = datetime.now(UTC)
    db_property.updated_at = datetime.now(UTC)

    db.add(db_property)
    db.commit()
    db.refresh(db_property)

    # 2. Tạo liên hệ (Contact)
    contact_in = ContactCreate(
        name=property_in.contact_name,
        phone=property_in.contact_phone,
        email=property_in.contact_email,
        property_id=db_property.property_id
    )
    contact = contact_crud.create_contact(db, contact_in)
    

    # 3. Tạo các feature liên quan
    for feature in property_in.features:
        db_feature = PropertyFeatureCreate(
            property_id=db_property.property_id,
            feature_name=feature.feature_name,
            feature_value=feature.feature_value
        )
        property_feature_crud.create_property_feature(db, db_feature)

    # 4. Tạo các image liên quan
    for image in property_in.images:
        db_image = PropertyImageCreate(
            property_id=db_property.property_id,
            image_url=image.image_url,
            caption=image.caption,
            is_primary=image.is_primary
        )
        property_image_crud.create_property_image(db, db_image)

    # 5. Tạo các video liên quan
    for video in property_in.videos:
        db_video = PropertyVideoCreate(
            property_id=db_property.property_id,
            video_url=video.video_url
        )
        property_video_crud.create_property_video(db, db_video)

    # Cập nhật số lượng tin đăng mới
    today = datetime.now(UTC).date()
    stat_record = db.query(WebsiteStats).filter(WebsiteStats.date == today).first()
    if stat_record:
        stat_record.new_properties += 1
    else:
        stat_record = WebsiteStats(date=today, views=0, new_users=0, new_properties=1)
        db.add(stat_record)

    db.commit()

    return db_property



def get_property(db: Session, property_id: int):
    return db.query(Property).filter(Property.property_id == property_id).first()


def get_all_properties(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Property).offset(skip).limit(limit).all()


def get_properties_by_user(db: Session, user_id: int):
    return db.query(Property).filter(Property.user_id == user_id).all()

def get_property_by_id(db: Session, property_id: int):
    return db.query(Property).filter(Property.property_id == property_id).first()


def update_property_status(db: Session, property_id: int, new_status: PropertyStatusEnum):
    property_item = db.query(Property).filter(Property.property_id == property_id).first()

    if not property_item:
        return None  # Router sẽ xử lý HTTPException

    property_item.status = new_status
    db.commit()
    db.refresh(property_item)
    return property_item

def update_property(db: Session, property_id: int, property_in: PropertyCreate, user_id: int):
    existing_property = db.query(Property).filter(Property.property_id == property_id, Property.user_id == user_id).first()

    if not existing_property:
        return None  

    db.delete(existing_property)
    db.commit()

    new_property = create_property(db, property_in, user_id)
    return new_property



def delete_property(db: Session, property_id: int, user_id: int):
    property_item = get_property_by_id(db, property_id)
    
    if property_item and property_item.user_id == user_id:
        db.delete(property_item)
        db.commit()
        return {"message": "Property deleted successfully"}
    
    return None



def search_properties(
    db: Session,
    min_price: float = None,
    max_price: float = None,
    min_area: float = None,
    max_area: float = None,
    property_type: str = None,
    location_id: str = None,
    category: str = None,
    status: str = None
):
    query = db.query(Property)

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

    if location_id:
        # Lấy danh sách các quận thuộc tỉnh
        district_ids = db.query(Location.location_id).filter(
            Location.parent_id == location_id,
            Location.type == LocationTypeEnum.district
        ).all()

        # Lấy danh sách các phường thuộc các quận đó
        ward_ids = db.query(Location.location_id).filter(
            Location.parent_id.in_([d[0] for d in district_ids]),
            Location.type == LocationTypeEnum.ward
        ).all()

        # Lọc các property theo danh sách ward_id
        query = query.filter(Property.location_id.in_([w[0] for w in ward_ids]))  # Chuyển từ tuple thành list

    if category is not None:
        query = query.filter(Property.category == category)

    if status:
        query = query.filter(Property.status == status)


    return [p.property_id for p in query.all()]  

def get_all_properties_no_limit(db: Session):
    return db.query(Property).all()

