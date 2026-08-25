// feature/your-name/contributor-workspace/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Plus, 
  Trophy, 
  Flame, 
  BookOpen, 
  Layers, 
  Award,
  TrendingUp,
  Clock,
  Star
} from "lucide-react";
import StatCard from "../../components/contributor/StatCard";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  
  // Mock data for testing
  const stats = {
    xp: 2450,
    rank: 42,
    streak: 7,
    followers: 128,
    following: 64,
    contributions: 89,
    level: 5
  };
  
  const badges = [
    { id: 1, name: "First Resource", description: "Shared your first resource" },
    { id: 2, name: "Community Helper", description: "Helped 10 learners" },
  ];
  
  const resourceCount = 12;
  const pathCount = 3;
  
  const recentActivity = [
    { id: 1, action: "Resource viewed", target: "React 101", time: "2 hours ago" },
    { id: 2, action: "New comment", target: "JavaScript Guide", time: "5 hours ago" },
    { id: 3, action: "XP earned", target: "+50 XP", time: "1 day ago" },
  ];

  const quickActions = [
    { label: "New Resource", icon: Plus, path: "/contributor/content/new", color: "violet" },
    { label: "Create Path", icon: Layers, path: "/contributor/content/new?type=path", color: "blue" },
    { label: "View Analytics", icon: TrendingUp, path: "/contributor/analytics", color: "green" },
    { label: "Challenges", icon: Trophy, path: "/contributor/challenges", color: "amber" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page contributor-dashboard max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, Contributor!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening with your content and community.
          </p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Link
            to="/contributor/content/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 transition-colors"
          >
            <Plus size={16} />
            New Resource
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          label="Total XP" 
          value={stats?.xp ?? "—"} 
          icon={<Trophy size={18} />}
          footnote={stats ? `Rank: ${stats.rank}` : ""} 
          color="violet"
        />
        <StatCard 
          label="Streak" 
          value={stats ? `${stats.streak} days` : "—"} 
          icon={<Flame size={18} />}
          color="amber"
        />
        <StatCard 
          label="Resources shared" 
          value={resourceCount} 
          icon={<BookOpen size={18} />}
          color="blue"
          link="/contributor/content"
        />
        <StatCard 
          label="Paths created" 
          value={pathCount} 
          icon={<Layers size={18} />}
          color="green"
          link="/contributor/content?filter=path"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            to={action.path}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all hover:shadow-md hover:scale-[1.02]`}
            style={{ 
              borderColor: `var(--color-${action.color}-200, #e2e8f0)`,
              background: `var(--color-${action.color}-50, #f8fafc)`,
            }}
          >
            <action.icon size={16} className={`text-${action.color}-600`} />
            <span className="text-sm font-medium">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Badges */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Award size={20} className="text-amber-500" />
                Recent Badges
              </h2>
              <Link
                to="/contributor/rewards"
                className="text-sm text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 font-medium flex items-center gap-1"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            
            {badges.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Award size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No badges yet — share a resource to get started.
                </p>
                <Link
                  to="/contributor/content/new"
                  className="inline-block mt-3 text-sm text-violet-600 hover:text-violet-700 font-medium"
                >
                  Share your first resource →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {badges.slice(0, 6).map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Star size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{b.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{b.description || "Achievement"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <Clock size={20} className="text-gray-500" />
              Recent Activity
            </h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-violet-500"></div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.target} · {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/contributor/community"
              className="block text-center mt-4 text-sm text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 font-medium"
            >
              View all activity
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.followers || 0}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.following || 0}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.contributions || 0}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Contributions</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.level || 1}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
        </div>
      </div>
    </div>
  );
}