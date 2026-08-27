import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Award, Users, Star, Zap, Target, Flame, Crown, CheckCircle, FileText, MapPin, ThumbsUp, Heart, X } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const initialBadges = [
  { 
    id: 1, 
    title: 'Spark ignited', 
    description: 'First module completed',
    unlocked: '5,830',
    icon: Zap,
    color: 'yellow'
  },
  { 
    id: 2, 
    title: 'Trailblazer', 
    description: 'Finish first learning path',
    unlocked: '3,240',
    icon: MapPin,
    color: 'blue'
  },
  { 
    id: 3, 
    title: 'Quiz champion', 
    description: 'Score 90% on 10 quizzes',
    unlocked: '1,022',
    icon: Target,
    color: 'purple'
  },
  { 
    id: 4, 
    title: 'Streak keeper', 
    description: 'Maintain a 7-day learning streak',
    unlocked: '2,480',
    icon: Flame,
    color: 'orange'
  },
  { 
    id: 5, 
    title: 'Elite ranked', 
    description: 'Reach the top 10% on the leaderboard',
    unlocked: '612',
    icon: Crown,
    color: 'yellow'
  },
  { 
    id: 6, 
    title: 'Perfect score', 
    description: 'Get 100% on any quiz',
    unlocked: '1,740',
    icon: CheckCircle,
    color: 'green'
  },
  { 
    id: 7, 
    title: 'Prolific creator', 
    description: 'Publish 20 resources',
    unlocked: '384',
    icon: FileText,
    color: 'blue'
  },
  { 
    id: 8, 
    title: 'Path pioneer', 
    description: 'Publish 5 learning paths',
    unlocked: '196',
    icon: MapPin,
    color: 'purple'
  },
  { 
    id: 9, 
    title: 'Quality curator', 
    description: '90%+ approval rate',
    unlocked: '758',
    icon: ThumbsUp,
    color: 'green'
  },
  { 
    id: 10, 
    title: 'Community favourite', 
    description: 'Reach 300+ upvotes',
    unlocked: '421',
    icon: Heart,
    color: 'red'
  },
];

const getColorClass = (color) => {
  switch(color) {
    case 'yellow': return 'bg-yellow-100 text-yellow-600';
    case 'blue': return 'bg-blue-100 text-blue-600';
    case 'purple': return 'bg-purple-100 text-purple-600';
    case 'orange': return 'bg-orange-100 text-orange-600';
    case 'green': return 'bg-green-100 text-green-600';
    case 'red': return 'bg-red-100 text-red-600';
    default: return 'bg-blue-100 text-blue-600';
  }
};

const getBorderColor = (color) => {
  switch(color) {
    case 'yellow': return 'border-yellow-200';
    case 'blue': return 'border-blue-200';
    case 'purple': return 'border-purple-200';
    case 'orange': return 'border-orange-200';
    case 'green': return 'border-green-200';
    case 'red': return 'border-red-200';
    default: return 'border-blue-200';
  }
};

export default function Badges() {
  const [badges, setBadges] = useState(initialBadges);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBadge, setNewBadge] = useState({ 
    title: '', 
    description: '', 
    unlocked: '0', 
    color: 'blue' 
  });

  const filteredBadges = badges.filter(badge => {
    const matchesSearch = badge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleView = (id) => {
    const badge = badges.find(b => b.id === id);
    alert(`Viewing: ${badge.title}\nDescription: ${badge.description}\nUnlocked: ${badge.unlocked}`);
  };

  const handleEdit = (id) => {
    const badge = badges.find(b => b.id === id);
    alert(`Edit badge: ${badge.title}\nDescription: ${badge.description}\nUnlocked: ${badge.unlocked}`);
  };

  const handleDelete = (id) => {
    const badge = badges.find(b => b.id === id);
    if (window.confirm(`Are you sure you want to delete "${badge.title}"?`)) {
      setBadges(badges.filter(b => b.id !== id));
      alert(`Badge "${badge.title}" deleted successfully!`);
    }
  };

  const handleAddBadge = () => {
    if (!newBadge.title.trim() || !newBadge.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    const badge = {
      id: badges.length + 1,
      ...newBadge,
      icon: Star,
      unlocked: newBadge.unlocked || '0'
    };
    
    setBadges([...badges, badge]);
    setShowAddModal(false);
    setNewBadge({ title: '', description: '', unlocked: '0', color: 'blue' });
    alert(`Badge "${badge.title}" added successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Badges</h1>
        <p className="text-slate-500 mt-1">Achievements unlocked by learners and contributors.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search badges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </form>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
            <Plus size={18} />
            New Badge
          </Button>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.length === 0 ? (
          <div className="col-span-3 bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-500">No badges found matching your criteria</p>
          </div>
        ) : (
          filteredBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <Card key={badge.id} className={`hover:shadow-md transition-shadow border-l-4 ${getBorderColor(badge.color)}`}>
                <Card.Body>
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl ${getColorClass(badge.color)} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{badge.title}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">{badge.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users size={14} className="text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">{badge.unlocked} unlocked</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer className="flex justify-end gap-2">
                  <button 
                    onClick={() => handleView(badge.id)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleEdit(badge.id)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(badge.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </Card.Footer>
              </Card>
            );
          })
        )}
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Badges</p>
          <p className="text-2xl font-bold text-slate-800">{badges.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Most Unlocked</p>
          <p className="text-2xl font-bold text-blue-600">
            {badges.length > 0 ? Math.max(...badges.map(b => parseInt(b.unlocked.replace(/,/g, '')))) : 0}
          </p>
          <p className="text-xs text-slate-500">
            {badges.length > 0 ? badges.find(b => parseInt(b.unlocked.replace(/,/g, '')) === Math.max(...badges.map(b => parseInt(b.unlocked.replace(/,/g, ''))))).title : '—'}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Least Unlocked</p>
          <p className="text-2xl font-bold text-purple-600">
            {badges.length > 0 ? Math.min(...badges.map(b => parseInt(b.unlocked.replace(/,/g, '')))) : 0}
          </p>
          <p className="text-xs text-slate-500">
            {badges.length > 0 ? badges.find(b => parseInt(b.unlocked.replace(/,/g, '')) === Math.min(...badges.map(b => parseInt(b.unlocked.replace(/,/g, ''))))).title : '—'}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Unlocked</p>
          <p className="text-2xl font-bold text-green-600">
            {badges.reduce((sum, b) => sum + parseInt(b.unlocked.replace(/,/g, '') || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Add Badge Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-slate-800">Add New Badge</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={newBadge.title}
                  onChange={(e) => setNewBadge({ ...newBadge, title: e.target.value })}
                  placeholder="Enter badge title"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <input
                  type="text"
                  value={newBadge.description}
                  onChange={(e) => setNewBadge({ ...newBadge, description: e.target.value })}
                  placeholder="Enter badge description"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Unlocked Count</label>
                <input
                  type="text"
                  value={newBadge.unlocked}
                  onChange={(e) => setNewBadge({ ...newBadge, unlocked: e.target.value })}
                  placeholder="e.g., 1,000"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Color</label>
                <select
                  value={newBadge.color}
                  onChange={(e) => setNewBadge({ ...newBadge, color: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="blue">Blue</option>
                  <option value="yellow">Yellow</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" className="flex-1" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" className="flex-1" onClick={handleAddBadge}>
                  Add Badge
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
