import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getRegistros, deleteRegistro } from "../../services/admin-sheets";
import * as XLSX from "xlsx";
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

  const exportarXLSX = () => {
    // Excluir el campo 'timestamp' al exportar
    const registrosSinTimestamp = registros.map(({ timestamp, ...rest }) => rest);

    if (registrosSinTimestamp.length === 0) {
      Swal.fire({
        title: "Sin registros",
        text: "No hay registros disponibles para exportar.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    Swal.fire({
      title: "¿Exportar a Excel?",
      html: `Se exportarán <b>${registrosSinTimestamp.length}</b> registros sin el campo <code>timestamp</code>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "📥 Descargar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const ws = XLSX.utils.json_to_sheet(registrosSinTimestamp);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Registros");
        XLSX.writeFile(wb, "registros.xlsx");

        Swal.fire({
          title: "¡Descargado!",
          text: `Se exportaron correctamente ${registrosSinTimestamp.length} registros.`,
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
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
      <button className="boton-exportar" onClick={exportarXLSX}>
        📥 Exportar a Excel
      </button>

      <table className="tabla-admin">
        <thead>
          <tr>
            {registros[0] &&
              Object.keys(registros[0])
                .filter((key) => key !== "timestamp")
                .map((key) => <th key={key}>{key}</th>)}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registrosPaginados.map((row, i) => (
            <tr key={i}>
              {Object.entries(row)
                .filter(([key]) => key !== "timestamp")
                .map(([_, val], j) => (
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

      {/* Paginación */}
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
              <span key={i} style={{ padding: "0 8px" }}>
                ...
              </span>
            ) : (
              <button
                key={i}
                className={`page-button ${
                  pagina === num
                    ? "bg-indigo-600"
                    : "bg-gray-700 hover:bg-gray-600"
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
