import useAuthStore from "@/store/authStore";
import apiClient from "./apiClient";

// Function to apply the interceptor when the user logs in
export const applyAuthInterceptor = () => {
  const token = useAuthStore.getState().token;
  if (token) {
    apiClient.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error),
    );
  }
};

export const initializeAuthInterceptor = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  if (isAuthenticated) {
    applyAuthInterceptor();
  }
};

// Function to remove the interceptor (optional)
export const removeAuthInterceptor = () => {
  apiClient.interceptors.request.clear(); // Clear all interceptors
};
