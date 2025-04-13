// admin-sheets.ts

const CAMPOS_URL = import.meta.env.VITE_SHEETS_CAMPOS_URL;
const CODIGOS_URL = import.meta.env.VITE_SHEETS_CODIGOS_URL;
const REGISTRO_URL = import.meta.env.VITE_SHEETS_REGISTRO_URL;

// ----- CAMPOS -----
export const getCampos = async () => {
  const res = await fetch(CAMPOS_URL);
  return res.json();
};

export const addCampo = async (campo: {
  nombre: string;
  label: string;
  tipo: string;
  requerido: string | boolean;
}) => {
  const params = new URLSearchParams();
  params.append("tipo", "campos");
  params.append("nombre", campo.nombre);
  params.append("label", campo.label);
  params.append("tipo", campo.tipo);
  params.append("requerido", campo.requerido.toString());

  const res = await fetch(CAMPOS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  return res.json();
};

export const deleteCampo = async (index: number) => {
  const res = await fetch(`${CAMPOS_URL}?tipo=campos&index=${index}`, {
    method: "DELETE",
  });
  return res.json();
};

// ----- CÓDIGOS -----
export const getCodigos = async () => {
  const res = await fetch(CODIGOS_URL);
  return res.json();
};

export const addCodigo = async (codigo: { codigo: string }) => {
  const params = new URLSearchParams();
  params.append("tipo", "codigos");
  params.append("codigo", codigo.codigo);

  const res = await fetch(CODIGOS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  return res.json();
};

export const deleteCodigo = async (index: number) => {
  const res = await fetch(`${CODIGOS_URL}?tipo=codigos&index=${index}`, {
    method: "DELETE",
  });
  return res.json();
};

// ----- REGISTROS -----
export const getRegistros = async () => {
  const res = await fetch(REGISTRO_URL);
  return res.json();
};

export const deleteRegistro = async (index: number) => {
  const res = await fetch(`${REGISTRO_URL}?tipo=registro&index=${index}`, {
    method: "DELETE",
  });
  return res.json();
};
