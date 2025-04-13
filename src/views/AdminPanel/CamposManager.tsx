import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCampos, addCampo, deleteCampo } from "../../services/admin-sheets";

interface Campo {
  nombre: string;
  label: string;
  tipo: string;
  requerido: boolean | string;
}

export default function CamposManager() {
  const [campos, setCampos] = useState<Campo[]>([]);
  const [nuevoCampo, setNuevoCampo] = useState<Campo>({
    nombre: "",
    label: "",
    tipo: "",
    requerido: "FALSE",
  });

  useEffect(() => {
    cargarCampos();
  }, []);

  const cargarCampos = async () => {
    try {
      const response = await getCampos();
      const data = Array.isArray(response)
        ? response
        : Array.isArray(response.campos)
        ? response.campos
        : [];

      setCampos(data);
    } catch (err) {
      console.error("Error al cargar campos:", err);
      Swal.fire("Error", "No se pudieron cargar los campos", "error");
    }
  };

  const agregarCampo = async () => {
    const { nombre, label, tipo } = nuevoCampo;

    if (!nombre || !label || !tipo) {
      Swal.fire("Completa todos los campos", "", "warning");
      return;
    }

    try {
      const resultado = await addCampo({
        ...nuevoCampo,
        requerido: nuevoCampo.requerido === "TRUE" || nuevoCampo.requerido === true,
      });

      if (resultado.success) {
        Swal.fire("Agregado", "Campo guardado en Google Sheets", "success");
        setNuevoCampo({ nombre: "", label: "", tipo: "", requerido: "FALSE" });
        cargarCampos();
      } else {
        Swal.fire("Error", "No se pudo guardar el campo", "error");
      }
    } catch (err) {
      console.error("Error al guardar:", err);
      Swal.fire("Error", "No se pudo guardar el campo", "error");
    }
  };

  const eliminarCampo = async (index: number) => {
    Swal.fire({
      title: "¿Eliminar campo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#d33",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const resultado = await deleteCampo(index);
          if (resultado.success) {
            Swal.fire("Eliminado", "Campo eliminado", "success");
            cargarCampos();
          } else {
            Swal.fire("Error", "No se pudo eliminar el campo", "error");
          }
        } catch (err) {
          console.error("Error al eliminar:", err);
          Swal.fire("Error", "No se pudo eliminar el campo", "error");
        }
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNuevoCampo({ ...nuevoCampo, [name]: value });
  };

  return (
    <div className="space-y-6">
      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Label</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Requerido</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {campos.map((campo, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{campo.nombre}</td>
              <td className="p-2">{campo.label}</td>
              <td className="p-2">{campo.tipo}</td>
              <td className="p-2">{campo.requerido === true || campo.requerido === "TRUE" ? "Sí" : "No"}</td>
              <td className="p-2">
                <button
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                  onClick={() => eliminarCampo(i)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="nombre"
          className="border px-2 py-1 bg-white text-black"
          value={nuevoCampo.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="label"
          placeholder="label"
          className="border px-2 py-1 bg-white text-black"
          value={nuevoCampo.label}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="tipo"
          placeholder="tipo"
          className="border px-2 py-1 bg-white text-black"
          value={nuevoCampo.tipo}
          onChange={handleInputChange}
        />
        <select
          name="requerido"
          className="border px-2 py-1 bg-white text-black"
          value={nuevoCampo.requerido.toString()}
          onChange={handleInputChange}
        >
          <option value="TRUE">Requerido</option>
          <option value="FALSE">Opcional</option>
        </select>
      </div>

      <button
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        onClick={agregarCampo}
      >
        Agregar Campo
      </button>
    </div>
  );
}
