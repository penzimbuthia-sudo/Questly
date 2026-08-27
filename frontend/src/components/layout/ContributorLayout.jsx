import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Target,
  BarChart3,
  Wallet,
  User,
  Settings,
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import Logo from '../ui/Logo';
import { useAuth } from '../../hooks/useAuth';

const NAV_ITEMS = [
  { key: '/contributor', label: 'Dashboard', icon: LayoutDashboard },
  { key: '/contributor/my-content', label: 'My content', icon: FileText },
  { key: '/contributor/community', label: 'Community', icon: Users },
  { key: '/contributor/challenges', label: 'Challenges', icon: Target },
  { key: '/contributor/analytics', label: 'Analytics', icon: BarChart3 },
  { key: '/contributor/rewards', label: 'Rewards', icon: Wallet },
];

const ACCOUNT_ITEMS = [
  { key: '/contributor/profile', label: 'Profile', icon: User },
  { key: '/contributor/settings', label: 'Settings', icon: Settings },
];

/** Longest matching key wins, so nested contributor routes stay
 *  correctly highlighted while `/contributor` only matches itself. */
function computeActiveKey(pathname) {
  const all = [...NAV_ITEMS, ...ACCOUNT_ITEMS].sort((a, b) => b.key.length - a.key.length);
  const match = all.find((item) => pathname === item.key || pathname.startsWith(`${item.key}/`));
  return match?.key;
}

function roleLabel(role) {
  if (!role) return 'Contributor';
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * ContributorLayout
 * Mirrors LearnerLayout.jsx exactly: supplies <DashboardLayout>'s generic
 * <Sidebar>/<TopBar> with contributor-specific nav, active-route
 * highlighting, navigation, the signed-in user, and logout. Mount this as
 * the layout route for everything under /contributor.
 */
export default function ContributorLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const activeKey = computeActiveKey(location.pathname);

  const sidebarUser = {
    name: user?.name ?? "Contributor",
    roleLabel: roleLabel(user?.role),
    initials: user?.initials || getInitials(user?.name),
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <DashboardLayout
      sidebarProps={{
        logo: <Logo size="md" />,
        groups: [{ items: NAV_ITEMS }, { label: 'Account', items: ACCOUNT_ITEMS }],
        activeKey,
        onNavigate: (key) => navigate(key),
        user: sidebarUser,
        onLogout: handleLogout,
      }}
      topBarProps={{
        searchPlaceholder: 'Search your content, paths, resources…',
        notificationCount: 0,
        user: sidebarUser,
      }}
    />
  );
}