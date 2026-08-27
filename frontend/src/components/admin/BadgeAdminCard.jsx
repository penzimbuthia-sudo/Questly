import { Users, Edit, Trash2 } from 'lucide-react';

// From Person B - UI Components
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function BadgeAdminCard({ 
  badge, 
  onEdit, 
  onDelete,
  showActions = true 
}) {
  const Icon = badge.icon;

  const getColorClass = (color) => {
    switch(color) {
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'red': return 'bg-red-100 text-red-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const getBorderColor = (color) => {
    switch(color) {
      case 'yellow': return 'border-yellow-200';
      case 'blue': return 'border-blue-200';
      case 'purple': return 'border-purple-200';
      case 'orange': return 'border-orange-200';
      case 'green': return 'border-green-200';
      case 'red': return 'border-red-200';
      default: return 'border-blue-200';
    }
  };

  return (
    <Card className={`hover:shadow-md transition-shadow border-l-4 ${getBorderColor(badge.color)}`}>
      <Card.Body>
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-xl ${getColorClass(badge.color)} flex items-center justify-center flex-shrink-0`}>
            <Icon size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">{badge.title}</h3>
            <p className="text-sm text-slate-500 mt-0.5">{badge.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Users size={14} className="text-slate-400" />
              <span className="text-sm font-medium text-slate-700">{badge.unlocked} unlocked</span>
            </div>
          </div>
        </div>
      </Card.Body>
      
      {showActions && (
        <Card.Footer className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(badge.id)}>
            <Edit size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(badge.id)}>
            <Trash2 size={16} />
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}
