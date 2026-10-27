import api from "./api";

const jobService = {
  getAll(params = {}) {
    return api.get("/jobs/", params);
  },

  getJobs(params = {}) {
    return this.getAll(params);
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
    return api.get(`/recommendations/skill-gaps/${id}`);
  },

  compare(jobIds) {
    return api.post("/jobs/compare", {
      job_ids: jobIds,
    });
  },

  getRecommended(params = {}) {
    return api.get("/jobs/", params);
  },
};

export default jobService;
