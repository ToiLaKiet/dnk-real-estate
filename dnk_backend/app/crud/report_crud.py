from sqlalchemy.orm import Session
from app.models.report_model import Report
from app.schemas.report_schema import ReportCreate

# 1. Tạo báo cáo
def create_report(db: Session, report_in: ReportCreate, user_id: int):
    report_data = Report(**report_in.model_dump(), user_id=user_id)
    db.add(report_data)
    db.commit()
    db.refresh(report_data)
    return report_data

# 2. Lấy danh sách báo cáo theo property_id
def get_reports_by_property(db: Session, property_id: int):
    return db.query(Report).filter(Report.property_id == property_id).all()

# 3. Lấy tất cả báo cáo
def get_all_reports(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Report).offset(skip).limit(limit).all

# 4. Xóa báo cáo theo report_id
def delete_report(db: Session, report_id: int):
    report_item = db.query(Report).filter(Report.report_id == report_id).first()
    if report_item:
        db.delete(report_item)
        db.commit()
        return {"message": "Report deleted successfully"}
    return None
