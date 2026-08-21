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

const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

// Seeded accounts so you can test each role's dashboard directly.
// Any other email/password combo on login falls back to role "learner".
const MOCK_USERS = [
  { email: 'learner@test.com', password: 'password', name: 'Test Learner', role: 'learner' },
  { email: 'contributor@test.com', password: 'password', name: 'Test Contributor', role: 'contributor' },
  { email: 'admin@test.com', password: 'password', name: 'Test Admin', role: 'admin' },
];

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
