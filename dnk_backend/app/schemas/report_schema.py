from pydantic import BaseModel
from datetime import datetime
from app.models.report_model import ReportStatusEnum

class ReportBase(BaseModel):
    property_id: int
    reason: str
    description: str

class ReportCreate(ReportBase):
    pass

class ReportRead(ReportBase):
    report_id: int
    user_id: int
    status: ReportStatusEnum
    created_at: datetime
