from fastapi import Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.stats_model import WebsiteStats
from datetime import datetime, UTC

async def track_visitor(request: Request, db: Session):
    today = datetime.now(UTC).date()
    stat_record = db.query(WebsiteStats).filter(WebsiteStats.date == today).first()

    if stat_record:
        stat_record.views += 1
    else:
        stat_record = WebsiteStats(date=today, views=1, new_users=0, new_properties=0)
        db.add(stat_record)

    db.commit()
