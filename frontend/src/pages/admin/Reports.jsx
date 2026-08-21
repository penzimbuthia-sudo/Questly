import { Search, Filter, Flag, Clock, User, FileText, MessageSquare, MapPin, MessageCircle, CheckCircle, XCircle, AlertCircle, Eye, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const reports = [
  { 
    id: 1, 
    title: 'Inappropriate content in resource', 
    item: 'React Performance Optimization', 
    reportedBy: 'User123', 
    time: '2h ago',
    status: 'Under review',
    type: 'resource',
    color: 'red'
  },
  { 
    id: 2, 
    title: 'Spam in discussion', 
    item: 'JavaScript Fundamentals thread', 
    reportedBy: 'User456', 
    time: '5h ago',
    status: 'Under review',
    type: 'discussion',
    color: 'yellow'
  },
  { 
    id: 3, 
    title: 'Plagiarism in learning path', 
    item: 'Full Stack MERN Roadmap', 
    reportedBy: 'User789', 
    time: '1d ago',
    status: 'Under review',
    type: 'path',
    color: 'purple'
  },
  { 
    id: 4, 
    title: 'Harassment in comments', 
    item: 'Node.js Backend Path thread', 
    reportedBy: 'User221', 
    time: '2d ago',
    status: 'Under review',
    type: 'comment',
    color: 'orange'
  },
];

const getStatusColor = (status) => {
  switch(status) {
    case 'Under review': return 'bg-yellow-100 text-yellow-700';
    case 'Resolved': return 'bg-green-100 text-green-700';
    case 'Rejected': return 'bg-red-100 text-red-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getStatusDot = (status) => {
  switch(status) {
    case 'Under review': return 'bg-yellow-500';
    case 'Resolved': return 'bg-green-500';
    case 'Rejected': return 'bg-red-500';
    default: return 'bg-slate-500';
  }
};

const getTypeIcon = (type) => {
  switch(type) {
    case 'resource': return <FileText size={16} />;
    case 'discussion': return <MessageSquare size={16} />;
    case 'path': return <MapPin size={16} />;
    case 'comment': return <MessageCircle size={16} />;
    default: return <Flag size={16} />;
  }
};

const getTypeLabel = (type) => {
  switch(type) {
    case 'resource': return 'Resource';
    case 'discussion': return 'Discussion';
    case 'path': return 'Learning Path';
    case 'comment': return 'Comment';
    default: return 'Report';
  }
};

const getColorClass = (color) => {
  switch(color) {
    case 'red': return 'bg-red-100 text-red-600';
    case 'yellow': return 'bg-yellow-100 text-yellow-600';
    case 'purple': return 'bg-purple-100 text-purple-600';
    case 'orange': return 'bg-orange-100 text-orange-600';
    case 'blue': return 'bg-blue-100 text-blue-600';
    case 'green': return 'bg-green-100 text-green-600';
    default: return 'bg-blue-100 text-blue-600';
  }
};

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
        <p className="text-slate-500 mt-1">Flagged content and conduct waiting on a decision.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium text-slate-700">
            <Filter size={18} />
            Filter
          </button>
          <Button className="flex items-center gap-2" variant="secondary">
            <Clock size={18} />
            This month ▼
          </Button>
        </div>
      </div>

      {/* Reports Cards */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <Card.Body>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${getColorClass(report.color)} flex items-center justify-center flex-shrink-0 mt-1`}>
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
                        {getTypeIcon(report.type)}
                        <span>{getTypeLabel(report.type)}:</span>
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
                  <Button variant="success" size="sm" className="flex items-center gap-1">
                    <CheckCircle size={14} />
                    Resolve
                  </Button>
                  <Button variant="danger" size="sm" className="flex items-center gap-1">
                    <XCircle size={14} />
                    Reject
                  </Button>
                  <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Reports</p>
          <p className="text-2xl font-bold text-slate-800">24</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Under Review</p>
          <p className="text-2xl font-bold text-yellow-600">8</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Resolved</p>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">4</p>
        </div>
      </div>
    </div>
  );
}
