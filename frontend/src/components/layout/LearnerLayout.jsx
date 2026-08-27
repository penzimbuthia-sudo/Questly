import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Search,
  BookOpen,
  Target,
  Users,
  Trophy,
  Award,
  User,
  Settings,
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import Logo from '../ui/Logo';
import { useAuth } from '../../hooks/useAuth';

const NAV_ITEMS = [
  { key: '/learner', label: 'Home', icon: Home },
  { key: '/learner/explore', label: 'Explore', icon: Search },
  { key: '/learner/paths', label: 'Learning paths', icon: BookOpen },
  { key: '/learner/challenges', label: 'Challenges', icon: Target },
  { key: '/learner/community', label: 'Community', icon: Users },
  { key: '/learner/leaderboard', label: 'Leaderboard', icon: Trophy },
  { key: '/learner/achievements', label: 'Achievements', icon: Award },
];

const ACCOUNT_ITEMS = [
  { key: '/learner/profile', label: 'Profile', icon: User },
  { key: '/learner/settings', label: 'Settings', icon: Settings },
];

/** Longest matching key wins, so `/learner/paths` stays active on
 *  `/learner/paths/:pathId`, while `/learner` only matches itself
 *  (otherwise every learner route would also match `/learner`). */
function computeActiveKey(pathname) {
  const all = [...NAV_ITEMS, ...ACCOUNT_ITEMS].sort((a, b) => b.key.length - a.key.length);
  const match = all.find((item) => pathname === item.key || pathname.startsWith(`${item.key}/`));
  return match?.key;
}

function roleLabel(role) {
  if (!role) return 'Learner';
  return role.charAt(0).toUpperCase() + role.slice(1);
}

/**
 * LearnerLayout
 * Supplies the generic <Sidebar>/<TopBar> (via <DashboardLayout>) with
 * everything the learner section needs: nav groups, which item is active
 * based on the current route, click-to-navigate, the signed-in user, and
 * logout. Mount this as the layout route for everything under /learner
 * instead of <DashboardLayout /> directly.
 */
function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function LearnerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const activeKey = computeActiveKey(location.pathname);

  const sidebarUser = {
    name: user?.name ?? "Learner",
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
        searchPlaceholder: 'Search paths, resources, topics…',
        notificationCount: 3,
        user: sidebarUser,
      }}
    />
  );
}
