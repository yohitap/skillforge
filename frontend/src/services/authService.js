import api from "./api";

const authService = {
  async register(userData) {
    const result = await api.post("/auth/register", userData);

    if (result?.access_token) {
      localStorage.setItem("access_token", result.access_token);
    }

    return result;
  },

  async login(credentials) {
    const result = await api.post("/auth/login", credentials);

    if (result?.access_token) {
      localStorage.setItem("access_token", result.access_token);
    }

    return result;
  },

  async getCurrentUser() {
    return api.get("/auth/me");
  },

  async logout() {
    try {
      await api.post("/auth/logout", {});
    } finally {
      localStorage.removeItem("access_token");
    }
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem("access_token"));
  },
};

export default authService;
