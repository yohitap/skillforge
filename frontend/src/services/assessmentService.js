import api from "./api";

const assessmentService = {
  getAll(params = {}) {
    return api.get("/assessments", params);
  },

  getById(id) {
    return api.get(`/assessments/${id}`);
  },

  start(id) {
    return api.post(`/assessments/${id}/start`, {});
  },

  submit(id, answers) {
    return api.post(`/assessments/${id}/submit`, { answers });
  },

  getResults(id) {
    return api.get(`/assessments/${id}/results`);
  },

  getMyResults(params = {}) {
    return api.get("/assessments/results/me", params);
  },
};

export default assessmentService;
