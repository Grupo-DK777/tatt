import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      // Guarda la marca de tiempo de actividad inicial
      sessionStorage.setItem("admin_last_active", Date.now().toString());
      const redirect = location.state?.from?.pathname || "/admin-tatto";
      navigate(redirect);
    } else {
      setError("Usuario o contraseña incorrecta");
    }
  };

  // 🔁 Monitorea actividad y reinicia temporizador
  useEffect(() => {
    const updateLastActive = () => {
      if (sessionStorage.getItem("admin_logged") === "true") {
        sessionStorage.setItem("admin_last_active", Date.now().toString());
      }
    };

    window.addEventListener("mousemove", updateLastActive);
    window.addEventListener("keydown", updateLastActive);
    window.addEventListener("click", updateLastActive);

    return () => {
      window.removeEventListener("mousemove", updateLastActive);
      window.removeEventListener("keydown", updateLastActive);
      window.removeEventListener("click", updateLastActive);
    };
  }, []);

  return (
    <div className="admin--wrapper">
      <form onSubmit={handleSubmit} className="formulario-container">
        <h2>Panel Admin</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-6 rounded transition"
          type="submit"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
