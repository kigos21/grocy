import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Add console logging interceptors
apiClient.interceptors.request.use(
  (config) => {
    // Log request headers
    console.log("Requesting...");
    return config;
  },
  (error) => {
    // Log error if request configuration fails
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Initialize XSRF token and token (if applicable) on initialization
const initializeCsrfToken = async () => {
  try {
    await apiClient.get("/sanctum/csrf-cookie");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};

initializeCsrfToken();

export default apiClient;
