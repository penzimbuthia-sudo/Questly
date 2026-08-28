from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DiscussionBase(BaseModel):
    title: str
    content: str
    path_id: Optional[int] = None

class DiscussionCreate(DiscussionBase):
    author_id: int

class DiscussionUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    is_flagged: Optional[bool] = None
    status: Optional[str] = None

class DiscussionResponse(DiscussionBase):
    id: int
    author_id: int
    is_flagged: bool
    status: str
    reply_count: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
