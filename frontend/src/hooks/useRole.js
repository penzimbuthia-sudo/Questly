import { useAuth } from './useAuth';

export function useRole() {
  const { role } = useAuth();

  const hasRole = (...roles) => roles.includes(role);

  return { role, hasRole };
}