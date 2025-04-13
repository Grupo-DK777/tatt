import { useState } from "react";
import CamposManager from "./CamposManager";
import CodigosManager from "./CodigosManager";
import RegistrosManager from "./RegistrosManager";
import "./AdminPanel.css";

export default function AdminPanel() {
  const [seccion, setSeccion] = useState<"campos" | "codigos" | "registros">("campos");

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Panel Admin</h2>
        <nav>
          <ul>
            <li><button onClick={() => setSeccion("campos")}>Campos</button></li>
            <li><button onClick={() => setSeccion("codigos")}>Códigos</button></li>
            <li><button onClick={() => setSeccion("registros")}>Registros</button></li>
          </ul>
        </nav>
      </aside>

      <main className="main-panel">
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
      </main>
    </div>
  );
}
