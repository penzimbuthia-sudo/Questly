import { useState, useCallback } from 'react';
import authService, { decodeToken } from '../services/authService';
import { tokenStore } from '../services/api';
import { AuthContext } from './auth-context';

function readStoredSession() {
  const stored = tokenStore.get();
  if (!stored) return { token: null, user: null };

  const decoded = decodeToken(stored);
  const expired = decoded?.exp && decoded.exp * 1000 < Date.now();

  if (decoded && !expired) return { token: stored, user: decoded };

  tokenStore.clear();
  return { token: null, user: null };
}

import { createContext, useState, useEffect, useCallback } from 'react';
import authService, { decodeToken } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  const login = useCallback(async (email, password) => {
    await authService.login({ email, password });
    const stored = tokenStore.get();
    const decoded = decodeToken(stored);

    if (!stored || !decoded) {
      setSession({ token: null, user: null });
      return null;
    }

    setSession({ token: stored, user: decoded });
    return decoded;
  }, []);

  const register = useCallback(async (payload) => {
    await authService.register(payload);
    const stored = tokenStore.get();
    const decoded = decodeToken(stored);

    if (!stored || !decoded) {
      setSession({ token: null, user: null });
      return null;
    }

    setSession({ token: stored, user: decoded });
    return decoded;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Ignore backend logout errors; still clear client session.
    }

    tokenStore.clear();
    setSession({ token: null, user: null });
    const userData = await authService.login({ email, password });
    // If your authService returns the token in the response
    // You might need to adjust this based on your actual API response
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      setToken(token);
      setUser(decoded);
      return decoded;
    }
    return userData;
  }, []);

  const register = useCallback(async (payload) => {
    const userData = await authService.register(payload);
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      setToken(token);
      setUser(decoded);
      return decoded;
    }
    return userData;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    token: session.token,
    user: session.user,
    role: session.user?.role ?? null,
    isAuthenticated: Boolean(session.token && session.user),
    loading: false,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
