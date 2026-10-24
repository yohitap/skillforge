import api from "./api";

const roadmapService = {
  getAll(params = {}) {
    return api.get("/roadmaps", params);
  },

  getById(id) {
    return api.get(`/roadmaps/${id}`);
  },

  create(roadmap) {
    return api.post("/roadmaps", roadmap);
  },

  update(id, roadmap) {
    return api.patch(`/roadmaps/${id}`, roadmap);
  },

  delete(id) {
    return api.delete(`/roadmaps/${id}`);
  },

  completeStep(roadmapId, stepId) {
    return api.post(
      `/roadmaps/${roadmapId}/steps/${stepId}/complete`,
      {}
    );
  },

  updateStepProgress(roadmapId, stepId, progress) {
    return api.patch(
      `/roadmaps/${roadmapId}/steps/${stepId}`,
      { progress }
    );
  },
};

export default roadmapService;
