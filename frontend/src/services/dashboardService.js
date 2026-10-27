import api from "./api";

function mapDashboard(raw) {
  const summary = raw?.summary ?? raw ?? {};

  const progress =
    summary.progress_percentage ??
    (summary.total_tasks
      ? Math.round((summary.tasks_completed / summary.total_tasks) * 100)
      : 0);

  return {
    ...raw,
    skills_count: summary.skills_tracked ?? 0,
    evidence_count: summary.evidence_items ?? 0,
    projects_count: summary.projects ?? 0,
    progress_percentage: progress,
    completion_percentage: progress,
    recent_activities: raw?.activities ?? [],
  };
}

const dashboardService = {
  getOverview() {
    return api.get("/dashboard/").then(mapDashboard);
  },

  getDashboard() {
    return this.getOverview();
  },

  getStats() {
    return api.get("/dashboard/stats");
  },

  getRecentActivity(params = {}) {
    return api.get("/dashboard/activity", params);
  },

  getProgress() {
    return api.get("/dashboard/progress").then((result) =>
      mapDashboard({
        summary: result?.summary,
        roadmaps: result?.roadmaps,
        activities: result?.items,
      })
    );
  },

  getRecommendations() {
    return api.get("/recommendations");
  },
};

export default dashboardService;
