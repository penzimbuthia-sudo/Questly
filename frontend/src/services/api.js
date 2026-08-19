const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Central fetch wrapper. Every service file (auth, learningPath, resource,
 * user, discussion, report, gamification...) should call through this
 * instead of using fetch directly, so auth headers and error shape stay
 * consistent across all five sectors.
 *
 * @param {string} path - e.g. '/auth/login'
 * @param {object} opts
 * @param {string} [opts.method]
 * @param {object} [opts.body]
 * @param {object} [opts.headers]
 * @param {boolean} [opts.auth] - attach the bearer token; default true
 */

async function request(path, { method = 'GET', body, headers = {}, auth = true } = {}) {
  const token = localStorage.getItem('token');
  const finalHeaders = { 'Content-Type': 'application/json', ...headers };
  if (auth && token) finalHeaders.Authorization = `Bearer ${token}`;
}