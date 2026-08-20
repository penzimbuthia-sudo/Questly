import React from 'react';
import { Check, X, Clock, FileText, Video, BookOpen, AlertCircle } from 'lucide-react';
import Pill from '../ui/Pill';
import Button from '../ui/Button';

const ReviewQueueCard = ({ 
  id,
  title,
  type,
  subtype,
  submittedBy,
  submittedAt,
  onApprove,
  onReject,
  onView
}) => {
  const typeIcons = {
    'Resource': <FileText className="w-4 h-4" />,
    'Video': <Video className="w-4 h-4" />,
    'Article': <FileText className="w-4 h-4" />,
    'Learning Path': <BookOpen className="w-4 h-4" />,
    'Quiz': <AlertCircle className="w-4 h-4" />,
  };

  const typeColors = {
    'Resource': 'primary',
    'Video': 'blue',
    'Article': 'green',
    'Learning Path': 'purple',
    'Quiz': 'yellow',
  };

  return (
    <div className="bg-dark-900 rounded-lg border border-dark-700 p-4 hover:border-dark-600 transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-medium truncate">{title}</h4>
            <Pill variant={typeColors[type]}>{type}</Pill>
            {subtype && <Pill variant="default">{subtype}</Pill>}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-dark-400">Submitted by {submittedBy}</span>
            <span className="text-dark-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {submittedAt}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant="success"
            icon={<Check className="w-4 h-4" />}
            onClick={() => onApprove(id)}
          >
            Approve
          </Button>
          <Button
            size="sm"
            variant="danger"
            icon={<X className="w-4 h-4" />}
            onClick={() => onReject(id)}
          >
            Reject
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onView(id)}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewQueueCard;
