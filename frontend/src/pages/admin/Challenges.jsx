import { Search, Filter, Plus, Edit, Trash2, Eye, Calendar, Users, Trophy, Award, Clock, TrendingUp } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const challenges = [
  { 
    id: 1, 
    title: 'The 5-day builder', 
    type: 'Weekly',
    period: 'This week',
    participants: '1,840',
    xp: '500 XP',
    status: 'Active',
    color: 'blue'
  },
  { 
    id: 2, 
    title: 'Data Science Month', 
    type: 'Monthly',
    period: 'Aug 1 - Aug 31',
    participants: '960',
    xp: '960 XP',
    status: 'Active',
    color: 'purple'
  },
  { 
    id: 3, 
    title: 'Quiz Master Sprint', 
    type: 'Seasonal',
    period: 'Sep 1 - Sep 7',
    participants: '0',
    xp: '300 XP',
    status: 'Upcoming',
    color: 'yellow'
  },
  { 
    id: 4, 
    title: 'Frontend Frenzy', 
    type: 'Seasonal',
    period: 'Jan 2024',
    participants: '2,210',
    xp: '450 XP',
    status: 'Ended',
    color: 'red'
  },
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
    case 'green': return 'bg-green-100 text-green-600';
    default: return 'bg-blue-100 text-blue-600';
  }
};

export default function Challenges() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Challenges</h1>
        <p className="text-slate-500 mt-1">Weekly, monthly, and seasonal events that drive engagement.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search challenges..."
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
            New Challenge
          </Button>
        </div>
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((challenge) => (
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
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Reward</p>
                    <p className="text-sm font-semibold text-slate-800">{challenge.xp}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="flex justify-end gap-2">
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                <Eye size={16} />
              </button>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                <Edit size={16} />
              </button>
              <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </Card.Footer>
          </Card>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Challenges</p>
          <p className="text-2xl font-bold text-slate-800">12</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Active</p>
          <p className="text-2xl font-bold text-green-600">4</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Upcoming</p>
          <p className="text-2xl font-bold text-yellow-600">3</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Participants</p>
          <p className="text-2xl font-bold text-blue-600">5,010</p>
        </div>
      </div>
    </div>
  );
}
