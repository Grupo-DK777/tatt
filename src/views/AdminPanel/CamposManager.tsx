import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCampos, addCampo, deleteCampo } from "../../services/admin-sheets";
import "./AdminTables.css";

interface Campo {
  nombre: string;
  label: string;
  tipo: string;
  requerido: boolean | string;
  guardar_en_registro?: boolean;
}

export default function CamposManager() {
  const [campos, setCampos] = useState<Campo[]>([]);
  const [nuevoCampo, setNuevoCampo] = useState<Campo>({
    nombre: "",
    label: "",
    tipo: "",
    requerido: "FALSE",
    guardar_en_registro: true,
  });

  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;

    if (type === "checkbox") {
      setNuevoCampo((prev) => ({ ...prev, [name]: checked }));
    } else {
      setNuevoCampo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const agregarCampo = async () => {
    const { nombre, label, tipo, requerido, guardar_en_registro } = nuevoCampo;

    if (!nombre.trim() || !label.trim() || !tipo) {
      Swal.fire("Error", "Completa todos los campos correctamente", "warning");
      return;
    }

    const existe = campos.some((c) => c.nombre === nombre.trim());
    if (existe) {
      Swal.fire("Error", "Ya existe un campo con ese nombre", "error");
      return;
    }

    try {
      const resultado = await addCampo({
        nombre: nombre.trim(),
        label: label.trim(),
        tipo,
        requerido,
        guardar_en_registro: guardar_en_registro ?? true,
      });

      if (resultado.success) {
        await cargarCampos();
        setNuevoCampo({
          nombre: "",
          label: "",
          tipo: "",
          requerido: "FALSE",
          guardar_en_registro: true,
        });
        Swal.fire("Éxito", "Campo agregado correctamente", "success");
      } else {
        Swal.fire("Error", "No se pudo guardar el campo", "error");
      }
    } catch (err) {
      console.error("Error al guardar:", err);
      Swal.fire("Error", "Ocurrió un error al guardar el campo", "error");
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

  const totalPaginas = Math.ceil(campos.length / porPagina);
  const camposPaginados = campos.slice(
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
            <th>Nombre</th>
            <th>Label</th>
            <th>Tipo</th>
            <th>Requerido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {camposPaginados.map((campo, i) => (
            <tr key={i}>
              <td>{campo.nombre}</td>
              <td>{campo.label}</td>
              <td>{campo.tipo}</td>
              <td>{campo.requerido === true || campo.requerido === "TRUE" ? "Sí" : "No"}</td>
              <td>
                <button
                  className="boton-eliminar"
                  onClick={() =>
                    eliminarCampo((pagina - 1) * porPagina + i)
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
          name="nombre"
          placeholder="Nombre"
          value={nuevoCampo.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="label"
          placeholder="Label"
          value={nuevoCampo.label}
          onChange={handleInputChange}
        />
        <select
          name="tipo"
          value={nuevoCampo.tipo}
          onChange={handleInputChange}
        >
          <option value="">Selecciona tipo</option>
          <option value="text">Texto</option>
          <option value="email">Correo electrónico</option>
          <option value="number">Número</option>
          <option value="tel">Teléfono</option>
          <option value="date">Fecha</option>
          <option value="textarea">Área de texto</option>
          <option value="url">URL</option>
          <option value="checkbox">Checkbox</option>
        </select>
        <select
          name="requerido"
          value={nuevoCampo.requerido.toString()}
          onChange={handleInputChange}
        >
          <option value="TRUE">Requerido</option>
          <option value="FALSE">Opcional</option>
        </select>
        <div className="flex items-center gap-2 mt-2 ml-4">
          <label htmlFor="guardar_en_registro" className="text-sm text-black whitespace-nowrap" title="Si se marca, este campo aparecerá en la hoja de registros.">
            Incluir en registros
          </label>
          <input
            id="guardar_en_registro"
            type="checkbox"
            name="guardar_en_registro"
            checked={nuevoCampo.guardar_en_registro ?? true}
            onChange={handleInputChange}
            className="w-4 h-4 accent-green-500"
          />
        </div>
      </div>

      <button className="boton-agregar" onClick={agregarCampo}>
        Agregar Campo
      </button>
    </div>
  );
}
