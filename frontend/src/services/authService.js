import api, { TOKEN_KEY } from "./api";

const authService = {
  async register(userData) {
    const payload = {
      ...userData,
      name: userData.name ?? userData.full_name,
    };

    const result = await api.post("/auth/register", payload);

    if (result?.access_token) {
      localStorage.setItem(TOKEN_KEY, result.access_token);
    }

    return result;
  },

  async login(credentials) {
    const result = await api.post("/auth/login/json", {
      email: credentials.email,
      password: credentials.password,
    });

    if (result?.access_token) {
      localStorage.setItem(TOKEN_KEY, result.access_token);
    }

    return result;
  },

  async getCurrentUser() {
    return api.get("/auth/me");
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("skillforge_user");
    localStorage.removeItem("access_token");
    return Promise.resolve();
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },
};

export default authService;
