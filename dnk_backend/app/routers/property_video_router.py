from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.property_video_schema import PropertyVideoCreate, PropertyVideoRead
from app.crud import property_video_crud
from app.database import get_db

router = APIRouter(prefix="/videos", tags=["Property Videos"])

# 1. Tạo video mới
@router.post("/", response_model=PropertyVideoRead)
def create_video(video: PropertyVideoCreate, db: Session = Depends(get_db)):
    return property_video_crud.create_property_video(db, video)

# 2. Lấy danh sách video theo property_id
@router.get("/{property_id}", response_model=List[PropertyVideoRead])
def get_videos(property_id: int, db: Session = Depends(get_db)):
    return property_video_crud.get_videos_by_property_id(db, property_id)

# 3. Xóa video cụ thể theo property_id và video_id
@router.delete("/single", status_code=status.HTTP_204_NO_CONTENT)
def delete_video_by_id(property_id: int, video_id: int, db: Session = Depends(get_db)):
    success = property_video_crud.delete_video_by_property_id_and_video_id(db, property_id, video_id)
    if not success:
        raise HTTPException(status_code=404, detail="Không tìm thấy video để xóa.")
    return

# 4. Xóa tất cả video theo property_id
@router.delete("/all", status_code=status.HTTP_204_NO_CONTENT)
def delete_videos_by_property(property_id: int, db: Session = Depends(get_db)):
    deleted = property_video_crud.delete_videos_by_property_id(db, property_id)
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Không tìm thấy video để xóa.")
    return


