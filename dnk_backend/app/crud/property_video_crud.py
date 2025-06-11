from sqlalchemy.orm import Session
from typing import List

from app.models.property_video_model import PropertyVideo
from app.schemas.property_video_schema import PropertyVideoCreate


# 1. Tạo video mới cho bất động sản
def create_property_video(db: Session, video_create: PropertyVideoCreate) -> PropertyVideo:
    video = PropertyVideo(
        property_id=video_create.property_id,
        video_url=video_create.video_url
    )
    db.add(video)
    db.commit()
    db.refresh(video)
    return video


# 2. Lấy tất cả video theo property_id
def get_videos_by_property_id(db: Session, property_id: int) -> List[PropertyVideo]:
    return db.query(PropertyVideo).filter(PropertyVideo.property_id == property_id).all()


# 3. Xóa video cụ thể theo property_id và video_id
def delete_video_by_property_id_and_video_id(db: Session, property_id: int, video_id: int) -> bool:
    video = db.query(PropertyVideo).filter(
        PropertyVideo.property_id == property_id,
        PropertyVideo.video_id == video_id
    ).first()

    if not video:
        return False

    db.delete(video)
    db.commit()
    return True

# 4. Xóa tất cả video của một bất động sản theo property_id
def delete_videos_by_property_id(db: Session, property_id: int) -> int:
    deleted_count = db.query(PropertyVideo).filter(PropertyVideo.property_id == property_id).delete()
    db.commit()
    return deleted_count

