import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ para navegación programática
import CamposManager from "./CamposManager";
import CodigosManager from "./CodigosManager";
import RegistrosManager from "./RegistrosManager";
import logo from "@/public/favicon.png";
import "./AdminPanel.css";
import { ROUTES } from "@/routes"; // ✅ importa rutas centralizadas

export default function AdminPanel() {
  const [seccion, setSeccion] = useState<"campos" | "codigos" | "registros">("campos");
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate(ROUTES.ADMIN_LOGIN); // ✅ redirige a /admin-login
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <img src={logo} alt="Logo" className="codeinput-logo" />
        <h2>Panel Admin</h2>
        <nav>
          <ul>
            <li>
              <button onClick={() => setSeccion("campos")} className={seccion === "campos" ? "active" : ""}>
                Campos
              </button>
            </li>
            <li>
              <button onClick={() => setSeccion("codigos")} className={seccion === "codigos" ? "active" : ""}>
                Códigos
              </button>
            </li>
            <li>
              <button onClick={() => setSeccion("registros")} className={seccion === "registros" ? "active" : ""}>
                Registros
              </button>
            </li>
          </ul>
        </nav>

        <div className="logout-section">
          <button className="logout-button" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="main-panel">
        <div className="panel-content">
          {seccion === "campos" && (
            <>
              <h3>Gestión de Campos</h3>
              <CamposManager />
            </>
          )}
          {seccion === "codigos" && (
            <>
              <h3>Gestión de Códigos</h3>
              <CodigosManager />
            </>
          )}
          {seccion === "registros" && (
            <>
              <h3>Gestión de Registros</h3>
              <RegistrosManager />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
