import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';

const ROLE_HOME = {
  learner: '/learner',
  contributor: '/contributor',
  admin: '/admin',
};

export default function RoleRoute({ children }) {}