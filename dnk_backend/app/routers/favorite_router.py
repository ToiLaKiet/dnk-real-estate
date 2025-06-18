from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud import favorite_crud
from app.schemas import favorite_schema
from app.utils.auth import get_current_user
from app.models.user_model import User

router = APIRouter(prefix="/favorites", tags=["Favorites"])

@router.post("/", response_model=favorite_schema.FavoriteResponse)
def add_favorite(
    favorite_data: favorite_schema.FavoriteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    favorite = favorite_crud.add_favorite(db, current_user.user_id, favorite_data.property_id)
    if favorite is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bất động sản đã được thêm vào yêu thích trước đó."
        )
    return favorite

@router.get("/", response_model=list[favorite_schema.FavoriteResponse])
def get_user_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return favorite_crud.get_favorites_by_user(db, current_user.user_id)

@router.delete("/{property_id}")
def remove_favorite(
    property_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    favorite = favorite_crud.get_favorite(db, current_user.user_id, property_id)
    if not favorite:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Yêu thích không tồn tại."
        )
    favorite_crud.remove_favorite(db, favorite)
    return {"message": "Đã xóa khỏi danh sách yêu thích."}
