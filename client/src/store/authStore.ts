import { create } from "zustand";
import { User } from "@/types";
import { persist } from "zustand/middleware";
import {
  applyAuthInterceptor,
  removeAuthInterceptor,
} from "@/lib/interceptors";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user: User, token: string) => {
        set({ isAuthenticated: true, user, token });
        applyAuthInterceptor();
      },

      logout: () => {
        set({ isAuthenticated: false, user: null, token: null });
        removeAuthInterceptor();
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
