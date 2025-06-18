from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import Optional, List

from app.models.location_model import Location, LocationTypeEnum
from app.schemas.location_schema import LocationCreate


# 1. Lấy Location theo ID
def get_location_by_id(db: Session, location_id: str) -> Optional[Location]:
    return db.query(Location).filter(Location.location_id == location_id).first()


# 2. Lấy Location theo tên + loại (và parent_id nếu có)
def get_location_by_name_and_type(db: Session, name: str, type: LocationTypeEnum, 
                                  parent_id: Optional[str] = None) -> Optional[Location]:
    query = db.query(Location).filter(
        Location.name == name,
        Location.type == type
    )
    if parent_id is not None:
        query = query.filter(Location.parent_id == parent_id)
    return query.first()


# 3. Tạo mới một location (nếu không tồn tại)
def create_location(db: Session, location_create: LocationCreate) -> Location:
    location = Location(
        location_id=location_create.location_id,
        name=location_create.name,
        type=location_create.type,
        parent_id=location_create.parent_id
    )
    db.add(location)
    try:
        db.commit()
        db.refresh(location)
        return location
    except IntegrityError:
        db.rollback()
        raise ValueError("Địa điểm đã tồn tại hoặc không hợp lệ.")


# 4. Nếu location tồn tại thì trả lại, nếu chưa thì tạo mới
def get_or_create_location(db: Session, name: str, type: LocationTypeEnum,
                            parent_id: Optional[str] = None) -> Location:
    location = get_location_by_name_and_type(db, name, type, parent_id)
    if location:
        return location

    location_create = LocationCreate(name=name, type=type, parent_id=parent_id)
    return create_location(db, location_create)


# 5. Lấy tất cả các location theo loại (province, district, ward)
def get_locations_by_type(db: Session, type: LocationTypeEnum, 
                          parent_id: Optional[str] = None) -> List[Location]:
    query = db.query(Location).filter(Location.type == type)
    if parent_id is not None:
        query = query.filter(Location.parent_id == parent_id)
    return query.all()

def get_wards_by_province(db: Session, province_id: str) -> List[str]:
    districts = db.query(Location).filter(Location.parent_id == province_id, Location.type == LocationTypeEnum.district).all()
    
    if not districts:
        return []  
    
    ward_ids = []
    for district in districts:
        wards = db.query(Location).filter(Location.parent_id == district.location_id, Location.type == LocationTypeEnum.ward).all()
        ward_ids.extend([ward.location_id for ward in wards])  # Thêm ward_id vào danh sách
    
    return ward_ids