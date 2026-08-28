import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  ClipboardList,
  MessageSquare,
  Flag,
  Trophy,
  Award,
  ScrollText,
  Settings,
} from "lucide-react";

import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../../hooks/useAuth";

const NAV_ITEMS = [
  { key: "/admin", label: "Dashboard", icon: LayoutDashboard, },
  { key: "/admin/users", label: "Users", icon: Users, },
  { key: "/admin/resources", label: "Resources", icon: FileText, },
  { key: "/admin/learning-paths", label: "Learning paths", icon: BookOpen, },
  { key: "/admin/quizzes", label: "Quizzes", icon: ClipboardList, },
  { key: "/admin/discussions", label: "Discussions", icon: MessageSquare, },
  { key: "/admin/reports", label: "Reports", icon: Flag, },
  { key: "/admin/challenges", label: "Challenges", icon: Trophy, },
  { key: "/admin/badges", label: "Badges", icon: Award, },
  { key: "/admin/system-logs", label: "System logs", icon: ScrollText, },
];

const ACCOUNT_ITEMS = [
  {
    key: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

function computeActiveKey(pathname) {
  const all = [...NAV_ITEMS, ...ACCOUNT_ITEMS].sort(
    (a, b) => b.key.length - a.key.length
  );

  const match = all.find(
    (item) =>
      pathname === item.key ||
      pathname.startsWith(`${item.key}/`)
  );

  return match?.key;
}

function roleLabel(role) {
  if (!role) return "Admin";

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

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const activeKey = computeActiveKey(location.pathname);

  const sidebarUser = {
    name: user?.name ?? "Admin",
    roleLabel: roleLabel(user?.role),
    initials: user?.initials || getInitials(user?.name),
  };

  const handleLogout = () => {
    navigate("/", { replace: true });
    logout();
  };

  return (
    <DashboardLayout
      theme="admin"
      sidebarProps={{
        groups: [
          { items: NAV_ITEMS },
          {
            label: "Account",
            items: ACCOUNT_ITEMS,
          },
        ],
        activeKey,
        onNavigate: (key) => navigate(key),
        user: sidebarUser,
        onLogout: handleLogout,
      }}
      topBarProps={{
        searchPlaceholder: "Search users, resources, paths...",
        notificationCount: 0,
        user: sidebarUser,
      }}
    >
    </DashboardLayout>
  );
}