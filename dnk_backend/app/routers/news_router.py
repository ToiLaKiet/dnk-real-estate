from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.news_schema import NewsCreate, NewsUpdate
from app.crud.news_crud import create_news, get_all_news, get_news_by_id, delete_news, update_news
from app.utils.auth import get_current_admin_user

router = APIRouter(prefix="/news", tags=["News"])

# 1️⃣ Admin đăng tin tức mới
@router.post("/", status_code=201)
def create_news_endpoint(news_in: NewsCreate, db: Session = Depends(get_db), admin_user = Depends(get_current_admin_user)):
    return create_news(db, news_in)

# 2️⃣ Xem danh sách tin tức
@router.get("/", status_code=200)
def list_news(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    news = get_all_news(db, skip, limit)
    return news

# 3️⃣ Xem chi tiết tin tức theo ID
@router.get("/{news_id}", status_code=200)
def get_news_detail(news_id: int, db: Session = Depends(get_db)):
    news_item = get_news_by_id(db, news_id)
    if not news_item:
        raise HTTPException(status_code=404, detail="News not found")
    return news_item

# 4️⃣ Xóa tin tức (Chỉ admin)
@router.delete("/{news_id}", status_code=200)
def remove_news(news_id: int, db: Session = Depends(get_db), admin_user = Depends(get_current_admin_user)):
    deleted = delete_news(db, news_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="News not found")
    return deleted

@router.put("/{news_id}", status_code=200)
def edit_news(news_id: int, news_in: NewsUpdate, db: Session = Depends(get_db), admin_user = Depends(get_current_admin_user)):
    updated_news = update_news(db, news_id, news_in)

    if not updated_news:
        raise HTTPException(status_code=404, detail="News not found")

    return {"message": "News updated successfully", "news_id": news_id}