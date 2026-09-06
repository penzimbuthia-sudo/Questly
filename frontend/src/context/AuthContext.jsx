import { createContext, useState, useEffect, useCallback } from 'react';
import { authService, decodeToken } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      const decoded = decodeToken(stored);
      const expired = decoded?.exp && decoded.exp * 1000 < Date.now();
      if (decoded && !expired) {
        setToken(stored);
        setUser(decoded);
      } else {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    localStorage.setItem('token', data.token);
    const decoded = decodeToken(data.token);
    setToken(data.token);
    setUser(decoded);
    return decoded;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await authService.register(payload);
    localStorage.setItem('token', data.token);
    const decoded = decodeToken(data.token);
    setToken(data.token);
    setUser(decoded);
    return decoded;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    token,
    user,
    role: user?.role ?? null,
    isAuthenticated: Boolean(token && user),
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}