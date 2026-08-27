import { Users, Trophy, Edit, Trash2 } from 'lucide-react';

// From Person B - UI Components
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function ChallengeAdminCard({ 
  challenge, 
  onEdit, 
  onDelete,
  showActions = true 
}) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Upcoming': return 'bg-yellow-100 text-yellow-700';
      case 'Ended': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusDot = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-500';
      case 'Upcoming': return 'bg-yellow-500';
      case 'Ended': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Weekly': return 'bg-blue-50 text-blue-600';
      case 'Monthly': return 'bg-purple-50 text-purple-600';
      case 'Seasonal': return 'bg-orange-50 text-orange-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  const getColorClass = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'red': return 'bg-red-100 text-red-600';
      case 'green': return 'bg-green-100 text-green-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <Card.Body>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl ${getColorClass(challenge.color)} flex items-center justify-center font-bold text-lg flex-shrink-0`}>
              {challenge.title.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{challenge.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeColor(challenge.type)}`}>
                  {challenge.type}
                </span>
                <span className="text-xs text-slate-500">{challenge.period}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${getStatusDot(challenge.status)}`}></span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(challenge.status)}`}>
              {challenge.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Participants</p>
              <p className="text-sm font-semibold text-slate-800">{challenge.participants}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">Reward</p>
              <p className="text-sm font-semibold text-slate-800">{challenge.xp}</p>
            </div>
          </div>
        </div>
      </Card.Body>
      
      {showActions && (
        <Card.Footer className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(challenge.id)}>
            <Edit size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(challenge.id)}>
            <Trash2 size={16} />
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}
