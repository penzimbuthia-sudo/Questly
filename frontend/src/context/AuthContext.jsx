import { useState, useCallback } from 'react';
import { authService, decodeToken } from '../services/authService';
import { AuthContext } from './auth-context';

function getStoredAuth() {
  const stored = localStorage.getItem('token');
  if (!stored) return { token: null, user: null };

  const decoded = decodeToken(stored);
  const expired = decoded?.exp && decoded.exp * 1000 < Date.now();
  if (decoded && !expired) return { token: stored, user: decoded };

  localStorage.removeItem('token');
  return { token: null, user: null };
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth);
  const { token, user } = auth;

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    localStorage.setItem('token', data.token);
    const decoded = decodeToken(data.token);
    setAuth({ token: data.token, user: decoded });
    return decoded;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await authService.register(payload);
    localStorage.setItem('token', data.token);
    const decoded = decodeToken(data.token);
    setAuth({ token: data.token, user: decoded });
    return decoded;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setAuth({ token: null, user: null });
  }, []);

  const value = {
    token,
    user,
    role: user?.role ?? null,
    isAuthenticated: Boolean(token && user),
    loading: false,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}