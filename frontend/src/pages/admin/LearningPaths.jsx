import { Search, Filter, Plus, Edit, Trash2, Eye, Clock, Users, BookOpen } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const learningPaths = [
  { 
    id: 1, 
    title: 'React Developer Path', 
    modules: 16, 
    contributor: 'Aisha K.', 
    enrolled: '2,480', 
    status: 'Published',
    color: 'blue'
  },
  { 
    id: 2, 
    title: 'JavaScript Fundamentals', 
    modules: 9, 
    contributor: 'Brian O.', 
    enrolled: '3,120', 
    status: 'Published',
    color: 'green'
  },
  { 
    id: 3, 
    title: 'Node.js Backend Path', 
    modules: 18, 
    contributor: 'Chinedu M.', 
    enrolled: '1,760', 
    status: 'Published',
    color: 'purple'
  },
  { 
    id: 4, 
    title: 'Full Stack MERN Roadmap', 
    modules: 24, 
    contributor: 'Chinedu M.', 
    enrolled: '—', 
    status: 'Pending',
    color: 'yellow'
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
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Learning paths</h1>
        <p className="text-slate-500 mt-1">Structured module sequences built from shared resources.</p>
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
            New Path
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
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Modules</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contributor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Enrolled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {learningPaths.map((path) => (
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
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(path.status)}`}>
                        {path.status}
                      </span>
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
          <p className="text-sm text-slate-500">Total Paths</p>
          <p className="text-2xl font-bold text-slate-800">24</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Published</p>
          <p className="text-2xl font-bold text-green-600">18</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600">4</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Enrolled</p>
          <p className="text-2xl font-bold text-blue-600">7,360</p>
        </div>
      </div>
    </div>
  );
}
