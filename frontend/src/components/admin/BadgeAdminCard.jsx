import React from 'react';
import { Award, Edit, Trash2, Eye, Users } from 'lucide-react';
import Pill from '../ui/Pill';
import Button from '../ui/Button';

const BadgeAdminCard = ({
  id,
  name,
  description,
  icon,
  category,
  points,
  earnedCount,
  onEdit,
  onDelete,
  onView
}) => {
  const categoryColors = {
    learning: 'primary',
    contribution: 'green',
    community: 'purple',
    special: 'yellow',
  };

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-700 p-4 hover:border-dark-600 transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-primary-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-white font-medium">{name}</h4>
              <Pill variant={categoryColors[category]}>{category}</Pill>
            </div>
            <p className="text-dark-400 text-sm">{description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="text-dark-400 flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-500" />
                {points} points
              </span>
              <span className="text-dark-400 flex items-center gap-1">
                <Users className="w-4 h-4" />
                {earnedCount} earned
              </span>
            </div>
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

export default BadgeAdminCard;
