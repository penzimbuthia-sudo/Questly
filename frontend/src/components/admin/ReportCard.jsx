import { Flag, User, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react';

// From Person B - UI Components
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function ReportCard({ 
  report, 
  onResolve, 
  onReject, 
  onDelete,
  showActions = true 
}) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Under review': return 'bg-yellow-100 text-yellow-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getColorClass = (color) => {
    switch(color) {
      case 'red': return 'bg-red-100 text-red-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <Card.Body>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl ${getColorClass(report.color)} flex items-center justify-center flex-shrink-0 mt-1`}>
              <Flag size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-800">{report.title}</h3>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{report.item}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <User size={14} />
                  <span>Reported by {report.reportedBy}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Clock size={14} />
                  <span>{report.time}</span>
                </div>
              </div>
            </div>
          </div>
          
          {showActions && (
            <div className="flex items-center gap-2">
              {report.status === 'Under review' && (
                <>
                  <Button 
                    variant="success" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => onResolve(report.id)}
                  >
                    <CheckCircle size={14} />
                    Resolve
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => onReject(report.id)}
                  >
                    <XCircle size={14} />
                    Reject
                  </Button>
                </>
              )}
              {report.status !== 'Under review' && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={() => onDelete(report.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
