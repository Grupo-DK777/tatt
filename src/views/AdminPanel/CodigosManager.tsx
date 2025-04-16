import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCodigos, addCodigo, deleteCodigo } from "../../services/admin-sheets";
import ImportarExcel from "@/components/ImportarExcel/ImportarExcel"; // ✅ nuevo import
import "./AdminTables.css";

export default function CodigosManager() {
  const [codigos, setCodigos] = useState<any[]>([]);
  const [nuevoCodigo, setNuevoCodigo] = useState("");
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

  useEffect(() => {
    cargarCodigos();
  }, []);

  const cargarCodigos = async () => {
    const response = await getCodigos();
    const data = Array.isArray(response)
      ? response
      : Array.isArray(response.codigos)
      ? response.codigos
      : [];
    setCodigos(data);
  };

  const agregarCodigo = async () => {
    if (!nuevoCodigo.trim()) {
      Swal.fire("Campo vacío", "Debes escribir un código", "warning");
      return;
    }

    try {
      await addCodigo({ codigo: nuevoCodigo });
      Swal.fire("Agregado", "Código guardado exitosamente", "success");
      setNuevoCodigo("");
      cargarCodigos();
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar el código", "error");
    }
  };

  const eliminarCodigo = async (index: number) => {
    Swal.fire({
      title: "¿Eliminar código?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await deleteCodigo(index);
          Swal.fire("Eliminado", "Código eliminado", "success");
          cargarCodigos();
        } catch {
          Swal.fire("Error", "No se pudo eliminar el código", "error");
        }
      }
    });
  };

  const totalPaginas = Math.ceil(codigos.length / porPagina);
  const codigosPaginados = codigos.slice((pagina - 1) * porPagina, pagina * porPagina);

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
    <div className="tabla-wrapper no-scroll">
      <div className="tabla-contenido">
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>Código</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {codigosPaginados.map((c, i) => (
              <tr key={i}>
                <td>{c.codigo}</td>
                <td>
                  <button
                    className="boton-eliminar"
                    onClick={() => eliminarCodigo((pagina - 1) * porPagina + i)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación moderna */}
        {totalPaginas > 1 && (
          <div className="pagination">
            <button
              className="naked-arrow"
              disabled={pagina === 1}
              onClick={() => setPagina(pagina - 1)}
            >
              ⬅️
            </button>

            {generarRangoPaginado().map((num, i) =>
              num === "..." ? (
                <span key={i} className="ellipsis">...</span>
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
              className="naked-arrow"
              disabled={pagina === totalPaginas}
              onClick={() => setPagina(pagina + 1)}
            >
              ➡️
            </button>
          </div>
        )}

        <div className="inputs-tabla">
          <input
            type="text"
            placeholder="Nuevo código"
            value={nuevoCodigo}
            onChange={(e) => setNuevoCodigo(e.target.value)}
          />
          <button className="boton-agregar" onClick={agregarCodigo}>
            Agregar
          </button>
        </div>

        {/* ✅ Sección de importar Excel */}
        <ImportarExcel />
      </div>
    </div>
  );
}
