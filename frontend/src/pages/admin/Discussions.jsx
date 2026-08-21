import { Search, Filter, Plus, Edit, Trash2, Eye, MessageSquare, ThumbsUp, Flag, CheckCircle, AlertCircle, Clock, Users } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const discussions = [
  { 
    id: 1, 
    title: "What's the best way to handle state management in React?", 
    learningPath: 'React Developer Path', 
    replies: 23, 
    likes: 128, 
    status: 'Clear',
    color: 'blue'
  },
  { 
    id: 2, 
    title: 'How do I optimize my JavaScript code?', 
    learningPath: 'JavaScript Fundamentals', 
    replies: 31, 
    likes: 94, 
    status: 'Clear',
    color: 'green'
  },
  { 
    id: 3, 
    title: 'Anyone have starter templates for Express?', 
    learningPath: 'Node.js Backend Path', 
    replies: 9, 
    likes: 40, 
    status: 'Clear',
    color: 'purple'
  },
  { 
    id: 4, 
    title: 'This looks like a copy-pasted answer', 
    learningPath: 'Full Stack MERN Roadmap', 
    replies: 4, 
    likes: 2, 
    status: 'Flagged',
    color: 'red'
  },
];

const getStatusColor = (status) => {
  switch(status) {
    case 'Clear': return 'bg-green-100 text-green-700';
    case 'Flagged': return 'bg-red-100 text-red-700';
    case 'Pending': return 'bg-yellow-100 text-yellow-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getStatusDot = (status) => {
  switch(status) {
    case 'Clear': return 'bg-green-500';
    case 'Flagged': return 'bg-red-500';
    case 'Pending': return 'bg-yellow-500';
    default: return 'bg-slate-500';
  }
};

const getStatusIcon = (status) => {
  switch(status) {
    case 'Clear': return <CheckCircle size={14} className="text-green-600" />;
    case 'Flagged': return <Flag size={14} className="text-red-600" />;
    case 'Pending': return <AlertCircle size={14} className="text-yellow-600" />;
    default: return null;
  }
};

const getColorClass = (color) => {
  switch(color) {
    case 'blue': return 'bg-blue-100 text-blue-600';
    case 'green': return 'bg-green-100 text-green-600';
    case 'purple': return 'bg-purple-100 text-purple-600';
    case 'red': return 'bg-red-100 text-red-600';
    case 'yellow': return 'bg-yellow-100 text-yellow-600';
    default: return 'bg-blue-100 text-blue-600';
  }
};

export default function Discussions() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Discussions</h1>
        <p className="text-slate-500 mt-1">Threads under each learning path — keep the tone respectful.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium text-slate-700">
            <Filter size={18} />
            Filter
          </button>
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            New Thread
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Thread</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Learning Path</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Replies</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Likes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {discussions.map((discussion) => (
                <tr key={discussion.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${getColorClass(discussion.color)} flex items-center justify-center font-semibold text-sm flex-shrink-0`}>
                        <MessageSquare size={18} />
                      </div>
                      <span className="font-medium text-slate-800">{discussion.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{discussion.learningPath}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-slate-400" />
                      <span className="text-sm text-slate-600">{discussion.replies}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ThumbsUp size={14} className="text-slate-400" />
                      <span className="text-sm text-slate-600">{discussion.likes}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getStatusDot(discussion.status)}`}></span>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(discussion.status)}
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(discussion.status)}`}>
                          {discussion.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Threads</p>
          <p className="text-2xl font-bold text-slate-800">156</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Clear</p>
          <p className="text-2xl font-bold text-green-600">142</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Flagged</p>
          <p className="text-2xl font-bold text-red-600">8</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Replies</p>
          <p className="text-2xl font-bold text-blue-600">2,847</p>
        </div>
      </div>
    </div>
  );
}
