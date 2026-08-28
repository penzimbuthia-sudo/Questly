// src/pages/admin/SystemLogs.jsx
import { useState } from 'react';
import { Search, Filter, AlertCircle, CheckCircle, Info, XCircle, Clock } from 'lucide-react';

// From Person B - UI Components
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const initialLogs = [
  { id: 1, level: 'info', message: 'User john@example.com logged in', timestamp: '2024-01-15 09:23:45', source: 'Auth Service' },
  { id: 2, level: 'warning', message: 'Rate limit exceeded for IP 192.168.1.1', timestamp: '2024-01-15 10:15:22', source: 'API Gateway' },
  { id: 3, level: 'error', message: 'Database connection failed - retrying', timestamp: '2024-01-15 11:30:10', source: 'Database' },
  { id: 4, level: 'info', message: 'Resource "React Hooks" published by Aisha K.', timestamp: '2024-01-15 12:45:33', source: 'Content Service' },
  { id: 5, level: 'warning', message: 'Slow query detected: SELECT * FROM users', timestamp: '2024-01-15 13:20:18', source: 'Database' },
  { id: 6, level: 'error', message: 'File upload failed for user123', timestamp: '2024-01-15 14:05:55', source: 'Storage Service' },
  { id: 7, level: 'info', message: 'New challenge "The 5-day builder" created', timestamp: '2024-01-15 15:00:00', source: 'Gamification' },
];

const getLevelColor = (level) => {
  switch(level) {
    case 'info': return 'bg-blue-100 text-blue-700';
    case 'warning': return 'bg-yellow-100 text-yellow-700';
    case 'error': return 'bg-red-100 text-red-700';
    case 'debug': return 'bg-gray-100 text-gray-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getLevelIcon = (level) => {
  switch(level) {
    case 'info': return <Info size={16} className="text-blue-600" />;
    case 'warning': return <AlertCircle size={16} className="text-yellow-600" />;
    case 'error': return <XCircle size={16} className="text-red-600" />;
    default: return <Info size={16} className="text-slate-600" />;
  }
};

export default function SystemLogs() {
  const [logs, setLogs] = useState(initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.timestamp.includes(searchTerm);
    const matchesLevel = filterLevel === 'All' || log.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs?')) {
      setLogs([]);
      alert('Logs cleared successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">System Logs</h1>
        <p className="text-slate-500 mt-1">Monitor system activity and errors across the platform.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="All">All Levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="debug">Debug</option>
          </select>
          <Button variant="outline"><Filter size={18} /> Filter</Button>
          <Button variant="danger" onClick={handleClearLogs}>
            Clear Logs
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                    {logs.length === 0 ? 'No logs available' : 'No logs found matching your criteria'}
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getLevelIcon(log.level)}
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getLevelColor(log.level)}`}>
                          {log.level}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{log.message}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{log.source}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">{log.timestamp}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}