import axios from "axios";
/**
 * A single axios instance configured with the application's base URL
 * and a request interceptor that injects authorization headers (or any
 * other common headers) automatically.
 *
 * Other files should import this instance instead of using global
 * axios or `fetch` directly. That way you never have to manually
 * specify the base URL or headers on every call.
 */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // You can set other defaults like `timeout` here if needed.
});

// request interceptor adds headers before the request is sent
api.interceptors.request.use(
  (config) => {
    // Example: grab token from local storage (or from a store)
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      // eslint-disable-next-line no-param-reassign
      // mutate existing headers object rather than replacing it completely; cast
      // to any to appease the strict Axios headers type
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// (Optional) response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You could handle 401/403 refresh logic here, etc.
    return Promise.reject(error);
  },
);

export default api;
