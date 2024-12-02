import useAuthStore from "@/store/authStore";
import apiClient from "./apiClient";

// Function to apply the interceptor when the user logs in
export const applyAuthInterceptor = () => {
  const token = useAuthStore.getState().token;
  if (token) {
    apiClient.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Auth interceptor added.");
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
    console.log("Auth interceptor initialized during app bootstrap.");
  }
};

// Function to remove the interceptor (optional)
export const removeAuthInterceptor = () => {
  apiClient.interceptors.request.clear(); // Clear all interceptors
  console.log("Auth interceptor removed.");
};
