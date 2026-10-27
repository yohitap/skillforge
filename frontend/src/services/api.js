const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8000/api"
).replace(/\/+$/, "");

export const TOKEN_KEY = "skillforge_access_token";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);

  const headers = {
    Accept: "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const isFormData = options.body instanceof FormData;
  const isUrlEncoded =
    options.body instanceof URLSearchParams;

  if (options.body && !isFormData && !isUrlEncoded) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null
        ? data.detail || data.message || "Request failed"
        : data || "Request failed";

    const error = new Error(
      typeof message === "string" ? message : JSON.stringify(message)
    );

    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

function buildQuery(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((item) => query.append(key, String(item)));
      } else {
        query.set(key, String(value));
      }
    }
  });

  const result = query.toString();
  return result ? `?${result}` : "";
}

const api = {
  get: (endpoint, params) =>
    request(`${endpoint}${buildQuery(params)}`),

  post: (endpoint, body) =>
    request(endpoint, {
      method: "POST",
      body:
        body instanceof FormData || body instanceof URLSearchParams
          ? body
          : JSON.stringify(body ?? {}),
    }),

  put: (endpoint, body) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body ?? {}),
    }),

  patch: (endpoint, body) =>
    request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body ?? {}),
    }),

  delete: (endpoint) =>
    request(endpoint, { method: "DELETE" }),
};

export default api;
export { API_BASE_URL, buildQuery };
