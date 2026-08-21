import { api } from './api';

export function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(normalized));
  } catch {
    return null;
  }
}

export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }, { auth: false }),

  register: (payload) =>
    api.post('/auth/register', payload, { auth: false }),

  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }, { auth: false }),

  resetPassword: (token, password) =>
    api.post('/auth/reset-password', { token, password }, { auth: false }),
};
