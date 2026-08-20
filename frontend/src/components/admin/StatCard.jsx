import React from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'up',
  color = 'primary',
  subtitle 
}) => {
  const colors = {
    primary: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
    green: 'bg-green-500/10 text-green-500 border-green-500/20',
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    red: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-700 p-6 hover:border-dark-600 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-dark-400 text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-dark-400 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={clsx('p-3 rounded-xl border', colors[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1 mt-4">
          {changeType === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={clsx(
            'text-sm font-medium',
            changeType === 'up' ? 'text-green-500' : 'text-red-500'
          )}>
            {change}
          </span>
          <span className="text-dark-400 text-sm">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;