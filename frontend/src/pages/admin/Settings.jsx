import { Shield, Flag, RotateCw, Award, Power, Save, Edit, Eye, Clock, Users, FileText, MessageSquare, MapPin, Trophy, Settings as SettingsIcon } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const settings = [
  { 
    id: 1, 
    title: 'Require review before publishing', 
    description: 'Contributor resources and paths truly pending until approved.',
    icon: Shield,
    status: 'Active',
    color: 'blue'
  },
  { 
    id: 2, 
    title: 'Auto-flag reported content after 3 reports', 
    description: 'Escalates a thread or resource to the region\'s queue automatically.',
    icon: Flag,
    status: 'Active',
    color: 'green'
  },
  { 
    id: 3, 
    title: 'Weekly leaderboard reset', 
    description: 'Points reset every Monday at 00:00; all time totals are kept.',
    icon: RotateCw,
    status: 'Active',
    color: 'purple'
  },
  { 
    id: 4, 
    title: 'Seasonal event badges', 
    description: 'Show timebox time badges on profiles after the event ends.',
    icon: Award,
    status: 'Inactive',
    color: 'yellow'
  },
  { 
    id: 5, 
    title: 'Maintenance mode', 
    description: 'Takes the platform offline for learners while keeping admin access.',
    icon: Power,
    status: 'Inactive',
    color: 'red'
  },
];

const getStatusColor = (status) => {
  switch(status) {
    case 'Active': return 'bg-green-100 text-green-700';
    case 'Inactive': return 'bg-red-100 text-red-700';
    case 'Pending': return 'bg-yellow-100 text-yellow-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getStatusDot = (status) => {
  switch(status) {
    case 'Active': return 'bg-green-500';
    case 'Inactive': return 'bg-red-500';
    case 'Pending': return 'bg-yellow-500';
    default: return 'bg-slate-500';
  }
};

const getColorClass = (color) => {
  switch(color) {
    case 'blue': return 'bg-blue-100 text-blue-600';
    case 'green': return 'bg-green-100 text-green-600';
    case 'purple': return 'bg-purple-100 text-purple-600';
    case 'yellow': return 'bg-yellow-100 text-yellow-600';
    case 'red': return 'bg-red-100 text-red-600';
    default: return 'bg-blue-100 text-blue-600';
  }
};

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-1">Platform-wide defaults for moderation and gamification.</p>
      </div>

      {/* Settings Cards */}
      <div className="space-y-4">
        {settings.map((setting) => {
          const Icon = setting.icon;
          return (
            <Card key={setting.id} className="hover:shadow-md transition-shadow">
              <Card.Body>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${getColorClass(setting.color)} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800">{setting.title}</h3>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${getStatusDot(setting.status)}`}></span>
                          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(setting.status)}`}>
                            {setting.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{setting.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <div className="flex items-center gap-2">
                      {/* Toggle Switch */}
                      <div className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 cursor-pointer ${setting.status === 'Active' ? 'bg-green-600' : 'bg-slate-300'}`}>
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${setting.status === 'Active' ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {setting.status === 'Active' ? 'On' : 'Off'}
                      </span>
                    </div>
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </Button>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Settings</p>
          <p className="text-2xl font-bold text-slate-800">12</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Active</p>
          <p className="text-2xl font-bold text-green-600">8</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Inactive</p>
          <p className="text-2xl font-bold text-red-600">4</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Last Updated</p>
          <p className="text-lg font-bold text-blue-600">Today, 10:30 AM</p>
        </div>
      </div>
    </div>
  );
}
