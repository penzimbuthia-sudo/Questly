import { api } from "../services/api";

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
  const response = await api.get("/api/resources/mine");
  return unwrapData(response, []);
}

export async function createResource(data) {
  const response = await api.post("/api/resources", data);
  const resource = unwrapData(response, null);
  notifyResourceCreated(resource);
  return resource;
}

export async function createLearningPath(data) {
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