import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, BookOpen, HelpCircle,
  Trophy, Award, MessageSquare, Flag, Terminal, Settings,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { useAuth } from "@/hooks/useAuth";

const navGroups = [
  { label: null, items: [{ key: "dashboard", label: "Dashboard", icon: LayoutDashboard }] },
  {
    label: "Manage",
    items: [
      { key: "users", label: "Users", icon: Users },
      { key: "resources", label: "Resources", icon: FileText },
      { key: "learning-paths", label: "Learning paths", icon: BookOpen },
      { key: "quizzes", label: "Quizzes", icon: HelpCircle },
    ],
  },
  {
    label: "Engagement",
    items: [
      { key: "challenges", label: "Challenges", icon: Trophy },
      { key: "badges", label: "Badges", icon: Award },
      { key: "discussions", label: "Discussions", icon: MessageSquare },
      { key: "reports", label: "Reports", icon: Flag },
    ],
  },
  {
    label: "System",
    items: [
      { key: "system-logs", label: "System logs", icon: Terminal },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Works out which sidebar item should be highlighted, by
  // reading the current URL. "/admin/users" -> activeKey "users"
  const activeKey = location.pathname.split("/admin/")[1]?.split("/")[0] || "dashboard";

  const currentUser = {
    name: user?.name || "Admin",
    roleLabel: "Admin",
    initials: user?.initials || "A",
  };

  return (
    <DashboardLayout
      theme="admin"
      sidebarProps={{
        groups: navGroups,
        activeKey,
        onNavigate: (key) => navigate(`/admin/${key}`),
        user: currentUser,
        onLogout: logout,
      }}
      topBarProps={{
        searchPlaceholder: "Search users, content...",
        notificationCount: 3,
        user: currentUser,
      }}
    >
      {/* Whichever admin page matches the URL renders here */}
      <Outlet />
    </DashboardLayout>
  );
}