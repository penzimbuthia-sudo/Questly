// src/pages/admin/Resources.jsx
import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Video, FileText, BookOpen, Eye as ViewIcon, X } from 'lucide-react';

// From Person B - UI Components
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// From Person D - Status Enums
// import { STATUS } from '../../constants/statusEnums';

// From your own service
// import { resourceService } from '../../services/resourceService';

const initialResources = [
  { id: 1, title: 'Understanding React useState Hook', type: 'Video', contributor: 'Aisha K.', views: '12.4k', status: 'Published', color: 'blue' },
  { id: 2, title: 'JavaScript Array Methods Explained', type: 'Article', contributor: 'Brian O.', views: '8.7k', status: 'Published', color: 'green' },
  { id: 3, title: 'React Performance Optimization', type: 'Video', contributor: 'Aisha K.', views: '—', status: 'Pending', color: 'yellow' },
  { id: 4, title: 'Advanced TypeScript Concepts', type: 'Article', contributor: 'Brian O.', views: '—', status: 'Pending', color: 'yellow' },
  { id: 5, title: 'Intro to Node Streams', type: 'Tutorial', contributor: 'Chinedu M.', views: '3.1k', status: 'Published', color: 'purple' },
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

const getTypeIcon = (type) => {
  switch(type) {
    case 'Video': return <Video size={16} />;
    case 'Article': return <FileText size={16} />;
    case 'Tutorial': return <BookOpen size={16} />;
    default: return <BookOpen size={16} />;
  }
};

const getTypeColor = (type) => {
  switch(type) {
    case 'Video': return 'bg-blue-100 text-blue-600';
    case 'Article': return 'bg-green-100 text-green-600';
    case 'Tutorial': return 'bg-purple-100 text-purple-600';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const getColorClass = (color) => {
  switch(color) {
    case 'blue': return 'bg-blue-100 text-blue-600';
    case 'green': return 'bg-green-100 text-green-600';
    case 'yellow': return 'bg-yellow-100 text-yellow-600';
    case 'purple': return 'bg-purple-100 text-purple-600';
    case 'red': return 'bg-red-100 text-red-600';
    default: return 'bg-blue-100 text-blue-600';
  }
};

export default function Resources() {
  const [resources, setResources] = useState(initialResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', type: 'Video', contributor: '', views: '0', status: 'Pending' });

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.contributor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || resource.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleEdit = (id) => {
    const resource = resources.find(r => r.id === id);
    alert(`Edit resource: ${resource.title}\nType: ${resource.type}\nContributor: ${resource.contributor}\nStatus: ${resource.status}`);
  };

  const handleDelete = (id) => {
    const resource = resources.find(r => r.id === id);
    if (window.confirm(`Are you sure you want to delete "${resource.title}"?`)) {
      setResources(resources.filter(r => r.id !== id));
      alert(`Resource "${resource.title}" deleted successfully!`);
    }
  };

  const handleAddResource = () => {
    if (!newResource.title.trim() || !newResource.contributor.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    const resource = {
      id: resources.length + 1,
      ...newResource,
      color: newResource.type === 'Video' ? 'blue' : newResource.type === 'Article' ? 'green' : 'purple'
    };
    setResources([...resources, resource]);
    setShowAddModal(false);
    setNewResource({ title: '', type: 'Video', contributor: '', views: '0', status: 'Pending' });
    alert(`Resource "${resource.title}" added successfully!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Resources</h1>
        <p className="text-slate-500 mt-1">Videos, articles, and tutorials shared by contributors.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="All">All Types</option>
            <option value="Video">Video</option>
            <option value="Article">Article</option>
            <option value="Tutorial">Tutorial</option>
          </select>
          <Button variant="outline">
            <Filter size={18} /> Filter
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus size={18} /> New Resource
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contributor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredResources.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No resources found matching your criteria</td>
                </tr>
              ) : (
                filteredResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${getColorClass(resource.color)} flex items-center justify-center font-semibold text-sm flex-shrink-0`}>
                          {resource.title.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-800">{resource.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                        {getTypeIcon(resource.type)} {resource.type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{resource.contributor}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ViewIcon size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">{resource.views}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusDot(resource.status)}`}></span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(resource.status)}`}>{resource.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(resource.id)}><Edit size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(resource.id)}><Trash2 size={16} /></Button>
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
              <h3 className="text-xl font-semibold text-slate-800">Add New Resource</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  placeholder="Enter resource title"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                <select
                  value={newResource.type}
                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Video">Video</option>
                  <option value="Article">Article</option>
                  <option value="Tutorial">Tutorial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Contributor</label>
                <input
                  type="text"
                  value={newResource.contributor}
                  onChange={(e) => setNewResource({ ...newResource, contributor: e.target.value })}
                  placeholder="Enter contributor name"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <select
                  value={newResource.status}
                  onChange={(e) => setNewResource({ ...newResource, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Published">Published</option>
                  <option value="Pending">Pending</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" className="flex-1" onClick={handleAddResource}>Add Resource</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}