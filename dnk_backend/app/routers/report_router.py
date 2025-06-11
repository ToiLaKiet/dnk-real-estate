from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.report_schema import ReportCreate, ReportRead
from app.crud.report_crud import create_report, get_reports_by_property, delete_report, get_all_reports
from app.utils.auth import get_current_user, get_current_admin_user

router = APIRouter(prefix="/reports", tags=["Reports"])

# 1️⃣ Gửi báo cáo tin đăng
@router.post("/", response_model=ReportRead)
def report_property(report_in: ReportCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return create_report(db, report_in, current_user.user_id)

# 2️⃣ Xem danh sách báo cáo theo property_id
@router.get("/{property_id}", response_model=list[ReportRead])
def view_reports(property_id: int, db: Session = Depends(get_db), admin_user = Depends(get_current_admin_user)):
    reports = get_reports_by_property(db, property_id)
    if not reports:
        raise HTTPException(status_code=404, detail="No reports found for this property")
    return reports

@router.get("/", response_model=list[ReportRead])
def view_all_reports(db: Session = Depends(get_db), admin_user=Depends(get_current_admin_user), skip: int = 0, limit: int = 100):
    reports = get_all_reports(db, skip, limit)
    if not reports:
        raise HTTPException(status_code=404, detail="No reports found")
    return reports

# 3️⃣ Xóa báo cáo theo report_id
@router.delete("/{report_id}", status_code=200)
def remove_report(report_id: int, db: Session = Depends(get_db), admin_user = Depends(get_current_admin_user)):
    deleted = delete_report(db, report_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Report not found")
    return deleted
