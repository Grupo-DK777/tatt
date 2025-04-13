import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getRegistros, deleteRegistro } from "../../services/admin-sheets";

export default function RegistrosManager() {
  const [registros, setRegistros] = useState<any[]>([]);

  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = async () => {
    const response = await getRegistros();
    console.log("Registros cargados:", response);

    // Ajuste para leer `registro` (en singular)
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
          Swal.fire("Eliminado", "Registro eliminado de Google Sheets", "success");
          cargarRegistros();
        } catch {
          Swal.fire("Error", "No se pudo eliminar el registro", "error");
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            {registros[0] &&
              Object.keys(registros[0]).map((key) => (
                <th key={key} className="p-2 border">
                  {key}
                </th>
              ))}
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((row, i) => (
            <tr key={i} className="border-t">
              {Object.values(row).map((val, j) => (
                <td key={j} className="p-2 border">
                  {String(val)}
                </td>
              ))}
              <td className="p-2 border">
                <button
                  className="text-red-600"
                  onClick={() => eliminarRegistro(i)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
