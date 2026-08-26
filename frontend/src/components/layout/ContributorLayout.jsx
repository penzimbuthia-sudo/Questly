import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Target,
  BarChart2,
  Gift,
  User,
  Settings,
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import Logo from '../ui/Logo';
import { useAuth } from '../../hooks/useAuth';

const NAV_ITEMS = [
  { key: '/contributor', label: 'Dashboard', icon: LayoutDashboard },
  { key: '/contributor/content', label: 'My content', icon: FileText },
  { key: '/contributor/community', label: 'Community', icon: Users },
  { key: '/contributor/challenges', label: 'Challenges', icon: Target },
  { key: '/contributor/analytics', label: 'Analytics', icon: BarChart2 },
  { key: '/contributor/rewards', label: 'Rewards', icon: Gift },
];

const ACCOUNT_ITEMS = [
  { key: '/contributor/profile', label: 'Profile', icon: User },
  { key: '/contributor/settings', label: 'Settings', icon: Settings },
];

/** Longest matching key wins, so nested routes stay highlighted on their
 *  parent nav item without `/contributor` matching every sub-route. */
function computeActiveKey(pathname) {
  const all = [...NAV_ITEMS, ...ACCOUNT_ITEMS].sort((a, b) => b.key.length - a.key.length);
  const match = all.find((item) => pathname === item.key || pathname.startsWith(`${item.key}/`));
  return match?.key;
}

function roleLabel(role) {
  if (!role) return 'Contributor';
  return role.charAt(0).toUpperCase() + role.slice(1);
}

/**
 * ContributorLayout
 * Same pattern as LearnerLayout: supplies the generic <Sidebar>/<TopBar>
 * (via <DashboardLayout theme="contributor">) with nav groups, active-route
 * tracking, navigation, the signed-in user, and logout for everything
 * under /contributor.
 */
export default function ContributorLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const activeKey = computeActiveKey(location.pathname);

  const sidebarUser = {
    name: user?.name ?? 'Contributor',
    roleLabel: roleLabel(user?.role),
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <DashboardLayout
      theme="contributor"
      sidebarProps={{
        logo: <Logo size="md" />,
        groups: [{ items: NAV_ITEMS }, { label: 'Account', items: ACCOUNT_ITEMS }],
        activeKey,
        onNavigate: (key) => navigate(key),
        user: sidebarUser,
        onLogout: handleLogout,
      }}
      topBarProps={{
        searchPlaceholder: 'Search your content…',
        notificationCount: 0,
        user: sidebarUser,
      }}
    />
  );
}
