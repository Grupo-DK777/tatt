export interface Campo {
    nombre: string
    label: string
    tipo: string
    requerido: boolean
  }
  
  export interface Registro {
    [key: string]: string
  }
  
  const CAMPOS_URL = import.meta.env.VITE_SHEETS_CAMPOS_URL
  const CODIGOS_URL = import.meta.env.VITE_SHEETS_CODIGOS_URL
  const REGISTRO_URL = import.meta.env.VITE_SHEETS_REGISTRO_URL
  
  // Obtener campos del formulario
  export async function getCampos(): Promise<Campo[]> {
    const res = await fetch(CAMPOS_URL)
    const data = await res.json()
  
    return data.map((campo: any) => ({
      nombre: campo.nombre,
      label: campo.label,
      tipo: campo.tipo,
      requerido: campo.requerido === 'TRUE'
    }))
  }
  
  // Obtener códigos y su estado de uso
  export async function getCodigos(): Promise<{ codigo: string; usado: boolean }[]> {
    const res = await fetch(CODIGOS_URL)
    const data = await res.json()
  
    return data.map((c: any) => ({
      codigo: c.codigo,
      usado: c.usado === 'TRUE'
    }))
  }
  
  // Registrar datos en la hoja de cálculo
  export async function registrarDatos(datos: Registro): Promise<boolean> {
    const res = await fetch(REGISTRO_URL, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    const respuesta = await res.json()
    return respuesta.status === 'ok'
  }
  