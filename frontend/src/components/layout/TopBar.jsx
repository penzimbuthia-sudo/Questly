import { useState } from 'react';
import { Menu, Bell, Search, ChevronDown, X, CheckCircle, AlertCircle, MessageSquare, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ sidebarOpen, setSidebarOpen, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'New content pending review', message: '3 resources need your approval', time: '2 min ago', type: 'review', read: false },
    { id: 2, title: 'Report flagged', message: 'New report from User123 on React guide', time: '15 min ago', type: 'report', read: false },
    { id: 3, title: 'Challenge ended', message: 'The 5-day builder has concluded', time: '1 hour ago', type: 'challenge', read: false },
    { id: 4, title: 'User activity spike', message: '50 new users joined today', time: '3 hours ago', type: 'activity', read: true },
  ];

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (notificationCount > 0) {
      setNotificationCount(0);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      alert(`Searching for: "${searchTerm}"`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      if (onLogout) {
        onLogout();
      }
      navigate('/login');
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'review': return <CheckCircle size={16} className="text-blue-500" />;
      case 'report': return <AlertCircle size={16} className="text-red-500" />;
      case 'challenge': return <MessageSquare size={16} className="text-purple-500" />;
      default: return <User size={16} className="text-green-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 relative">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="lg:hidden text-slate-500 hover:text-slate-700 transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all w-80">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-sm text-slate-700 w-full"
          />
          {searchTerm && (
            <button 
              type="button" 
              onClick={() => setSearchTerm('')}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </form>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button 
            className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={handleNotificationClick}
          >
            <Bell size={20} className="text-slate-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <p className="font-semibold text-slate-800">Notifications</p>
                {unreadCount > 0 && (
                  <button 
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => {
                      setNotificationCount(0);
                      alert('All notifications marked as read');
                    }}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-100 last:border-0 ${!notif.read ? 'bg-blue-50/30' : ''}`}
                    onClick={() => {
                      setShowNotifications(false);
                      alert(`Notification: ${notif.title}\n${notif.message}`);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${!notif.read ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-200">
                <button 
                  className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-1"
                  onClick={() => {
                    setShowNotifications(false);
                    alert('Viewing all notifications');
                  }}
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center gap-2 pl-3 border-l border-slate-200 cursor-pointer hover:bg-slate-50 rounded-lg px-2 py-1 transition-colors"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              P
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-800">Admin User</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200">
                <p className="font-semibold text-slate-800">Admin User</p>
                <p className="text-xs text-slate-500">admin@questly.com</p>
              </div>
              <div className="py-1">
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/dashboard');
                  }}
                >
                  <LayoutDashboard size={16} className="text-slate-400" />
                  Dashboard
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={() => {
                    setShowProfileMenu(false);
                    alert('Viewing profile settings');
                  }}
                >
                  <User size={16} className="text-slate-400" />
                  Profile
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/settings');
                  }}
                >
                  <Settings size={16} className="text-slate-400" />
                  Settings
                </button>
                <div className="border-t border-slate-200 my-1"></div>
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
