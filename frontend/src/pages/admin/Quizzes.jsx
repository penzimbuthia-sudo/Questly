// src/pages/admin/Quizzes.jsx
import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Clock, BookOpen, X } from 'lucide-react';

// From Person B - UI Components
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// From Person D - Status Enums
// import { STATUS } from '../../constants/statusEnums';

const initialQuizzes = [
  { id: 1, title: 'React Hooks Checkpoint', learningPath: 'React Developer Path', length: '10 questions', avgScore: '84%', status: 'Published', color: 'blue' },
  { id: 2, title: 'ES6 Fundamentals Quiz', learningPath: 'JavaScript Fundamentals', length: '12 questions', avgScore: '77%', status: 'Published', color: 'green' },
  { id: 3, title: 'Express Routing Quiz', learningPath: 'Node.js Backend Path', length: '8 questions', avgScore: '91%', status: 'Published', color: 'purple' },
  { id: 4, title: 'Data Science Month Quiz Pack', learningPath: 'Data Science Month', length: '12 questions', avgScore: '—', status: 'Pending', color: 'yellow' },
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

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuiz, setNewQuiz] = useState({ title: '', learningPath: '', length: '', avgScore: '', status: 'Pending' });

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         quiz.learningPath.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || quiz.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id) => {
    const quiz = quizzes.find(q => q.id === id);
    alert(`Edit quiz: ${quiz.title}\nLearning Path: ${quiz.learningPath}\nLength: ${quiz.length}\nStatus: ${quiz.status}`);
  };

  const handleDelete = (id) => {
    const quiz = quizzes.find(q => q.id === id);
    if (window.confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
      setQuizzes(quizzes.filter(q => q.id !== id));
      alert(`Quiz "${quiz.title}" deleted successfully!`);
    }
  };

  const handleAddQuiz = () => {
    if (!newQuiz.title.trim() || !newQuiz.learningPath.trim() || !newQuiz.length) {
      alert('Please fill in all required fields');
      return;
    }
    const quiz = {
      id: quizzes.length + 1,
      ...newQuiz,
      avgScore: newQuiz.avgScore || '—',
      color: newQuiz.status === 'Published' ? 'blue' : 'yellow'
    };
    setQuizzes([...quizzes, quiz]);
    setShowAddModal(false);
    setNewQuiz({ title: '', learningPath: '', length: '', avgScore: '', status: 'Pending' });
    alert(`Quiz "${quiz.title}" added successfully!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Quizzes</h1>
        <p className="text-slate-500 mt-1">End-of-module checks tied to each learning path.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search quizzes..."
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
          <Button onClick={() => setShowAddModal(true)}><Plus size={18} /> New Quiz</Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Learning Path</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Length</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredQuizzes.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-500">No quizzes found</td></tr>
              ) : (
                filteredQuizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${getColorClass(quiz.color)} flex items-center justify-center font-semibold text-sm`}>
                          {quiz.title.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-800">{quiz.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">{quiz.learningPath}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">{quiz.length}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{quiz.avgScore}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusDot(quiz.status)}`}></span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(quiz.status)}`}>{quiz.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(quiz.id)}><Edit size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(quiz.id)}><Trash2 size={16} /></Button>
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
              <h3 className="text-xl font-semibold text-slate-800">Add New Quiz</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                  placeholder="Enter quiz title"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Learning Path</label>
                <input
                  type="text"
                  value={newQuiz.learningPath}
                  onChange={(e) => setNewQuiz({ ...newQuiz, learningPath: e.target.value })}
                  placeholder="Enter learning path"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Length</label>
                <input
                  type="text"
                  value={newQuiz.length}
                  onChange={(e) => setNewQuiz({ ...newQuiz, length: e.target.value })}
                  placeholder="e.g., 10 questions"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <select
                  value={newQuiz.status}
                  onChange={(e) => setNewQuiz({ ...newQuiz, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Published">Published</option>
                  <option value="Pending">Pending</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" className="flex-1" onClick={handleAddQuiz}>Add Quiz</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}