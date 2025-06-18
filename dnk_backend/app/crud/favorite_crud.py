from sqlalchemy.orm import Session
from app.models.favorite_model import Favorite
from app.models.property_model import Property
from sqlalchemy.exc import IntegrityError
from typing import Optional

def add_favorite(db: Session, user_id: int, property_id: int) -> Optional[Favorite]:
    favorite = Favorite(user_id=user_id, property_id=property_id)
    db.add(favorite)
    try:
        db.commit()
        db.refresh(favorite)
        return favorite
    except IntegrityError:
        db.rollback()
        return None  # Trả về None để router xử lý

def get_favorites_by_user(db: Session, user_id: int) -> list[Favorite]:
    return (
        db.query(Favorite)
        .filter(Favorite.user_id == user_id)
        .join(Property, Favorite.property_id == Property.property_id)
        .all()
    )

def get_favorite(db: Session, user_id: int, property_id: int) -> Optional[Favorite]:
    return (
        db.query(Favorite)
        .filter(Favorite.user_id == user_id, Favorite.property_id == property_id)
        .first()
    )

def remove_favorite(db: Session, favorite: Favorite):
    db.delete(favorite)
    db.commit()
