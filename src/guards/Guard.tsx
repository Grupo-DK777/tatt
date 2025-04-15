import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

const INACTIVITY_LIMIT_MS = 15 * 60 * 1000; // 15 minutos

export default function Guard({ children }: { children: JSX.Element }) {
  const isLogged = useAuthStore((state) => state.isLogged);
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  useEffect(() => {
    if (isLogged) {
      const lastActive = sessionStorage.getItem("admin_last_active");
      const now = Date.now();

      if (!lastActive || now - parseInt(lastActive) > INACTIVITY_LIMIT_MS) {
        logout();
      } else {
        // Actualizar la marca de tiempo para mantener sesión activa
        sessionStorage.setItem("admin_last_active", now.toString());
      }
    }
  }, [isLogged, logout]);

  if (!isLogged) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
}
