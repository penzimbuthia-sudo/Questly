// src/pages/admin/LearningPaths.jsx
import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, BookOpen, Users, X } from 'lucide-react';

// From Person B - UI Components
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// From Person D - Status Enums
// import { STATUS } from '../../constants/statusEnums';

const initialLearningPaths = [
  { id: 1, title: 'React Developer Path', modules: 16, contributor: 'Aisha K.', enrolled: '2,480', status: 'Published', color: 'blue' },
  { id: 2, title: 'JavaScript Fundamentals', modules: 9, contributor: 'Brian O.', enrolled: '3,120', status: 'Published', color: 'green' },
  { id: 3, title: 'Node.js Backend Path', modules: 18, contributor: 'Chinedu M.', enrolled: '1,760', status: 'Published', color: 'purple' },
  { id: 4, title: 'Full Stack MERN Roadmap', modules: 24, contributor: 'Chinedu M.', enrolled: '—', status: 'Pending', color: 'yellow' },
];

const getStatusColor = (status) => {
  switch(status) {
    case 'Published': return 'bg-green-100 text-green-700';
    case 'Pending': return 'bg-yellow-100 text-yellow-700';
    case 'Draft': return 'bg-gray-100 text-gray-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getStatusDot = (status) => {
  switch(status) {
    case 'Published': return 'bg-green-500';
    case 'Pending': return 'bg-yellow-500';
    case 'Draft': return 'bg-gray-500';
    default: return 'bg-slate-500';
  }
};

const getColorClass = (color) => {
  switch(color) {
    case 'blue': return 'bg-blue-100 text-blue-600';
    case 'green': return 'bg-green-100 text-green-600';
    case 'purple': return 'bg-purple-100 text-purple-600';
    case 'yellow': return 'bg-yellow-100 text-yellow-600';
    default: return 'bg-blue-100 text-blue-600';
  }
};

export default function LearningPaths() {
  const [learningPaths, setLearningPaths] = useState(initialLearningPaths);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPath, setNewPath] = useState({ title: '', modules: '', contributor: '', enrolled: '0', status: 'Pending' });

  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         path.contributor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || path.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id) => {
    const path = learningPaths.find(p => p.id === id);
    alert(`Edit learning path: ${path.title}\nModules: ${path.modules}\nContributor: ${path.contributor}\nStatus: ${path.status}`);
  };

  const handleDelete = (id) => {
    const path = learningPaths.find(p => p.id === id);
    if (window.confirm(`Are you sure you want to delete "${path.title}"?`)) {
      setLearningPaths(learningPaths.filter(p => p.id !== id));
      alert(`Learning path "${path.title}" deleted successfully!`);
    }
  };

  const handleAddPath = () => {
    if (!newPath.title.trim() || !newPath.contributor.trim() || !newPath.modules) {
      alert('Please fill in all required fields');
      return;
    }
    const path = {
      id: learningPaths.length + 1,
      ...newPath,
      enrolled: newPath.enrolled || '0',
      color: newPath.status === 'Published' ? 'blue' : 'yellow'
    };
    setLearningPaths([...learningPaths, path]);
    setShowAddModal(false);
    setNewPath({ title: '', modules: '', contributor: '', enrolled: '0', status: 'Pending' });
    alert(`Learning path "${path.title}" added successfully!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Learning paths</h1>
        <p className="text-slate-500 mt-1">Structured module sequences built from shared resources.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search learning paths..."
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
            <option value="Published">Published</option>
            <option value="Pending">Pending</option>
            <option value="Draft">Draft</option>
          </select>
          <Button variant="outline"><Filter size={18} /> Filter</Button>
          <Button onClick={() => setShowAddModal(true)}><Plus size={18} /> New Path</Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Modules</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contributor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Enrolled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPaths.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-500">No learning paths found</td></tr>
              ) : (
                filteredPaths.map((path) => (
                  <tr key={path.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${getColorClass(path.color)} flex items-center justify-center font-semibold text-sm`}>
                          {path.title.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-800">{path.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">{path.modules} modules</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{path.contributor}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">{path.enrolled}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusDot(path.status)}`}></span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(path.status)}`}>{path.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(path.id)}><Edit size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(path.id)}><Trash2 size={16} /></Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-slate-800">Add New Learning Path</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={newPath.title}
                  onChange={(e) => setNewPath({ ...newPath, title: e.target.value })}
                  placeholder="Enter learning path title"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Modules</label>
                <input
                  type="number"
                  value={newPath.modules}
                  onChange={(e) => setNewPath({ ...newPath, modules: e.target.value })}
                  placeholder="Enter number of modules"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Contributor</label>
                <input
                  type="text"
                  value={newPath.contributor}
                  onChange={(e) => setNewPath({ ...newPath, contributor: e.target.value })}
                  placeholder="Enter contributor name"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <select
                  value={newPath.status}
                  onChange={(e) => setNewPath({ ...newPath, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Published">Published</option>
                  <option value="Pending">Pending</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" className="flex-1" onClick={handleAddPath}>Add Path</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}