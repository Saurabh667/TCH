
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

const getStoredToken = (key) =>
  localStorage.getItem(key) || sessionStorage.getItem(key);


const saveAccessToken = (token) => {
  if (localStorage.getItem("refresh")) {
    localStorage.setItem("access", token);
  } else if (sessionStorage.getItem("refresh")) {
    sessionStorage.setItem("access", token);
  }
};

const clearTokens = () => {
  ["access", "refresh", "user"].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/login/") ||
      originalRequest.url?.includes("/auth/refresh/")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = getStoredToken("refresh");

    if (!refreshToken) {
      clearTokens();
      return Promise.reject(error);
    }

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          })
          .then((response) => response.data)
          .finally(() => {
            refreshPromise = null;
          });
      }

      const data = await refreshPromise;

      if (!data.access) {
        throw new Error("Access token missing from refresh response.");
      }

      saveAccessToken(data.access);

      originalRequest.headers.Authorization = `Bearer ${data.access}`;

      return api(originalRequest);
    } catch (refreshError) {
      clearTokens();
      return Promise.reject(refreshError);
    }
  }
);

export default api;
