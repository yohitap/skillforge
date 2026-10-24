import api from "./api";

const dashboardService = {
  getOverview() {
    return api.get("/dashboard");
  },

  getStats() {
    return api.get("/dashboard/stats");
  },

  getRecentActivity(params = {}) {
    return api.get("/dashboard/activity", params);
  },

  getProgress() {
    return api.get("/dashboard/progress");
  },

  getRecommendations() {
    return api.get("/recommendations");
  },
};

export default dashboardService;
