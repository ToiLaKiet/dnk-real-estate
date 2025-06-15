from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.auth import get_current_user
from app.utils.recommendation import RealEstateRecommender

router = APIRouter(prefix="/recommend", tags=["Recommendation"])

@router.post("/", summary="Gợi ý bất động sản")
def recommend_properties(user_query: str, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    recommender = RealEstateRecommender(db)

    # Lấy danh sách gợi ý từ 3 phương pháp
    by_text = recommender.recommend_by_text(user_query)
    by_favorites = recommender.recommend_by_favorites(current_user.user_id)
    by_search_history = recommender.recommend_by_search_history(current_user.user_id)

    # 🛠 Hợp nhất danh sách và loại bỏ trùng lặp dựa trên `property_id`
    all_recommendations = by_text + by_favorites + by_search_history
    unique_property_ids = list({prop.property_id for prop in all_recommendations})  # Chỉ giữ các ID duy nhất

    return unique_property_ids