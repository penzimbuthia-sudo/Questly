import api from "@/services/api";

export async function getMyResources() {
  const response = await api.get("/contributor/resources");
  return response.data;
}

export async function createResource(data) {
  const response = await api.post("/contributor/resources", data);
  return response.data;
}

export async function createLearningPath(data) {
  const response = await api.post("/contributor/learning-paths", data);
  return response.data;
}
