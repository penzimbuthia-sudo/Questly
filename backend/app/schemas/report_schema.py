from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class ReportStatus(str, Enum):
    PENDING = "pending"
    RESOLVED = "resolved"
    REJECTED = "rejected"

class ReportBase(BaseModel):
    target_type: str
    target_id: int
    reason: str

class ReportCreate(ReportBase):
    reporter_id: int

class ReportUpdate(BaseModel):
    status: Optional[ReportStatus] = None

class ReportResponse(ReportBase):
    id: int
    reporter_id: int
    status: ReportStatus
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
