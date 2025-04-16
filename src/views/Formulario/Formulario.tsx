import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Formulario.css';
import { ROUTES } from '@/routes';
import logo from '@/public/favicon.png';

interface Campo {
  nombre: string;
  label: string;
  tipo_input: string;
}

export function Formulario() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [campos, setCampos] = useState<Campo[]>([]);
  const [valores, setValores] = useState<{ [key: string]: string }>({});
  const [errores, setErrores] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!state?.codigo) {
      navigate(ROUTES.HOME, { replace: true });
    }

    const fetchCampos = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_SHEETS_CAMPOS_URL);
        const data = await res.json();
        const camposProcesados = Array.isArray(data.campos)
          ? data.campos.map((c: any) => ({
              nombre: c.nombre,
              label: c.label || c.nombre,
              tipo_input: c.tipo_input || 'text',
            }))
          : [];
        setCampos(camposProcesados);
      } catch (error) {
        console.error('Error al obtener los campos:', error);
      }
    };

    fetchCampos();
  }, [state, navigate]);

  const validarCampo = (campo: Campo, valor: string) => {
    switch (campo.tipo_input) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
      case 'number':
        return !isNaN(Number(valor));
      case 'tel':
        return /^[0-9+\-()\s]+$/.test(valor);
      case 'url':
        return /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(valor);
      default:
        return valor.trim().length > 0;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));

    const campo = campos.find(c => c.nombre === name);
    if (campo) {
      setErrores((prev) => ({
        ...prev,
        [name]: !validarCampo(campo, value)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación final
    const nuevosErrores: { [key: string]: boolean } = {};
    campos.forEach((campo) => {
      const valor = valores[campo.nombre] || '';
      nuevosErrores[campo.nombre] = !validarCampo(campo, valor);
    });

    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((err) => err === true);
    if (hayErrores) {
      alert('Por favor corrige los errores antes de enviar.');
      return;
    }

    const datos = {
      tipo: 'registro',
      codigo: state?.codigo || '',
      ...valores,
    };

    const body = new URLSearchParams(datos).toString();

    try {
      const res = await fetch(import.meta.env.VITE_SHEETS_REGISTRO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      const json = await res.json();
      if (json.success) {
        navigate(ROUTES.SUCCESS, {
          state: {
            codigo: datos.codigo,
            instagram: valores.instagram,
          },
          replace: true,
        });
      }
    } catch (error) {
      alert('Error al enviar.');
      console.error(error);
    }
  };

  return (
    <div className="formulario-wrapper">
      <form onSubmit={handleSubmit} className="formulario-container">
        <img src={logo} alt="Logo" className="codeinput-logo" />
        <h2 className="formulario-title flex items-center justify-center gap-2 text-white text-lg font-bold whitespace-nowrap">
          🎯 Completa tu registro
        </h2>

        {campos.map((campo) =>
          campo.tipo_input === 'textarea' ? (
            <textarea
              key={campo.nombre}
              name={campo.nombre}
              placeholder={campo.label}
              value={valores[campo.nombre] || ''}
              onChange={handleChange}
              required
              className={errores[campo.nombre] ? 'input-error' : ''}
            />
          ) : (
            <input
              key={campo.nombre}
              type={campo.tipo_input}
              name={campo.nombre}
              placeholder={campo.label}
              value={valores[campo.nombre] || ''}
              onChange={handleChange}
              required
              className={errores[campo.nombre] ? 'input-error' : ''}
            />
          )
        )}

        <button
          className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-6 rounded transition-opacity duration-500 opacity-100"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
