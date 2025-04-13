import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function Guard({ children }: { children: JSX.Element }) {
  const isLogged = useAuthStore((state) => state.isLogged);
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
}
