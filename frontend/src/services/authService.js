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
  login: (email, password) =>
    api.post('/auth/login', { email, password }, { auth: false }),

  register: (payload) =>
    api.post('/auth/register', payload, { auth: false }),

  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }, { auth: false }),

  resetPassword: (token, password) =>
    api.post('/auth/reset-password', { token, password }, { auth: false }),
};
