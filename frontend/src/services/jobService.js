import api from "./api";

const jobService = {
  getAll(params = {}) {
    return api.get("/jobs", params);
  },

  getById(id) {
    return api.get(`/jobs/${id}`);
  },

  search(query, params = {}) {
    return api.get("/jobs/search", {
      ...params,
      q: query,
    });
  },

  analyzeSkills(id) {
    return api.post(`/jobs/${id}/analyze`, {});
  },

  compare(jobIds) {
    return api.post("/jobs/compare", {
      job_ids: jobIds,
    });
  },

  getRecommended(params = {}) {
    return api.get("/jobs/recommended", params);
  },
};

export default jobService;
