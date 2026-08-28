import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RouteErrorBoundary from '../components/system/RouteErrorBoundary';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import NotFound from '../pages/NotFound';

import RoleRoute from './RoleRoute';

// Lazy-loaded so a broken import inside any one section (Landing,
// Contributor, Admin) only breaks that section's route when it's
// actually visited, instead of crashing the whole app on load — each
// area is still being built out in parallel by different people.
const Landing = lazy(() => import('../pages/Landing'));
const LearnerRoutes = lazy(() => import('./LearnerRoutes'));
const ContributorRoutes = lazy(() => import('./ContributorRoutes'));
const AdminRoutes = lazy(() => import('./AdminRoutes'));

const ROLE_HOME = {
  learner: '/learner',
  contributor: '/contributor',
  admin: '/admin',
};

function RootRedirect() {
  const { isAuthenticated, role, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) return <Navigate to={ROLE_HOME[role] ?? '/login'} replace />;
  // ✅ Wrap Landing in Suspense
  return (
    <Suspense fallback={<RouteFallback />}>
      <Landing />
    </Suspense>
  );
}

function RouteFallback() {
  return <div className="p-8 text-sm text-[#8B93A7]">Loading…</div>;
}

export default function AppRoutes() {
  return (
    <RouteErrorBoundary>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<RootRedirect />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/learner/*"
            element={
              <RoleRoute allowedRoles={['learner']} redirectTo="/">
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
      </Suspense>
    </RouteErrorBoundary>
  );
}