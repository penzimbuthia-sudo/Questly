import { useState, useCallback, useMemo } from 'react';
import { AuthContext } from './AuthContextType';
import { authService, decodeToken } from '../services/authService';
import { setCurrentUser, clearCurrentUser } from '../services/learningPathService';

export { AuthContext };

const initializeAuth = () => {
  const stored = localStorage.getItem('token');
  if (stored) {
    const decoded = decodeToken(stored);
    const expired = decoded?.exp && decoded.exp * 1000 < Date.now();
    if (decoded && !expired) {
      return { token: stored, user: decoded, loading: false };
    }
    localStorage.removeItem('token');
  }
  return { token: null, user: null, loading: false };
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => initializeAuth());

  // Restore per-user store on mount if user is present
  useMemo(() => {
    if (authState.user?.sub) {
      setCurrentUser(authState.user.sub);
    }
  }, [authState.user?.sub]);

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    localStorage.setItem('token', data.token);
    const decoded = decodeToken(data.token);
    setCurrentUser(decoded.sub);
    setAuthState({ token: data.token, user: decoded, loading: false });
    return decoded;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await authService.register(payload);
    localStorage.setItem('token', data.token);
    const decoded = decodeToken(data.token);
    setCurrentUser(decoded.sub);
    setAuthState({ token: data.token, user: decoded, loading: false });
    return decoded;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    clearCurrentUser();
    setAuthState({ token: null, user: null, loading: false });
  }, []);

  const value = useMemo(
    () => ({
      token: authState.token,
      user: authState.user,
      role: authState.user?.role ?? null,
      isAuthenticated: Boolean(authState.token && authState.user),
      loading: authState.loading,
      login,
      register,
      logout,
    }),
    [authState.token, authState.user, authState.loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}