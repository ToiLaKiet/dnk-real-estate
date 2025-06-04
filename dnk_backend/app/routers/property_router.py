from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.schemas.property_schema import PropertyCreate, PropertyRead
from app.crud import property_crud

router = APIRouter(
    prefix="/properties",
    tags=["Properties"]
)

@router.post("/", response_model=PropertyRead, status_code=status.HTTP_201_CREATED)
def create_property(property_data: PropertyCreate, db: Session = Depends(get_db)):
    try:
        return property_crud.create_property(db=db, property_data=property_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=List[PropertyRead])
def get_properties(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return property_crud.get_properties(db=db, skip=skip, limit=limit)


@router.get("/{property_id}", response_model=PropertyRead)
def get_property(property_id: int, db: Session = Depends(get_db)):
    property_obj = property_crud.get_property_by_id(db=db, property_id=property_id)
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")
    return property_obj


# Cập nhật thông tin bất động sản
@router.put("/{property_id}", response_model=PropertyRead)
def update_property(property_id: int, property_data: PropertyCreate, db: Session = Depends(get_db)):
    updated_property = property_crud.update_property(db=db, property_id=property_id, property_data=property_data)
    if not updated_property:
        raise HTTPException(status_code=404, detail="Property not found")
    return updated_property


@router.delete("/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_property(property_id: int, db: Session = Depends(get_db)):
    success = property_crud.delete_property(db, property_id)
    if not success:
        raise HTTPException(status_code=404, detail="Không tìm thấy bất động sản để xóa.")
    return

@router.get("/search", response_model=List[PropertyRead])
def search_properties(
    province_id: Optional[str] = None,
    district_id: Optional[str] = None,
    ward_id: Optional[str] = None,
    min_price: float = None,
    max_price: float = None,
    min_area: float = None,
    max_area: float = None,
    property_type: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return property_crud.search_properties(
        db=db,
        province_id=province_id,
        district_id=district_id,
        ward_id=ward_id,
        min_price=min_price,
        max_price=max_price,
        min_area=min_area,
        max_area=max_area,
        property_type=property_type,
        status=status
    )
