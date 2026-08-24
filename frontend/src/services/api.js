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

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data = null;
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await res.json().catch(() => null);
  }

  if (!res.ok) {
    const message = data?.message || data?.error || `Request failed (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  delete: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};
