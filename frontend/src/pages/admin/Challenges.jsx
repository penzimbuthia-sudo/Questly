// src/pages/admin/Challenges.jsx
import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Users, X } from 'lucide-react';

// From Person B - UI Components
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// From Person D - Gamification Service
// import { gamificationService } from '../../services/gamificationService';

const initialChallenges = [
  { id: 1, title: 'The 5-day builder', type: 'Weekly', period: 'This week', participants: '1,840', xp: '500 XP', status: 'Active', color: 'blue' },
  { id: 2, title: 'Data Science Month', type: 'Monthly', period: 'Aug 1 - Aug 31', participants: '960', xp: '960 XP', status: 'Active', color: 'purple' },
  { id: 3, title: 'Quiz Master Sprint', type: 'Seasonal', period: 'Sep 1 - Sep 7', participants: '0', xp: '300 XP', status: 'Upcoming', color: 'yellow' },
  { id: 4, title: 'Frontend Frenzy', type: 'Seasonal', period: 'Jan 2024', participants: '2,210', xp: '450 XP', status: 'Ended', color: 'red' },
];

const getStatusColor = (status) => {
  switch(status) {
    case 'Active': return 'bg-green-100 text-green-700';
    case 'Upcoming': return 'bg-yellow-100 text-yellow-700';
    case 'Ended': return 'bg-red-100 text-red-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getStatusDot = (status) => {
  switch(status) {
    case 'Active': return 'bg-green-500';
    case 'Upcoming': return 'bg-yellow-500';
    case 'Ended': return 'bg-red-500';
    default: return 'bg-slate-500';
  }
};

const getTypeColor = (type) => {
  switch(type) {
    case 'Weekly': return 'bg-blue-50 text-blue-600';
    case 'Monthly': return 'bg-purple-50 text-purple-600';
    case 'Seasonal': return 'bg-orange-50 text-orange-600';
    default: return 'bg-slate-50 text-slate-600';
  }
};

const getColorClass = (color) => {
  switch(color) {
    case 'blue': return 'bg-blue-100 text-blue-600';
    case 'purple': return 'bg-purple-100 text-purple-600';
    case 'yellow': return 'bg-yellow-100 text-yellow-600';
    case 'red': return 'bg-red-100 text-red-600';
    default: return 'bg-blue-100 text-blue-600';
  }
};

export default function Challenges() {
  const [challenges, setChallenges] = useState(initialChallenges);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newChallenge, setNewChallenge] = useState({ title: '', type: 'Weekly', period: '', participants: '0', xp: '0 XP', status: 'Upcoming' });

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || challenge.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id) => {
    const challenge = challenges.find(c => c.id === id);
    alert(`Edit challenge: ${challenge.title}\nType: ${challenge.type}\nPeriod: ${challenge.period}\nStatus: ${challenge.status}`);
  };

  const handleDelete = (id) => {
    const challenge = challenges.find(c => c.id === id);
    if (window.confirm(`Are you sure you want to delete "${challenge.title}"?`)) {
      setChallenges(challenges.filter(c => c.id !== id));
      alert(`Challenge "${challenge.title}" deleted successfully!`);
    }
  };

  const handleAddChallenge = () => {
    if (!newChallenge.title.trim() || !newChallenge.period.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    const challenge = {
      id: challenges.length + 1,
      ...newChallenge,
      color: newChallenge.status === 'Active' ? 'blue' : newChallenge.status === 'Upcoming' ? 'yellow' : 'red'
    };
    setChallenges([...challenges, challenge]);
    setShowAddModal(false);
    setNewChallenge({ title: '', type: 'Weekly', period: '', participants: '0', xp: '0 XP', status: 'Upcoming' });
    alert(`Challenge "${challenge.title}" added successfully!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Challenges</h1>
        <p className="text-slate-500 mt-1">Weekly, monthly, and seasonal events that drive engagement.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search challenges..."
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
            <option value="Active">Active</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ended">Ended</option>
          </select>
          <Button variant="outline"><Filter size={18} /> Filter</Button>
          <Button onClick={() => setShowAddModal(true)}><Plus size={18} /> New Challenge</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallenges.length === 0 ? (
          <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-500">No challenges found matching your criteria</p>
          </div>
        ) : (
          filteredChallenges.map((challenge) => (
            <Card key={challenge.id} className="hover:shadow-md transition-shadow">
              <Card.Body>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl ${getColorClass(challenge.color)} flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                      {challenge.title.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{challenge.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeColor(challenge.type)}`}>
                          {challenge.type}
                        </span>
                        <span className="text-xs text-slate-500">{challenge.period}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusDot(challenge.status)}`}></span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(challenge.status)}`}>
                      {challenge.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Participants</p>
                      <p className="text-sm font-semibold text-slate-800">{challenge.participants}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Reward</p>
                    <p className="text-sm font-semibold text-slate-800">{challenge.xp}</p>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(challenge.id)}><Edit size={16} /></Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(challenge.id)}><Trash2 size={16} /></Button>
              </Card.Footer>
            </Card>
          ))
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-slate-800">Add New Challenge</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={newChallenge.title}
                  onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                  placeholder="Enter challenge title"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                <select
                  value={newChallenge.type}
                  onChange={(e) => setNewChallenge({ ...newChallenge, type: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Seasonal">Seasonal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Period</label>
                <input
                  type="text"
                  value={newChallenge.period}
                  onChange={(e) => setNewChallenge({ ...newChallenge, period: e.target.value })}
                  placeholder="e.g., This week, Jan 2024"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Participants</label>
                <input
                  type="text"
                  value={newChallenge.participants}
                  onChange={(e) => setNewChallenge({ ...newChallenge, participants: e.target.value })}
                  placeholder="Enter number of participants"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Reward (XP)</label>
                <input
                  type="text"
                  value={newChallenge.xp}
                  onChange={(e) => setNewChallenge({ ...newChallenge, xp: e.target.value })}
                  placeholder="e.g., 500 XP"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <select
                  value={newChallenge.status}
                  onChange={(e) => setNewChallenge({ ...newChallenge, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ended">Ended</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" className="flex-1" onClick={handleAddChallenge}>Add Challenge</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}