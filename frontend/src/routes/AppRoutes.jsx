import RoleRoute from './RoleRoute';
import LearnerRoutes from './learnerRoutes';
import ContributorRoutes from './contributorRoutes';
import AdminRoutes from './adminRoutes';

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