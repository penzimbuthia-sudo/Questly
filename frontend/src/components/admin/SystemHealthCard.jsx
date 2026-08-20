import React from 'react';
import { Server, Database, HardDrive, Shield, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const SystemHealthCard = ({ status }) => {
  const items = [
    { label: 'Server Status', value: status.server, icon: Server },
    { label: 'Database', value: status.database, icon: Database },
    { label: 'Storage', value: status.storage, icon: HardDrive },
    { label: 'Backup', value: status.backup, icon: Shield },
  ];

  const getStatusIcon = (value) => {
    if (value === 'Operational') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (value.includes('%')) {
      const num = parseInt(value);
      if (num > 80) return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getStatusColor = (value) => {
    if (value === 'Operational') return 'text-green-500';
    if (value.includes('%')) {
      const num = parseInt(value);
      if (num > 80) return 'text-yellow-500';
      return 'text-green-500';
    }
    return 'text-red-500';
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex items-center justify-between p-3 bg-dark-900 rounded-lg border border-dark-700">
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-dark-400" />
              <span className="text-dark-300 text-sm">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(item.value)}
              <span className={`text-sm font-medium ${getStatusColor(item.value)}`}>
                {item.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SystemHealthCard;
