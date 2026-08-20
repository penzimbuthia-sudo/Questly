import React from 'react';
import { Trophy, Users, Calendar, Edit, Trash2, Eye, Clock } from 'lucide-react';
import Pill from '../ui/Pill';
import Button from '../ui/Button';

const ChallengeAdminCard = ({
  id,
  title,
  description,
  type,
  participants,
  startDate,
  endDate,
  status = 'active',
  onEdit,
  onDelete,
  onView
}) => {
  const typeColors = {
    weekly: 'primary',
    monthly: 'purple',
    seasonal: 'yellow',
  };

  const statusColors = {
    active: 'green',
    upcoming: 'blue',
    ended: 'red',
  };

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-700 p-4 hover:border-dark-600 transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h4 className="text-white font-medium">{title}</h4>
            <Pill variant={typeColors[type]}>{type}</Pill>
            <Pill variant={statusColors[status]}>{status}</Pill>
          </div>
          <p className="text-dark-400 text-sm mb-2">{description}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-dark-400 flex items-center gap-1">
              <Users className="w-4 h-4" />
              {participants} participants
            </span>
            <span className="text-dark-400 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button size="sm" variant="ghost" icon={<Eye className="w-4 h-4" />} onClick={() => onView(id)} />
          <Button size="sm" variant="ghost" icon={<Edit className="w-4 h-4" />} onClick={() => onEdit(id)} />
          <Button size="sm" variant="ghost" icon={<Trash2 className="w-4 h-4" />} onClick={() => onDelete(id)} />
        </div>
      </div>
    </div>
  );
};

export default ChallengeAdminCard;
