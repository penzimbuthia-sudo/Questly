import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, MessageSquare, ThumbsUp, Flag, CheckCircle, AlertCircle, Clock, Users, X } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const initialDiscussions = [
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
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({ 
    title: '', 
    learningPath: '', 
    replies: '0', 
    likes: '0', 
    status: 'Clear' 
  });

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         discussion.learningPath.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || discussion.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleFilter = () => {
    alert('Filter options would open here');
  };

  const handleView = (id) => {
    const discussion = discussions.find(d => d.id === id);
    alert(`Viewing: ${discussion.title}\nLearning Path: ${discussion.learningPath}\nReplies: ${discussion.replies}\nLikes: ${discussion.likes}\nStatus: ${discussion.status}`);
  };

  const handleEdit = (id) => {
    const discussion = discussions.find(d => d.id === id);
    alert(`Edit discussion: ${discussion.title}\nLearning Path: ${discussion.learningPath}\nStatus: ${discussion.status}`);
  };

  const handleDelete = (id) => {
    const discussion = discussions.find(d => d.id === id);
    if (window.confirm(`Are you sure you want to delete "${discussion.title}"?`)) {
      setDiscussions(discussions.filter(d => d.id !== id));
      alert(`Discussion "${discussion.title}" deleted successfully!`);
    }
  };

  const handleAddDiscussion = () => {
    if (!newDiscussion.title.trim() || !newDiscussion.learningPath.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    const discussion = {
      id: discussions.length + 1,
      ...newDiscussion,
      replies: parseInt(newDiscussion.replies) || 0,
      likes: parseInt(newDiscussion.likes) || 0,
      color: newDiscussion.status === 'Clear' ? 'blue' : 'red'
    };
    
    setDiscussions([...discussions, discussion]);
    setShowAddModal(false);
    setNewDiscussion({ title: '', learningPath: '', replies: '0', likes: '0', status: 'Clear' });
    alert(`Discussion "${discussion.title}" added successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Discussions</h1>
        <p className="text-slate-500 mt-1">Threads under each learning path — keep the tone respectful.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </form>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="All">All Status</option>
            <option value="Clear">Clear</option>
            <option value="Flagged">Flagged</option>
            <option value="Pending">Pending</option>
          </select>
          <button 
            onClick={handleFilter}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <Filter size={18} />
            Filter
          </button>
          <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
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
              {filteredDiscussions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    No discussions found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredDiscussions.map((discussion) => (
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
                        <button 
                          onClick={() => handleView(discussion.id)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(discussion.id)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(discussion.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
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
          <p className="text-sm text-slate-500">Total Threads</p>
          <p className="text-2xl font-bold text-slate-800">{discussions.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Clear</p>
          <p className="text-2xl font-bold text-green-600">
            {discussions.filter(d => d.status === 'Clear').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Flagged</p>
          <p className="text-2xl font-bold text-red-600">
            {discussions.filter(d => d.status === 'Flagged').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Replies</p>
          <p className="text-2xl font-bold text-blue-600">
            {discussions.reduce((sum, d) => sum + d.replies, 0)}
          </p>
        </div>
      </div>

      {/* Add Discussion Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-slate-800">New Thread</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Thread Title</label>
                <input
                  type="text"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                  placeholder="Enter thread title"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Learning Path</label>
                <input
                  type="text"
                  value={newDiscussion.learningPath}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, learningPath: e.target.value })}
                  placeholder="Enter learning path"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <select
                  value={newDiscussion.status}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Clear">Clear</option>
                  <option value="Flagged">Flagged</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" className="flex-1" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" className="flex-1" onClick={handleAddDiscussion}>
                  Create Thread
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
