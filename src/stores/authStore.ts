import { create } from "zustand";

interface AuthState {
  isLogged: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogged: sessionStorage.getItem("admin_logged") === "true",
  login: (username, password) => {
    const validUser = import.meta.env.VITE_ADMIN_USER;
    const validPass = import.meta.env.VITE_ADMIN_PASS;
    const success = username === validUser && password === validPass;
    if (success) {
      sessionStorage.setItem("admin_logged", "true");
      sessionStorage.setItem("admin_last_active", Date.now().toString());
      set({ isLogged: true });
    }
    return success;
  },
  logout: () => {
    sessionStorage.removeItem("admin_logged");
    sessionStorage.removeItem("admin_last_active");
    set({ isLogged: false });
  },
}));
