import api from "./api";

const skillService = {
  getAll(params = {}) {
    return api.get("/skills/", params);
  },

  async getSkills(params = {}) {
    try {
      const mine = await this.getMySkills();
      if (Array.isArray(mine) && mine.length > 0) {
        return mine.map((item) => ({
          id: item.skill_id ?? item.id,
          ...item,
        }));
      }
    } catch {
      // fall through to catalog
    }

    const catalog = await this.getAll(params);
    return catalog?.items ?? catalog ?? [];
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
