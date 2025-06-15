from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.location_schema import LocationCreate, LocationRead
from app.crud import location_crud
from app.database import get_db
from typing import List


router = APIRouter(prefix="/locations", tags=["Locations"])

@router.get("/{location_id}", response_model=LocationRead)
def read_location(location_id: str, db: Session = Depends(get_db)):
    location = location_crud.get_location_by_id(db, location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return location

@router.post("/", response_model=List[LocationRead])
def create_locations(locations: List[LocationCreate], db: Session = Depends(get_db)):
    created_locations = []

    for location_data in locations:
        # Kiểm tra xem location đã tồn tại chưa
        existing_location = location_crud.get_location_by_id(
            db, location_data.location_id
        )
        
        if existing_location:
            continue  # Nếu đã tồn tại, bỏ qua

        try:
            new_location = location_crud.create_location(db, location_data)
            created_locations.append(new_location)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    if not created_locations:
        raise HTTPException(status_code=400, detail="Tất cả địa điểm đã tồn tại hoặc không hợp lệ.")

    return created_locations

@router.get("/", response_model=List[LocationRead])
def get_locations_by_type(type: str, parent_id: str = None, db: Session = Depends(get_db)):
    from app.models.location_model import LocationTypeEnum
    try:
        type_enum = LocationTypeEnum(type)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid location type")
    return location_crud.get_locations_by_type(db, type_enum, parent_id)


@router.get("/wards-by-province/{province_id}", response_model=List[str])
def get_wards_by_province(province_id: str, db: Session = Depends(get_db)):
    """API lấy danh sách các location_id của tất cả các ward thuộc một province."""
    ward_ids = location_crud.get_wards_by_province(db, province_id)
    if not ward_ids:
        raise HTTPException(status_code=404, detail="No wards found for this province")
    return ward_ids
