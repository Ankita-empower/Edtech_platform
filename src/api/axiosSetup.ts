import axios from "axios";
import { API_BASE_URL, API_BASE_ROUTE } from "../config";
import store from "../redux/store/store";
import { setUserLoggedOut } from "../redux/slices/authSlice";
import { showAlert } from "../redux/slices/alertSlice";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}${API_BASE_ROUTE}`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["ngrok-skip-browser-warning"] = "true";
  }
  return config;
});


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("🔴 Session Expired: Logging out user...");

      localStorage.removeItem("token");
      store.dispatch(setUserLoggedOut());

    
      store.dispatch(
        showAlert({
          message: "🔴 Session Expired: Please log in again.",
          severity: "error",
        })
      );

      window.location.href = "/login"; 
    }

    return Promise.reject(error);
  }
);

export default apiClient;
