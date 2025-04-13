import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCodigos, addCodigo, deleteCodigo } from "../../services/admin-sheets";

export default function CodigosManager() {
  const [codigos, setCodigos] = useState<any[]>([]);
  const [nuevoCodigo, setNuevoCodigo] = useState("");

  useEffect(() => {
    cargarCodigos();
  }, []);

  const cargarCodigos = async () => {
    const response = await getCodigos();
    console.log("Códigos cargados:", response);

    const data = Array.isArray(response)
      ? response
      : Array.isArray(response.codigos)
      ? response.codigos
      : [];

    setCodigos(data);
  };

  const agregarCodigo = async () => {
    if (!nuevoCodigo) {
      Swal.fire("Campo vacío", "Debes escribir un código", "warning");
      return;
    }

    try {
      await addCodigo({ codigo: nuevoCodigo });
      Swal.fire("Agregado", "Código guardado en Google Sheets", "success");
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
          Swal.fire("Eliminado", "Código eliminado de Google Sheets", "success");
          cargarCodigos();
        } catch {
          Swal.fire("Error", "No se pudo eliminar el código", "error");
        }
      }
    });
  };

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {codigos.map((c, i) => (
          <li key={i} className="flex justify-between border p-2">
            <span>{c.codigo}</span>
            <button
              className="text-red-600"
              onClick={() => eliminarCodigo(i)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          className="border px-2 py-1 bg-white text-black"
          placeholder="Nuevo código"
          value={nuevoCodigo}
          onChange={(e) => setNuevoCodigo(e.target.value)}
        />
        <button
          onClick={agregarCodigo}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
