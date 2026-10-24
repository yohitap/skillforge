import api from "./api";

const recommendationService = {
  getAll(params = {}) {
    return api.get("/recommendations", params);
  },

  getForRole(roleId) {
    return api.get(`/recommendations/roles/${roleId}`);
  },

  getSkillGaps(params = {}) {
    return api.get("/recommendations/skill-gaps", params);
  },

  getProjects(params = {}) {
    return api.get("/recommendations/projects", params);
  },

  getLearningResources(params = {}) {
    return api.get("/recommendations/resources", params);
  },

  refresh() {
    return api.post("/recommendations/refresh", {});
  },
};

export default recommendationService;
