import { Search, Filter, Plus, Edit, Trash2, Eye, Video, FileText, BookOpen, Eye as ViewIcon } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const resources = [
  { 
    id: 1, 
    title: 'Understanding React useEffect Hook', 
    type: 'Video', 
    contributor: 'Aisha K.', 
    views: '12.4k', 
    status: 'Published',
    color: 'blue'
  },
  { 
    id: 2, 
    title: 'JavaScript Array Methods Explained', 
    type: 'Article', 
    contributor: 'Brian O.', 
    views: '8.7k', 
    status: 'Published',
    color: 'green'
  },
  { 
    id: 3, 
    title: 'React Performance Optimization', 
    type: 'Video', 
    contributor: 'Aisha K.', 
    views: '—', 
    status: 'Pending',
    color: 'yellow'
  },
  { 
    id: 4, 
    title: 'Advanced TypeScript Concepts', 
    type: 'Article', 
    contributor: 'Brian O.', 
    views: '—', 
    status: 'Pending',
    color: 'yellow'
  },
  { 
    id: 5, 
    title: 'Intro to Node Streams', 
    type: 'Tutorial', 
    contributor: 'Chinedu M.', 
    views: '3.1k', 
    status: 'Published',
    color: 'purple'
  },
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
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Resources</h1>
        <p className="text-slate-500 mt-1">Videos, articles, and tutorials shared by contributors.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
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
            New Resource
          </Button>
        </div>
      </div>

      {/* Table */}
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
              {resources.map((resource) => (
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
                      {getTypeIcon(resource.type)}
                      {resource.type}
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
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(resource.status)}`}>
                        {resource.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
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
          <p className="text-sm text-slate-500">Total Resources</p>
          <p className="text-2xl font-bold text-slate-800">342</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Published</p>
          <p className="text-2xl font-bold text-green-600">287</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600">42</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Views</p>
          <p className="text-2xl font-bold text-blue-600">24.2k</p>
        </div>
      </div>
    </div>
  );
}
