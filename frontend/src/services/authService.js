import { api } from './api';

export function decodeToken(token) {
  try {
    const payload = token.split('.')[1];

    if (!payload) return null;

    const normalized = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      '='
    );

    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';
   console.log("USE_MOCK is:", USE_MOCK);

// Seeded accounts so you can test each role's dashboard directly.
// Any other email/password combo on login falls back to role "learner".
const MOCK_USERS = [
  { email: 'learner@test.com', password: 'password', name: 'Test Learner', role: 'learner' },
  { email: 'contributor@test.com', password: 'password', name: 'Test Contributor', role: 'contributor' },
  { email: 'admin@test.com', password: 'password', name: 'Test Admin', role: 'admin' },
  { email: 'chome@test.com', password: 'password', name: 'Test Admin', role: 'admin' },
];

function base64url(obj) {
  const json = JSON.stringify(obj);
  return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Builds a real-shaped (but unsigned) JWT so decodeToken() and RoleRoute
// work exactly as they would against the real backend.
function buildMockToken({ email, name, role }) {
  const header = { alg: 'none', typ: 'JWT' };
  const payload = {
    sub: email,
    email,
    name,
    role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h
  };
  return `${base64url(header)}.${base64url(payload)}.mock-signature`;
}

function mockDelay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mockLogin(email, password) {
  await mockDelay();
  const match = MOCK_USERS.find((u) => u.email === email);
  if (match && match.password !== password) {
    throw new Error('Incorrect password for this mock account.');
  }
  const name = match?.name ?? email.split('@')[0];
  const role = match?.role ?? 'learner';
  return { token: buildMockToken({ email, name, role }) };
}

async function mockRegister(payload) {
  await mockDelay();
  const { email, name, role = 'learner' } = payload;
  return { token: buildMockToken({ email, name, role }) };
}

async function mockForgotPassword() {
  await mockDelay();
  return { message: 'Mock mode: pretend a reset email was sent.' };
}

async function mockResetPassword() {
  await mockDelay();
  return { message: 'Mock mode: pretend the password was reset.' };
}

export const authService = {
  login: async (email, password) => {
    if (USE_MOCK) {
      return mockLogin(email, password);
    }

    const response = await api.post(
      '/auth/login',
      { email, password },
      { auth: false }
    );

    return response.data;
  },

  register: async (payload) => {
    if (USE_MOCK) {
      return mockRegister(payload);
    }

    const response = await api.post(
      '/auth/register',
      payload,
      { auth: false }
    );

    return response.data;
  },

  forgotPassword: async (email) => {
    if (USE_MOCK) {
      return mockForgotPassword(email);
    }

    const response = await api.post('/auth/forgot-password', { email }, { auth: false });
    return response.data;
  },

  resetPassword: async (token, password) => {
    if (USE_MOCK) {
      return mockResetPassword(token, password);
    }

    const response = await api.post('/auth/reset-password', { token, password }, { auth: false });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};