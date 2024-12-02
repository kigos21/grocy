import { LoginFormValues, RegisterFormValues } from "@/types/zod";
import apiClient from "@/lib/apiClient";

export class AuthService {
  static async login(values: LoginFormValues) {
    const response = await apiClient.post("/api/login", values);
    return response.data;
  }

  static async register(values: RegisterFormValues) {
    const response = await apiClient.post("/api/register", values);
    return response.data;
  }

  // static async getUserProfile() {
  //   const response = await axios.get("/api/profile");
  //   return response.data; // Returns the user's profile information
  // }

  static async logout() {
    const response = await apiClient.post("/api/logout");
    return response.data;
  }
}
