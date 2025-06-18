from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud.stats_crud import get_stats
import matplotlib.pyplot as plt
import io
import base64
import matplotlib
import matplotlib.pyplot as plt

router = APIRouter(prefix="/stats", tags=["Statistics"])

matplotlib.use("Agg")

@router.get("/chart", summary="Hiển thị biểu đồ thống kê")
def get_stats_chart(db: Session = Depends(get_db)):
    stats = get_stats(db)
    
    if not stats:
        return {"message": "No statistics available"}

    dates = [stat.date.strftime("%Y-%m-%d") for stat in stats]
    views = [stat.views for stat in stats]
    new_users = [stat.new_users for stat in stats]
    new_properties = [stat.new_properties for stat in stats]

    plt.figure(figsize=(10,5))
    plt.plot(dates, views, label="Lượt truy cập", marker="o")
    plt.plot(dates, new_users, label="Người dùng mới", marker="s")
    plt.plot(dates, new_properties, label="Tin đăng mới", marker="^")
    plt.xticks(rotation=45)
    plt.legend()
    plt.title("Thống kê website")

    # Lưu biểu đồ vào base64 để gửi API
    img = io.BytesIO()
    plt.savefig(img, format="png")
    img.seek(0)
    img_base64 = base64.b64encode(img.getvalue()).decode("utf-8")

    return {"chart": f"data:image/png;base64,{img_base64}"}
