import api, { tokenStore } from './api';

// Person A owns route guards / auth context; this file only wraps the
// auth endpoints so any page or context can call a plain async function.

export function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(normalized));
  } catch {
    return null;
  }
}

export async function login({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password });
  if (data.token) tokenStore.set(data.token);
  return data.user;
}

export async function register({ name, email, password, role = 'learner' }) {
  const { data } = await api.post('/auth/register', { name, email, password, role });
  if (data.token) tokenStore.set(data.token);
  return data.user;
}

export async function logout() {
  try {
    await api.post('/auth/logout');
  } finally {
    tokenStore.clear();
  }
}

export async function getCurrentUser() {
  const { data } = await api.get('/auth/me');
  return data;
}

export async function requestPasswordReset(email) {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
}

export async function resetPassword({ token, password }) {
  const { data } = await api.post('/auth/reset-password', { token, password });
  return data;
}

export function isAuthenticated() {
  return Boolean(tokenStore.get());
}

export default {
  login,
  register,
  logout,
  getCurrentUser,
  requestPasswordReset,
  resetPassword,
  isAuthenticated,
  decodeToken,
};