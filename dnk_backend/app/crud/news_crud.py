from sqlalchemy.orm import Session
from app.models.news_model import News
from app.schemas.news_schema import NewsCreate, NewsUpdate 

# Tạo tin tức (Chỉ admin)
def create_news(db: Session, news_in: NewsCreate):
    news_item = News(**news_in.model_dump())
    db.add(news_item)
    db.commit()
    db.refresh(news_item)
    return news_item

# Lấy danh sách tất cả tin tức
def get_all_news(db: Session, skip: int = 0, limit: int = 100):
    return db.query(News).order_by(News.created_at.desc()).offset(skip).limit(limit).all()

# Lấy chi tiết tin tức theo ID
def get_news_by_id(db: Session, news_id: int):
    return db.query(News).filter(News.news_id == news_id).first()

# Xóa tin tức theo ID
def delete_news(db: Session, news_id: int):
    news_item = db.query(News).filter(News.news_id == news_id).first()
    if news_item:
        db.delete(news_item)
        db.commit()
        return {"message": "News deleted successfully"}
    return None

# Chỉnh sửa tin tức (Chỉ admin)
def update_news(db: Session, news_id: int, news_in: NewsUpdate):
    news_item = db.query(News).filter(News.news_id == news_id).first()

    if not news_item:
        return None  # Router sẽ xử lý HTTPException

    for key, value in news_in.model_dump(exclude_unset=True).items():
        setattr(news_item, key, value)

    db.commit()
    db.refresh(news_item)
    return news_item
