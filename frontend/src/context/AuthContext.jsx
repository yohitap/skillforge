import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8000/api"
).replace(/\/+$/, "");

const TOKEN_KEY = "skillforge_access_token";
const USER_KEY = "skillforge_user";

function getStoredUser() {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveSession(token, user) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(
    localStorage.getItem(TOKEN_KEY) && user
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    toast.success("You have been logged out.");
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 10000
      });

      const currentUser = response.data.user ?? response.data;
      setUser(currentUser);
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    } catch {
      // Keep the stored session for a temporary network failure.
      // A 401 means the token is invalid or expired.
      const cachedUser = getStoredUser();

      if (!cachedUser) {
        clearSession();
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = useCallback(async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        { timeout: 15000 }
      );

      const data = response.data;
      const token = data.access_token ?? data.token;
      let currentUser = data.user ?? data.profile ?? null;

      if (!token) {
        throw new Error(
          "The login response did not contain an access token."
        );
      }

      saveSession(token, currentUser);

      if (!currentUser) {
        const profileResponse = await axios.get(
          `${API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            timeout: 10000
          }
        );

        currentUser = profileResponse.data.user ?? profileResponse.data;
        saveSession(token, currentUser);
      }

      setUser(currentUser);
      toast.success("Welcome back!");
      return currentUser;
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Unable to log in. Please try again.";

      toast.error(
        typeof message === "string" ? message : "Login failed."
      );

      throw error;
    }
  }, []);

  const register = useCallback(
    async ({ email, password, full_name }) => {
      try {
        const response = await axios.post(
          `${API_URL}/auth/register`,
          { email, password, full_name },
          { timeout: 15000 }
        );

        const data = response.data;
        const token = data.access_token ?? data.token;
        let currentUser = data.user ?? data.profile ?? null;

        if (token) {
          saveSession(token, currentUser);

          if (!currentUser) {
            try {
              const profileResponse = await axios.get(
                `${API_URL}/auth/me`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  },
                  timeout: 10000
                }
              );

              currentUser =
                profileResponse.data.user ?? profileResponse.data;

              saveSession(token, currentUser);
            } catch {
              clearSession();
            }
          }

          if (currentUser) {
            setUser(currentUser);
            toast.success("Your account has been created!");
            return currentUser;
          }
        }

        // Some APIs create the account without returning a token.
        toast.success("Account created. Please log in.");
        window.location.assign("/login");
        return data;
      } catch (error) {
        const message =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          "Unable to create your account.";

        toast.error(
          typeof message === "string" ? message : "Registration failed."
        );

        throw error;
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      refreshUser: fetchCurrentUser
    }),
    [
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      fetchCurrentUser
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
}
