import { Users, BookOpen, MapPin, Clock, CheckCircle, XCircle, TrendingUp, Globe, Award, Trophy, MessageSquare, Flag } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const stats = [
  { title: 'Total users', value: '8,428', change: '+12.4%', icon: Users, color: 'blue' },
  { title: 'Active users', value: '2,341', change: '+18.6%', icon: Users, color: 'green' },
  { title: 'Resources', value: '1,256', change: '+18.2%', icon: BookOpen, color: 'purple' },
  { title: 'Learning paths', value: '342', change: '+14.1%', icon: MapPin, color: 'orange' },
];

const pendingReviews = [
  { id: 1, title: 'React performance optimization', type: 'Resource', author: 'Asuka K.', initials: 'AK', detail: 'Video' },
  { id: 2, title: 'Advanced Typescript concepts', type: 'Resource', author: 'Brian O.', initials: 'BO', detail: 'Article' },
  { id: 3, title: 'Full stack MERN roadmap', type: 'Learning path', author: 'Chinedu M.', initials: 'CM', detail: '' },
  { id: 4, title: 'Data Science Month quiz pack', type: 'Quiz', author: 'Hamid A.', initials: 'DA', detail: '12 questions' },
];

const roleData = [
  { name: 'Learners', value: 72.9, color: '#3b82f6' },
  { name: 'Contributors', value: 21.9, color: '#8b5cf6' },
  { name: 'Admins', value: 5.2, color: '#f59e0b' },
];

const activityData = [
  { day: '1 May', users: 400, activeUsers: 300 },
  { day: '8 May', users: 600, activeUsers: 450 },
  { day: '15 May', users: 800, activeUsers: 600 },
  { day: '22 May', users: 2100, activeUsers: 1750 },
  { day: '29 May', users: 650, activeUsers: 500 },
];

const topContributors = [
  { name: 'Aisha K.', country: 'AIA', xp: '1,240 XP' },
  { name: 'Brian O.', country: 'AIA', xp: '1,050 XP' },
  { name: 'Chinedu M.', country: 'AIA', xp: '980 XP' },
  { name: 'Damilola A.', country: 'AIA', xp: '870 XP' },
  { name: 'Penzi M.', country: 'AIA', xp: '720 XP' },
];

const recentReports = [
  { id: 1, title: 'Inappropriate content in resource', item: 'React Performance Optimization', reportedBy: 'User123', time: '2h ago' },
  { id: 2, title: 'Spam in discussion', item: 'JavaScript - Fundamentals thread', reportedBy: 'User456', time: '5h ago' },
  { id: 3, title: 'Plagiarism in learning path', item: 'Full Stack MERN Roadmap', reportedBy: 'User789', time: '1d ago' },
];

const systemHealth = [
  { name: 'Server status', status: 'Operational', color: 'text-green-600' },
  { name: 'Database', status: 'Operational', color: 'text-green-600' },
  { name: 'Storage', status: '85% used', color: 'text-yellow-600' },
  { name: 'Backup', status: 'Operational', color: 'text-green-600' },
];

export default function Dashboard() {
  const [reviewStatus, setReviewStatus] = useState({});
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAllReports, setShowAllReports] = useState(false);

  const handleApprove = (id) => {
    if (window.confirm('Approve this content for publishing?')) {
      setReviewStatus(prev => ({ ...prev, [id]: 'approved' }));
      alert('Content approved successfully!');
    }
  };

  const handleReject = (id) => {
    if (window.confirm('Reject this content?')) {
      setReviewStatus(prev => ({ ...prev, [id]: 'rejected' }));
      alert('Content rejected.');
    }
  };

  const handleViewAllReviews = () => {
    setShowAllReviews(!showAllReviews);
    alert('Viewing all pending content...');
  };

  const handleViewAllReports = () => {
    setShowAllReports(!showAllReports);
    alert('Viewing all reports...');
  };

  const handleStatClick = (title) => {
    alert(`Viewing ${title} details`);
  };

  const handleContributorClick = (name) => {
    alert(`Viewing ${name}'s profile`);
  };

  const handleReportClick = (title) => {
    alert(`Viewing report: ${title}`);
  };

  const handleSystemHealthClick = (name, status) => {
    alert(`System health: ${name} - ${status}`);
  };

  const displayedReviews = showAllReviews ? pendingReviews : pendingReviews.slice(0, 3);
  const displayedReports = showAllReports ? recentReports : recentReports.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Good afternoon, Penzi 🏅</h1>
        <p className="text-slate-500">Here's what's happening across Questly today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.title} 
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" 
            onClick={() => handleStatClick(stat.title)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 text-sm font-medium mt-1 text-green-600">
                  <TrendingUp size={16} />
                  {stat.change} vs last month
                </div>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} className={`text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Pending Review & User Role Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Content pending review</h3>
            <button 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              onClick={handleViewAllReviews}
            >
              {showAllReviews ? 'Show less' : 'View all'}
            </button>
          </div>
          <div className="p-6 space-y-4">
            {displayedReviews.map((item) => (
              <div key={item.id} className="flex items-start justify-between py-3 border-b border-slate-100 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm flex-shrink-0 mt-1">
                    {item.initials}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{item.title}</p>
                    <p className="text-sm text-slate-500">
                      {item.type}{item.detail ? `: ${item.detail}` : ''} - Submitted by {item.author}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {reviewStatus[item.id] === 'approved' ? (
                    <span className="text-xs font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">Approved</span>
                  ) : reviewStatus[item.id] === 'rejected' ? (
                    <span className="text-xs font-medium px-3 py-1 bg-red-100 text-red-700 rounded-full">Rejected</span>
                  ) : (
                    <>
                      <button 
                        className="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
                        onClick={() => handleApprove(item.id)}
                      >
                        <CheckCircle size={14} /> Approve
                      </button>
                      <button 
                        className="px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
                        onClick={() => handleReject(item.id)}
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800">User role distribution</h3>
            <p className="text-2xl font-bold text-slate-800 mt-1">8,428</p>
            <p className="text-sm text-slate-500">Total users</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {roleData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{item.name}</span>
                  <span className="text-sm font-semibold text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden flex">
              {roleData.map((item, index) => (
                <div 
                  key={index}
                  className="h-full"
                  style={{ 
                    width: `${item.value}%`, 
                    backgroundColor: item.color
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Activity */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Platform activity</h3>
        </div>
        <div className="p-6">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="New users" />
                <Area type="monotone" dataKey="activeUsers" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="Active users" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Contributors & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800">Top contributors</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {topContributors.map((contributor, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 cursor-pointer hover:bg-slate-50 rounded-lg px-2 transition-colors" 
                  onClick={() => handleContributorClick(contributor.name)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-400 w-6">{index + 1}</span>
                    <span className="font-medium text-slate-800">{contributor.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">{contributor.xp}</span>
                    <div className="flex items-center gap-1">
                      <Globe size={14} className="text-slate-400" />
                      <span className="text-sm text-slate-500">{contributor.country}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Recent reports</h3>
            <button 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              onClick={handleViewAllReports}
            >
              {showAllReports ? 'Show less' : 'View all'}
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {displayedReports.map((report) => (
                <div 
                  key={report.id} 
                  className="py-3 border-b border-slate-100 last:border-0 cursor-pointer hover:bg-slate-50 rounded-lg px-2 transition-colors" 
                  onClick={() => handleReportClick(report.title)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 text-sm">{report.title}</p>
                      <p className="text-sm text-slate-500">{report.item} - Reported by {report.reportedBy} - {report.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">System health</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {systemHealth.map((item) => (
              <div 
                key={item.name} 
                className="text-center p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors" 
                onClick={() => handleSystemHealthClick(item.name, item.status)}
              >
                <p className="text-sm text-slate-500">{item.name}</p>
                <p className={`font-semibold mt-1 ${item.color}`}>
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
