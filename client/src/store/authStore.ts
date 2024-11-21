import { create } from "zustand";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user: User, token: string) => {
    // Store token in localStorage
    localStorage.setItem("authToken", token);

    // Update state
    set({ isAuthenticated: true, user: user });
  },
  logout: () => {
    localStorage.removeItem("authToken"); // Remove token
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
