import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Home, Layers, Users, Trophy, BarChart3, Wallet, User, Settings,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { useAuth } from "@/hooks/useAuth";

const navGroups = [
  { label: null, items: [{ key: "dashboard", label: "Dashboard", icon: Home }] },
  {
    label: null,
    items: [
      { key: "content", label: "My Content", icon: Layers },
      { key: "community", label: "Community", icon: Users },
      { key: "challenges", label: "Challenges", icon: Trophy },
      { key: "analytics", label: "Analytics", icon: BarChart3 },
      { key: "rewards", label: "Rewards", icon: Wallet },
      { key: "profile", label: "Profile", icon: User },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function ContributorLayout() {
  const navigate = useNavigate();

  const location = useLocation();

  const { user, logout } = useAuth();

  const activeKey = location.pathname.split("/contributor/")[1]?.split("/")[0] || "dashboard";

  const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const currentUser = {
    name: user?.name || "Contributor",
    roleLabel: user?.role
      ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
      : "Contributor",
    initials: user?.initials || getInitials(user?.name),
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <DashboardLayout
      theme="contributor"
      sidebarProps={{
        groups: navGroups,
        activeKey: activeKey,
        onNavigate: (key) => navigate(`/contributor/${key}`),
        user: currentUser,
        onLogout: handleLogout,
      }}
      topBarProps={{
        searchPlaceholder: "Search your resources, paths...",
        notificationCount: 2,
        user: currentUser,
      }}
    >
      <Outlet />
    </DashboardLayout>
  );
}