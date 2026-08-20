import { Routes, Route, Navigate } from 'react-router-dom';
import RoleRoute from './RoleRoute';
import LearnerRoutes from './LearnerRoutes';
import ContributorRoutes from './ContributorRoutes';
import AdminRoutes from './AdminRoutes';

const ROLE_HOME = {
  learner: '/learner',
  contributor: '/contributor',
  admin: '/admin',
};

function RootRedirect() {
  const { isAuthenticated, role, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) return <Navigate to={ROLE_HOME[role] ?? '/login'} replace />;
  return <Landing />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/learner/*"
        element={
          <RoleRoute allowedRoles={['learner']}>
            <LearnerRoutes />
          </RoleRoute>
        }
      />
      <Route
        path="/contributor/*"
        element={
          <RoleRoute allowedRoles={['contributor']}>
            <ContributorRoutes />
          </RoleRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <RoleRoute allowedRoles={['admin']}>
            <AdminRoutes />
          </RoleRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}