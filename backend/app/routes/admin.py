from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app.db.session import get_db
from app.models.user import User
from app.models.discussion import Discussion
from app.models.report import Report, ReportStatus
from app.models.system_log import SystemLog
from app.models.resource import Resource
from app.models.learning_path import LearningPath
from app.utils.decorators import role_required
from app.utils.helpers import get_current_user

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/stats")
@role_required("admin")
def get_admin_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    total_users = db.query(func.count(User.id)).scalar()
    active_users = db.query(func.count(User.id)).filter(User.status == "active").scalar()
    
    admin_count = db.query(func.count(User.id)).filter(User.role == "admin").scalar()
    contributor_count = db.query(func.count(User.id)).filter(User.role == "contributor").scalar()
    learner_count = db.query(func.count(User.id)).filter(User.role == "learner").scalar()
    
    total_discussions = db.query(func.count(Discussion.id)).scalar()
    flagged_discussions = db.query(func.count(Discussion.id)).filter(Discussion.is_flagged == True).scalar()
    
    pending_reports = db.query(func.count(Report.id)).filter(Report.status == ReportStatus.PENDING).scalar()
    resolved_reports = db.query(func.count(Report.id)).filter(Report.status == ReportStatus.RESOLVED).scalar()
    rejected_reports = db.query(func.count(Report.id)).filter(Report.status == ReportStatus.REJECTED).scalar()
    
    total_resources = db.query(func.count(Resource.id)).scalar()
    pending_resources = db.query(func.count(Resource.id)).filter(Resource.status == "pending").scalar()
    
    total_paths = db.query(func.count(LearningPath.id)).scalar()
    pending_paths = db.query(func.count(LearningPath.id)).filter(LearningPath.status == "pending").scalar()
    
    return {
        "users": {
            "total": total_users,
            "active": active_users,
            "admin": admin_count,
            "contributor": contributor_count,
            "learner": learner_count
        },
        "discussions": {
            "total": total_discussions,
            "flagged": flagged_discussions
        },
        "reports": {
            "pending": pending_reports,
            "resolved": resolved_reports,
            "rejected": rejected_reports
        },
        "resources": {
            "total": total_resources,
            "pending": pending_resources
        },
        "learning_paths": {
            "total": total_paths,
            "pending": pending_paths
        }
    }

@router.get("/logs", response_model=List[dict])
@role_required("admin")
def get_system_logs(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    level: Optional[str] = None,
    source: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(SystemLog)
    
    if level:
        query = query.filter(SystemLog.level == level)
    if source:
        query = query.filter(SystemLog.source.ilike(f"%{source}%"))
    
    logs = query.order_by(SystemLog.created_at.desc()).offset(skip).limit(limit).all()
    return [log.to_dict() for log in logs]

@router.post("/logs", response_model=dict)
@role_required("admin")
def create_system_log(
    level: str,
    message: str,
    source: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    log = SystemLog(
        level=level,
        message=message,
        source=source,
        user_id=current_user.id
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    return log.to_dict()

@router.get("/dashboard")
@role_required("admin")
def get_dashboard_data(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    stats = get_admin_stats(db, current_user)
    
    recent_logs = db.query(SystemLog).order_by(SystemLog.created_at.desc()).limit(10).all()
    
    recent_reports = db.query(Report).order_by(Report.created_at.desc()).limit(10).all()
    
    return {
        "stats": stats,
        "recent_logs": [log.to_dict() for log in recent_logs],
        "recent_reports": [report.to_dict() for report in recent_reports]
    }
