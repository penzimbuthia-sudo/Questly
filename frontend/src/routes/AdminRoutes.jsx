import { Routes, Route, Navigate } from 'react-router-dom';

// From Person A - Auth & Routes (these will be provided later)
// For now, we'll use placeholders
// import { ProtectedRoute } from './ProtectedRoute';
// import { RoleRoute } from './RoleRoute';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import Resources from '../pages/admin/Resources';
import LearningPaths from '../pages/admin/LearningPaths';
import Quizzes from '../pages/admin/Quizzes';
import Discussions from '../pages/admin/Discussions';
import Reports from '../pages/admin/Reports';
import Challenges from '../pages/admin/Challenges';
import Badges from '../pages/admin/Badges';
import SystemLogs from '../pages/admin/SystemLogs';
import Settings from '../pages/admin/Settings';

// Admin Layout
import DashboardLayout from '../components/layout/DashboardLayout';

export default function AdminRoutes() {
  return (
    // When Person A provides these, uncomment:
    // <ProtectedRoute>
    //   <RoleRoute role="admin">
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="resources" element={<Resources />} />
            <Route path="learning-paths" element={<LearningPaths />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="discussions" element={<Discussions />} />
            <Route path="reports" element={<Reports />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="badges" element={<Badges />} />
            <Route path="system-logs" element={<SystemLogs />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </DashboardLayout>
    //   </RoleRoute>
    // </ProtectedRoute>
  );
}