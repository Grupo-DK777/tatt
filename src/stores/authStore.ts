import { create } from "zustand";

interface AuthState {
  isLogged: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogged: localStorage.getItem("admin_logged") === "true",
  login: (username, password) => {
    const validUser = import.meta.env.VITE_ADMIN_USER;
    const validPass = import.meta.env.VITE_ADMIN_PASS;
    const success = username === validUser && password === validPass;
    if (success) {
      localStorage.setItem("admin_logged", "true");
      set({ isLogged: true });
    }
    return success;
  },
  logout: () => {
    localStorage.removeItem("admin_logged");
    set({ isLogged: false });
  },
}));
