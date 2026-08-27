import { useState } from 'react';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';

// From Person B - UI Components
import Card from '../ui/Card';
import Button from '../ui/Button';

// From Person D - Status Enums (will be provided)
// import { STATUS } from '../../utils/constants';

export default function ReviewQueueCard({ 
  item, 
  onApprove, 
  onReject, 
  showActions = true 
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await onApprove(item.id);
    } catch (error) {
      console.error('Failed to approve:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      await onReject(item.id);
    } catch (error) {
      console.error('Failed to reject:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      resource: 'bg-blue-100 text-blue-700',
      'learning-path': 'bg-purple-100 text-purple-700',
      quiz: 'bg-green-100 text-green-700',
      discussion: 'bg-yellow-100 text-yellow-700',
    };
    return colors[type] || 'bg-slate-100 text-slate-700';
  };

  return (
    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
      <Card.Body>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800">{item.title}</h3>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getTypeColor(item.type)}`}>
                {item.type}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{item.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <User size={14} />
                <span>Submitted by {item.submittedBy}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <Clock size={14} />
                <span>{item.submittedAt}</span>
              </div>
            </div>
          </div>
          
          {showActions && item.status === 'Pending' && (
            <div className="flex items-center gap-2 ml-4">
              <Button 
                variant="success" 
                size="sm" 
                onClick={handleApprove}
                disabled={isProcessing}
                className="flex items-center gap-1"
              >
                <CheckCircle size={14} />
                Approve
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                onClick={handleReject}
                disabled={isProcessing}
                className="flex items-center gap-1"
              >
                <XCircle size={14} />
                Reject
              </Button>
            </div>
          )}
          
          {item.status && item.status !== 'Pending' && (
            <div className="ml-4">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                item.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {item.status}
              </span>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
