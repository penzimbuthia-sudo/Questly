import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';

const ROLE_HOME = {
  learner: '/learner',
  contributor: '/contributor',
  admin: '/admin',
};

export default function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      {user && !allowedRoles.includes(user.role) ? (
        <Navigate to={ROLE_HOME[user.role] ?? '/login'} replace />
      ) : (
        children
      )}
    </ProtectedRoute>
  );
}