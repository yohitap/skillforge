import api from "./api";

const skillService = {
  getAll(params = {}) {
    return api.get("/skills", params);
  },

  getById(id) {
    return api.get(`/skills/${id}`);
  },

  search(query, params = {}) {
    return api.get("/skills/search", {
      ...params,
      q: query,
    });
  },

  getMySkills() {
    return api.get("/skills/me");
  },

  addSkill(skill) {
    return api.post("/skills/me", skill);
  },

  updateMySkill(id, updates) {
    return api.patch(`/skills/me/${id}`, updates);
  },

  removeSkill(id) {
    return api.delete(`/skills/me/${id}`);
  },

  getDependencies(id) {
    return api.get(`/skills/${id}/dependencies`);
  },

  getSkillGraph(params = {}) {
    return api.get("/skills/graph", params);
  },
};

export default skillService;
