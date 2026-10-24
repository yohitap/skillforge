import api from "./api";

const evidenceService = {
  getAll(params = {}) {
    return api.get("/evidence", params);
  },

  getById(id) {
    return api.get(`/evidence/${id}`);
  },

  create(evidence) {
    return api.post("/evidence", evidence);
  },

  update(id, evidence) {
    return api.patch(`/evidence/${id}`, evidence);
  },

  delete(id) {
    return api.delete(`/evidence/${id}`);
  },

  getTimeline(params = {}) {
    return api.get("/evidence/timeline", params);
  },
};

export default evidenceService;
