import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getRegistros, deleteRegistro } from "../../services/admin-sheets";
import "./AdminTables.css";

export default function RegistrosManager() {
  const [registros, setRegistros] = useState<any[]>([]);
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = async () => {
    const response = await getRegistros();
    const data = Array.isArray(response)
      ? response
      : Array.isArray(response.registro)
      ? response.registro
      : [];

    setRegistros(data);
  };

  const eliminarRegistro = async (index: number) => {
    Swal.fire({
      title: "¿Eliminar registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await deleteRegistro(index);
          Swal.fire("Eliminado", "Registro eliminado", "success");
          cargarRegistros();
        } catch {
          Swal.fire("Error", "No se pudo eliminar el registro", "error");
        }
      }
    });
  };

  const totalPaginas = Math.ceil(registros.length / porPagina);
  const registrosPaginados = registros.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  const generarRangoPaginado = () => {
    const paginas: (number | "...")[] = [];
    if (totalPaginas <= 5) {
      for (let i = 1; i <= totalPaginas; i++) paginas.push(i);
    } else {
      paginas.push(1);
      if (pagina > 3) paginas.push("...");
      for (
        let i = Math.max(2, pagina - 1);
        i <= Math.min(totalPaginas - 1, pagina + 1);
        i++
      ) {
        paginas.push(i);
      }
      if (pagina < totalPaginas - 2) paginas.push("...");
      paginas.push(totalPaginas);
    }
    return paginas;
  };

  return (
    <div className="tabla-wrapper">
      <table className="tabla-admin">
        <thead>
          <tr>
            {registros[0] &&
              Object.keys(registros[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registrosPaginados.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{String(val)}</td>
              ))}
              <td>
                <button
                  className="boton-eliminar"
                  onClick={() =>
                    eliminarRegistro((pagina - 1) * porPagina + i)
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación Mejorada */}
      {totalPaginas > 1 && (
        <div className="pagination">
          <button
            disabled={pagina === 1}
            onClick={() => setPagina(pagina - 1)}
          >
            ⬅️
          </button>

          {generarRangoPaginado().map((num, i) =>
            num === "..." ? (
              <span key={i} style={{ padding: "0 8px" }}>...</span>
            ) : (
              <button
                key={i}
                className={`page-button ${
                  pagina === num ? "bg-indigo-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => setPagina(Number(num))}
              >
                {num}
              </button>
            )
          )}

          <button
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(pagina + 1)}
          >
            ➡️
          </button>
        </div>
      )}
    </div>
  );
}
