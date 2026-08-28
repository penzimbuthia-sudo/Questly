import { useState } from 'react';
import { Menu, Bell, Search, ChevronDown, X, CheckCircle, AlertCircle, MessageSquare, User, Settings, LogOut, LayoutDashboard, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'New content pending review', message: '3 resources need your approval', time: '2 min ago', type: 'review', read: false },
  { id: 2, title: 'Report flagged', message: 'New report from User123 on React guide', time: '15 min ago', type: 'report', read: false },
  { id: 3, title: 'Challenge ended', message: 'The 5-day builder has concluded', time: '1 hour ago', type: 'challenge', read: false },
  { id: 4, title: 'User activity spike', message: '50 new users joined today', time: '3 hours ago', type: 'activity', read: true },
];

const NOTIF_ICON = {
  review: <CheckCircle size={16} className="text-royal" />,
  report: <AlertCircle size={16} className="text-danger" />,
  challenge: <MessageSquare size={16} className="text-butter" />,
};

export default function TopBar({
  sidebarOpen,
  setSidebarOpen,
  searchPlaceholder = 'Search...',
  user,
  action,
  onLogout,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: wire this up to real search once there's an endpoint for it
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout?.();
    }
  };

  return (
    <header className="h-16 bg-card border-b border-line/10 flex items-center justify-between px-4 lg:px-6 relative">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {setSidebarOpen && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-fg/60 hover:text-fg transition-colors"
          >
            <Menu size={24} />
          </button>
        )}

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 bg-page rounded-lg px-3 py-2 border border-line/15 focus-within:border-royal transition-colors w-80"
        >
          <Search size={16} className="text-fg/40" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-sm text-fg placeholder:text-fg/30 w-full"
          />
          {searchTerm && (
            <button type="button" onClick={() => setSearchTerm('')} className="text-fg/30 hover:text-fg/60">
              <X size={14} />
            </button>
          )}
        </form>
      </div>

      <div className="flex items-center gap-3">
        {action && (
          <button
            onClick={action.onClick}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-lg bg-royal text-ivory hover:opacity-90 transition-opacity"
          >
            <Plus size={15} /> {action.label}
          </button>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative p-2 rounded-lg hover:bg-page transition-colors"
            onClick={() => setShowNotifications((v) => !v)}
          >
            <Bell size={18} className="text-fg/60" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-danger text-ivory text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-card rounded-xl border border-line/10 shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-line/10 flex items-center justify-between">
                <p className="font-semibold text-fg">Notifications</p>
                {unreadCount > 0 && (
                  <button className="text-xs text-royal font-medium" onClick={markAllRead}>
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 hover:bg-page cursor-pointer transition-colors border-b border-line/5 last:border-0 ${
                      !notif.read ? 'bg-royal/5' : ''
                    }`}
                    onClick={() => setShowNotifications(false)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{NOTIF_ICON[notif.type] || <User size={16} className="text-fg/40" />}</div>
                      <div className="flex-1">
                        <p className={`text-sm ${!notif.read ? 'font-semibold text-fg' : 'text-fg/70'}`}>{notif.title}</p>
                        <p className="text-xs text-fg/40 mt-0.5">{notif.message}</p>
                        <p className="text-[10px] text-fg/30 mt-1">{notif.time}</p>
                      </div>
                      {!notif.read && <span className="w-2 h-2 bg-royal rounded-full mt-1.5 shrink-0" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <div
            className="flex items-center gap-2 pl-3 border-l border-line/10 cursor-pointer hover:bg-page rounded-lg px-2 py-1 transition-colors"
            onClick={() => setShowProfileMenu((v) => !v)}
          >
            <div className="w-8 h-8 rounded-full bg-royal flex items-center justify-center text-ivory font-semibold text-sm">
              {user?.initials || 'U'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-fg">{user?.name || 'User'}</p>
              <p className="text-xs text-fg/40">{user?.roleLabel || ''}</p>
            </div>
            <ChevronDown size={16} className={`text-fg/40 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-56 bg-card rounded-xl border border-line/10 shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-line/10">
                <p className="font-semibold text-fg">{user?.name || 'User'}</p>
                <p className="text-xs text-fg/40">{user?.roleLabel || ''}</p>
              </div>
              <div className="py-1">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-fg/80 hover:bg-page transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <User size={16} className="text-fg/40" />
                  Profile
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-fg/80 hover:bg-page transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Settings size={16} className="text-fg/40" />
                  Settings
                </button>
                <div className="border-t border-line/10 my-1" />
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-page transition-colors"
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