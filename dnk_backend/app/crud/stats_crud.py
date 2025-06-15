from sqlalchemy.orm import Session
from app.models.stats_model import WebsiteStats



def get_stats(db: Session):
    return db.query(WebsiteStats).order_by(WebsiteStats.date.asc()).all()
