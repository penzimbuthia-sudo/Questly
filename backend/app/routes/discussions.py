from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.models.discussion import Discussion
from app.models.user import User
from app.schemas.discussion_schema import DiscussionResponse, DiscussionUpdate
from app.utils.decorators import role_required
from app.utils.helpers import get_current_user

router = APIRouter(prefix="/discussions", tags=["discussions"])

@router.get("/", response_model=List[DiscussionResponse])
@role_required("admin")
def get_discussions(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    flagged: Optional[bool] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Discussion)
    
    if flagged is not None:
        query = query.filter(Discussion.is_flagged == flagged)
    if status:
        query = query.filter(Discussion.status == status)
    
    discussions = query.order_by(Discussion.created_at.desc()).offset(skip).limit(limit).all()
    return discussions

@router.get("/{discussion_id}", response_model=DiscussionResponse)
@role_required("admin")
def get_discussion(
    discussion_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    discussion = db.query(Discussion).filter(Discussion.id == discussion_id).first()
    if not discussion:
        raise HTTPException(status_code=404, detail="Discussion not found")
    return discussion

@router.patch("/{discussion_id}/flag", response_model=DiscussionResponse)
@role_required("admin")
def flag_discussion(
    discussion_id: int,
    is_flagged: bool,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    discussion = db.query(Discussion).filter(Discussion.id == discussion_id).first()
    if not discussion:
        raise HTTPException(status_code=404, detail="Discussion not found")
    
    discussion.is_flagged = is_flagged
    discussion.status = "flagged" if is_flagged else "active"
    db.commit()
    db.refresh(discussion)
    return discussion

@router.patch("/{discussion_id}", response_model=DiscussionResponse)
@role_required("admin")
def update_discussion(
    discussion_id: int,
    update_data: DiscussionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    discussion = db.query(Discussion).filter(Discussion.id == discussion_id).first()
    if not discussion:
        raise HTTPException(status_code=404, detail="Discussion not found")
    
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(discussion, key, value)
    
    db.commit()
    db.refresh(discussion)
    return discussion

@router.delete("/{discussion_id}", response_model=dict)
@role_required("admin")
def delete_discussion(
    discussion_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    discussion = db.query(Discussion).filter(Discussion.id == discussion_id).first()
    if not discussion:
        raise HTTPException(status_code=404, detail="Discussion not found")
    
    db.delete(discussion)
    db.commit()
    return {"message": "Discussion deleted successfully"}
