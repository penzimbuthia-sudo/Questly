import { useState } from 'react';
import { Search, Filter, Clock, AlertCircle, CheckCircle, XCircle, Info, Activity, Database, Server, RefreshCw } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const initialLogs = [
  { 
    id: 1, 
    time: '12:41:03', 
    level: 'INFO', 
    message: 'Nightly backup completed successfully', 
    source: 'backup-worker',
    color: 'blue'
  },
  { 
    id: 2, 
    time: '11:58:20', 
    level: 'WARN', 
    message: 'Storage usage crossed 85% threshold', 
    source: 'storage-monitor',
    color: 'yellow'
  },
  { 
    id: 3, 
    time: '11:02:11', 
    level: 'INFO', 
    message: 'Leaderboard recalculated for weekly challenge', 
    source: 'gamification-svc',
    color: 'blue'
  },
  { 
    id: 4, 
    time: '09:37:45', 
    level: 'ERROR', 
    message: 'Quiz auto-grader retried 3 times before success', 
    source: 'quiz-svc',
    color: 'red'
  },
  { 
    id: 5, 
    time: '08:15:02', 
    level: 'INFO', 
    message: '342 learning paths reindexed for search', 
    source: 'search-indexer',
    color: 'blue'
  },
];

const getLevelColor = (level) => {
  switch(level) {
    case 'INFO': return 'bg-blue-100 text-blue-700';
    case 'WARN': return 'bg-yellow-100 text-yellow-700';
    case 'ERROR': return 'bg-red-100 text-red-700';
    case 'DEBUG': return 'bg-purple-100 text-purple-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getLevelDot = (level) => {
  switch(level) {
    case 'INFO': return 'bg-blue-500';
    case 'WARN': return 'bg-yellow-500';
    case 'ERROR': return 'bg-red-500';
    case 'DEBUG': return 'bg-purple-500';
    default: return 'bg-slate-500';
  }
};

const getLevelIcon = (level) => {
  switch(level) {
    case 'INFO': return <Info size={14} />;
    case 'WARN': return <AlertCircle size={14} />;
    case 'ERROR': return <XCircle size={14} />;
    case 'DEBUG': return <Activity size={14} />;
    default: return <Info size={14} />;
  }
};

const getColorClass = (color) => {
  switch(color) {
    case 'blue': return 'bg-blue-50 text-blue-600';
    case 'yellow': return 'bg-yellow-50 text-yellow-600';
    case 'red': return 'bg-red-50 text-red-600';
    case 'green': return 'bg-green-50 text-green-600';
    case 'purple': return 'bg-purple-50 text-purple-600';
    default: return 'bg-blue-50 text-blue-600';
  }
};

export default function SystemLogs() {
  const [logs, setLogs] = useState(initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'All' || log.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleFilter = () => {
    alert('Filter options would open here');
  };

  const handleRefresh = () => {
    alert('Logs refreshed successfully!');
  };

  const handleViewLog = (id) => {
    const log = logs.find(l => l.id === id);
    alert(`Log Details:\nTime: ${log.time}\nLevel: ${log.level}\nMessage: ${log.message}\nSource: ${log.source}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">System logs</h1>
        <p className="text-slate-500 mt-1">Recent platform events and background jobs.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </form>
        <div className="flex gap-2">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="All">All Levels</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
            <option value="DEBUG">DEBUG</option>
          </select>
          <button 
            onClick={handleFilter}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <Filter size={18} />
            Filter
          </button>
          <Button className="flex items-center gap-2" variant="secondary" onClick={handleRefresh}>
            <RefreshCw size={18} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                    No logs found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => handleViewLog(log.id)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-sm font-mono text-slate-700">{log.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getLevelDot(log.level)}`}></span>
                        <div className="flex items-center gap-1">
                          {getLevelIcon(log.level)}
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getLevelColor(log.level)}`}>
                            {log.level}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-800">{log.message}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getColorClass(log.color)}`}>
                        <Server size={12} />
                        {log.source}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Logs</p>
          <p className="text-2xl font-bold text-slate-800">{logs.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">INFO</p>
          <p className="text-2xl font-bold text-blue-600">
            {logs.filter(l => l.level === 'INFO').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">WARN</p>
          <p className="text-2xl font-bold text-yellow-600">
            {logs.filter(l => l.level === 'WARN').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">ERROR</p>
          <p className="text-2xl font-bold text-red-600">
            {logs.filter(l => l.level === 'ERROR').length}
          </p>
        </div>
      </div>
    </div>
  );
}
