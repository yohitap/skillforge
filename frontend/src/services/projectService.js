import api from "./api";

const projectService = {
  getAll(params = {}) {
    return api.get("/projects", params);
  },

  getById(id) {
    return api.get(`/projects/${id}`);
  },

  create(project) {
    return api.post("/projects", project);
  },

  update(id, project) {
    return api.patch(`/projects/${id}`, project);
  },

  delete(id) {
    return api.delete(`/projects/${id}`);
  },

  getRecommended(params = {}) {
    return api.get("/recommendations/projects", params);
  },

  updateProgress(id, progress) {
    return api.patch(`/projects/${id}/progress`, { progress });
  },
};

export default projectService;
