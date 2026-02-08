import axios from "axios";
import { useAuthStore } from "../store/authStore";

// =========================
// Axios instance
// =========================
export const api = axios.create();

// =========================
// Request interceptor
// =========================
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().auth?.token;

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// =========================
// Response interceptor
// =========================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      useAuthStore.getState().setAuth(undefined);
    }

    if (status === 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  },
);

export default api;
