import { api } from "../services/api";

const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === "true";
const MOCK_RESOURCE_PREFIX = "questly-contributor-resources:";
const MOCK_STATS_PREFIX = "questly-contributor-stats:";

function getMockUser() {
  try {
    const payload = localStorage.getItem("token")?.split(".")[1];
    return payload ? JSON.parse(atob(payload)) : null;
  } catch {
    return null;
  }
}

function getMockState() {
  const user = getMockUser();
  const userId = user?.sub || "anonymous";
  const resources = JSON.parse(localStorage.getItem(`${MOCK_RESOURCE_PREFIX}${userId}`) || "[]");
  const stats = JSON.parse(localStorage.getItem(`${MOCK_STATS_PREFIX}${userId}`) || "null") || {
    xp: 0,
    resources: 0,
    paths: 0,
    upvotes: 0,
    streak_days: 0,
  };
  return { user, userId, resources, stats };
}

function saveMockState({ userId, resources, stats }) {
  localStorage.setItem(`${MOCK_RESOURCE_PREFIX}${userId}`, JSON.stringify(resources));
  localStorage.setItem(`${MOCK_STATS_PREFIX}${userId}`, JSON.stringify(stats));
}

function notifyResourceCreated(resource) {
  if (typeof window !== "undefined" && resource) {
    window.dispatchEvent(new CustomEvent("questly:resource-created", { detail: resource }));
  }
}

function unwrapData(response, fallback) {
  const value = response?.data?.data ?? response?.data ?? response;
  return value ?? fallback;
}

export async function getMyResources() {
  if (USE_MOCK_AUTH) return getMockState().resources;
  const response = await api.get("/api/resources/mine");
  return unwrapData(response, []);
}

export async function createResource(data) {
  if (USE_MOCK_AUTH) {
    const state = getMockState();
    const resource = {
      ...data,
      id: `mock-resource-${Date.now()}`,
      contributor_id: state.userId,
      views: 0,
      upvotes: 0,
      status: "Pending",
      created_at: new Date().toISOString(),
      xp_awarded: 25,
      badges_awarded: [],
    };
    state.resources.unshift(resource);
    state.stats = { ...state.stats, xp: state.stats.xp + 25, resources: state.stats.resources + 1 };
    saveMockState({ ...state, resources: state.resources, stats: state.stats });
    notifyResourceCreated(resource);
    return resource;
  }
  const response = await api.post("/api/resources", data);
  const resource = unwrapData(response, null);
  notifyResourceCreated(resource);
  return resource;
}

export async function createLearningPath(data) {
  if (USE_MOCK_AUTH) {
    const state = getMockState();
    const path = {
      ...data,
      id: `mock-path-${Date.now()}`,
      type: "Learning Path",
      views: 0,
      upvotes: 0,
      status: "Pending",
      xp_awarded: 50,
      badges_awarded: [],
    };
    state.resources.unshift(path);
    state.stats = { ...state.stats, xp: state.stats.xp + 50, paths: state.stats.paths + 1 };
    saveMockState({ ...state, resources: state.resources, stats: state.stats });
    notifyResourceCreated(path);
    return path;
  }
  const response = await api.post("/api/learning-paths", data);
  const path = unwrapData(response, null);
  notifyResourceCreated(path);
  return path;
}

export async function getPublishedResources(type, status = "approved") {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (status) params.set("status", status);
  const query = params.toString() ? `?${params.toString()}` : "";
  const response = await api.get(`/api/resources${query}`);
  return unwrapData(response, []);
}

export async function upvoteResource(resourceId) {
  const response = await api.post(`/api/resources/${resourceId}/upvote`, {});
  return unwrapData(response, null);
}
