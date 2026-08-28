// src/pages/admin/Reports.jsx
import { useState } from 'react';
import { Search, Filter, Flag, Clock, User, CheckCircle, XCircle, Trash2 } from 'lucide-react';

// From Person B - UI Components
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const initialReports = [
  { id: 1, title: 'Inappropriate content in resource', item: 'React Performance Optimization', reportedBy: 'User123', time: '2h ago', status: 'Under review', color: 'red' },
  { id: 2, title: 'Spam in discussion', item: 'JavaScript Fundamentals thread', reportedBy: 'User456', time: '5h ago', status: 'Under review', color: 'yellow' },
  { id: 3, title: 'Plagiarism in learning path', item: 'Full Stack MERN Roadmap', reportedBy: 'User789', time: '1d ago', status: 'Under review', color: 'purple' },
  { id: 4, title: 'Harassment in comments', item: 'Node.js Backend Path thread', reportedBy: 'User221', time: '2d ago', status: 'Under review', color: 'orange' },
];

const getStatusColor = (status) => {
  switch(status) {
    case 'Under review': return 'bg-yellow-100 text-yellow-700';
    case 'Resolved': return 'bg-green-100 text-green-700';
    case 'Rejected': return 'bg-red-100 text-red-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getColorClass = (color) => {
  switch(color) {
    case 'red': return 'bg-red-100 text-red-600';
    case 'yellow': return 'bg-yellow-100 text-yellow-600';
    case 'purple': return 'bg-purple-100 text-purple-600';
    case 'orange': return 'bg-orange-100 text-orange-600';
    default: return 'bg-blue-100 text-blue-600';
  }
};

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         report.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || report.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleResolve = (id) => {
    const report = reports.find(r => r.id === id);
    if (window.confirm(`Resolve report "${report.title}"?`)) {
      setReports(reports.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
      alert(`Report "${report.title}" resolved successfully!`);
    }
  };

  const handleReject = (id) => {
    const report = reports.find(r => r.id === id);
    if (window.confirm(`Reject report "${report.title}"?`)) {
      setReports(reports.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
      alert(`Report "${report.title}" rejected successfully!`);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this report?`)) {
      setReports(reports.filter(r => r.id !== id));
      alert(`Report deleted successfully!`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
        <p className="text-slate-500 mt-1">Flagged content and conduct waiting on a decision.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="All">All Status</option>
            <option value="Under review">Under Review</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <Button variant="outline"><Filter size={18} /> Filter</Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-500">No reports found matching your criteria</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <Card.Body>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${getColorClass(report.color)} flex items-center justify-center shrink-0 mt-1`}>
                      <Flag size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800">{report.title}</h3>
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                          <span className="font-medium text-slate-700">{report.item}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                          <User size={14} />
                          <span>Reported by {report.reportedBy}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                          <Clock size={14} />
                          <span>{report.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === 'Under review' && (
                      <>
                        <Button variant="success" size="sm" className="flex items-center gap-1" onClick={() => handleResolve(report.id)}>
                          <CheckCircle size={14} /> Resolve
                        </Button>
                        <Button variant="danger" size="sm" className="flex items-center gap-1" onClick={() => handleReject(report.id)}>
                          <XCircle size={14} /> Reject
                        </Button>
                      </>
                    )}
                    {report.status !== 'Under review' && (
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(report.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}