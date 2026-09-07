import { api } from './api';

export function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');

    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password }, { auth: false });
    return response.data;
  },

  register: async (payload) => {
    const response = await api.post('/auth/register', payload, { auth: false });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email }, { auth: false });
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password }, { auth: false });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};