from pydantic import BaseModel
from datetime import datetime

class ReportBase(BaseModel):
    property_id: int
    reason: str
    description: str

class ReportCreate(ReportBase):
    pass

class ReportRead(ReportBase):
    report_id: int
    user_id: int
    created_at: datetime
