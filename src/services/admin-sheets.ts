const BASE_SHEETS_URL = import.meta.env.VITE_SHEETS_BASE_URL;

// ----- CAMPOS -----
export const getCampos = async () => {
  const res = await fetch(`${BASE_SHEETS_URL}?tipo=campos`);
  return res.json();
};

export const addCampo = async (campo: { nombre: string; label: string; tipo: string; requerido: string | boolean }) => {
  const params = new URLSearchParams();
  params.append("tipo", "campos");
  params.append("modo", "agregar");
  params.append("nombre", campo.nombre);
  params.append("label", campo.label);
  params.append("tipo_campo", campo.tipo);
  params.append("tipo_input", campo.tipo);
  params.append("requerido", campo.requerido.toString().toUpperCase());

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

// ✅ NUEVO: importar lista completa de códigos desde Excel
export const importarCodigosDesdeExcel = async (codigos: string[]) => {
  const params = new URLSearchParams();
  params.append("tipo", "codigos");
  params.append("modo", "importar");
  params.append("lista", JSON.stringify(codigos));

  const res = await fetch(BASE_SHEETS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
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
