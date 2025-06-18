from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession

from typing import List, Optional

from app.schemas.property_schema import PropertyCreate, PropertyRead, PropertyUpdate
from app.crud import property_crud
from app.database import get_db
from app.utils.auth import get_current_admin_user, get_current_user
from app.models.user_model import User
from app.models.property_model import PropertyStatusEnum
from app.models.search_history_model import SearchHistory

router = APIRouter(prefix="/properties", tags=["Properties"])


@router.post("/", response_model=PropertyRead, status_code=status.HTTP_201_CREATED)
def create_property(property_in: PropertyCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return property_crud.create_property(db, property_in, current_user.user_id)


@router.get("/", response_model=List[PropertyRead])
def get_all_properties(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return property_crud.get_all_properties(db, skip, limit)


@router.get("/{property_id}", response_model=PropertyRead)
def get_property(property_id: int, db: Session = Depends(get_db)):
    property_obj = property_crud.get_property(db, property_id)
    if not property_obj:
        raise HTTPException(status_code=404, detail="Property not found")
    return property_obj


@router.get("/user/{user_id}", response_model=List[PropertyRead])
def get_properties_by_user(user_id: int, db: Session = Depends(get_db)):
    return property_crud.get_properties_by_user(db, user_id)



@router.put("/{property_id}", status_code=200)
def update_property_endpoint(property_id: int, property_in: PropertyCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    updated_property = property_crud.update_property(db, property_id, property_in, current_user.user_id)

    if not updated_property:
        raise HTTPException(status_code=404, detail="Property not found or permission denied")

    return {"message": "Property updated successfully", "property_id": property_id}

@router.put("/{property_id}/status", status_code=200)
def change_property_status(property_id: int, new_status: PropertyStatusEnum, db: Session = Depends(get_db), admin_user = Depends(get_current_admin_user)):
    updated_property = property_crud.update_property_status(db, property_id, new_status)

    if not updated_property:
        raise HTTPException(status_code=404, detail="Property not found")

    return {"message": "Property status updated successfully", "property_id": property_id, "new_status": new_status}


@router.delete("/{property_id}", status_code=200)
def delete_property_endpoint(property_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    property_item = property_crud.get_property_by_id(db, property_id)
    
    if not property_item:
        raise HTTPException(status_code=404, detail="Property not found")
    
    if property_item.user_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="You do not have permission to delete this property")

    return property_crud.delete_property(db, property_id, current_user.user_id)



@router.get("/search/", response_model=List[int])
def search_properties(
    min_price: float = Query(None, ge=0),
    max_price: float = Query(None, ge=0),
    min_area: float = Query(None, ge=0),
    max_area: float = Query(None, ge=0),
    property_type: str = Query(None),
    location_id: str = Query(None),
    category: str = Query(None),
    status: str = Query(None),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)  
):
    # Nếu đăng nhập, lưu lịch sử tìm kiếm
    if current_user:
        query_text = f"Tìm {category} tại {location_id}, giá {min_price}-{max_price}, diện tích {min_area}-{max_area}, loại {property_type}"
        search_record = SearchHistory(user_id=current_user.user_id, query_text=query_text)
        db.add(search_record)
        db.commit()

    # Trả về kết quả tìm kiếm
    return property_crud.search_properties(
        db=db,
        min_price=min_price,
        max_price=max_price,
        min_area=min_area,
        max_area=max_area,
        property_type=property_type,
        location_id=location_id,
        category=category,
        status=status
    )

@router.get("/search_not_auth/", response_model=List[int])
def search_properties(
    min_price: float = Query(None, ge=0),
    max_price: float = Query(None, ge=0),
    min_area: float = Query(None, ge=0),
    max_area: float = Query(None, ge=0),
    property_type: str = Query(None),
    location_id: str = Query(None),
    category: str = Query(None),
    status: str = Query(None),
    db: Session = Depends(get_db) 
):
    # Trả về kết quả tìm kiếm
    return property_crud.search_properties(
        db=db,
        min_price=min_price,
        max_price=max_price,
        min_area=min_area,
        max_area=max_area,
        property_type=property_type,
        location_id=location_id,
        category=category,
        status=status
    )

