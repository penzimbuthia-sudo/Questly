import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';

const ROLE_HOME = {
  learner: '/learner',
  contributor: '/contributor',
  admin: '/admin',
};

export default function RoleRoute({ allowedRoles, redirectTo, children }) {
  const { user } = useAuth();

  return (
    <ProtectedRoute redirectTo={redirectTo}>
      {user && !allowedRoles.includes(user.role) ? (
        <Navigate to={ROLE_HOME[user.role] ?? '/login'} replace />
      ) : (
        children
      )}
    </ProtectedRoute>
  );
}