// admin-sheets.ts

const BASE_SHEETS_URL = import.meta.env.VITE_SHEETS_BASE_URL;

// ----- CAMPOS -----
export const getCampos = async () => {
  const res = await fetch(`${BASE_SHEETS_URL}?tipo=campos`);
  return res.json();
};

// En la función addCampo, cambia CAMPOS_URl por BASE_SHEETS_URL
export const addCampo = async (campo: { nombre: string; label: string; tipo: string; requerido: string | boolean }) => {
  const params = new URLSearchParams();
  params.append("tipo", "campos");
  params.append("modo", "agregar");
  params.append("nombre", campo.nombre);
  params.append("label", campo.label);
  params.append("tipo_campo", campo.tipo); // Cambiamos a tipo_campo
  params.append("tipo_input", campo.tipo); // Mantenemos tipo_input también por compatibilidad
  params.append("requerido", campo.requerido.toString().toUpperCase());

  // Log para debug
  console.log('Params enviados:', {
    tipo: "campos",
    modo: "agregar",
    nombre: campo.nombre,
    label: campo.label,
    tipo_campo: campo.tipo,
    tipo_input: campo.tipo,
    requerido: campo.requerido.toString().toUpperCase()
  });

  const res = await fetch(BASE_SHEETS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await res.json();
  console.log('Respuesta del servidor:', data);
  return data;
};

export const deleteCampo = async (index: number) => {
  const params = new URLSearchParams();
  params.append("tipo", "campos");
  params.append("modo", "eliminar");
  params.append("index", index.toString());

  const res = await fetch(BASE_SHEETS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  return res.json();
};

// ----- CÓDIGOS -----
export const getCodigos = async () => {
  const res = await fetch(`${BASE_SHEETS_URL}?tipo=codigos`);
  return res.json();
};

export const addCodigo = async (codigo: { codigo: string }) => {
  const params = new URLSearchParams();
  params.append("tipo", "codigos");
  params.append("codigo", codigo.codigo);

  const res = await fetch(BASE_SHEETS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  return res.json();
};

export const deleteCodigo = async (index: number) => {
  const params = new URLSearchParams();
  params.append("tipo", "codigos");
  params.append("modo", "eliminar");
  params.append("index", index.toString());

  const res = await fetch(BASE_SHEETS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  return res.json();
};

// ----- REGISTROS -----
export const getRegistros = async () => {
  const res = await fetch(`${BASE_SHEETS_URL}?tipo=registro`);
  return res.json();
};

export const deleteRegistro = async (index: number) => {
  const params = new URLSearchParams();
  params.append("tipo", "registro");
  params.append("modo", "eliminar");
  params.append("index", index.toString());

  const res = await fetch(BASE_SHEETS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  return res.json();
};
