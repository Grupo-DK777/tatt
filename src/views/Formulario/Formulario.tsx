import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Formulario.css';
import { ROUTES } from '@/routes';

export function Formulario() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [campos, setCampos] = useState<string[]>([]);
  const [valores, setValores] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!state?.codigo) {
      navigate(ROUTES.HOME, { replace: true });
    }

    const fetchCampos = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_SHEETS_CAMPOS_URL);
        const data = await res.json();
        const nombresCampos = data.campos.map((c: any) => c.nombre);
        setCampos(nombresCampos);
      } catch (error) {
        console.error('Error al obtener los campos:', error);
      }
    };

    fetchCampos();
  }, [state, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const formularioCompleto =
    campos.length > 0 &&
    campos.every((campo) => {
      const valor = valores[campo];
      return typeof valor === 'string' && valor.trim().length > 0;
    });

  return (
    <div className="formulario-wrapper">
      <form onSubmit={handleSubmit} className="formulario-container">
        <h2 className="formulario-title flex items-center justify-center gap-2 text-white text-lg font-bold whitespace-nowrap">
          🎯 Completa tu registro
        </h2>
        {campos.map((campo) => (
          <input
            key={campo}
            name={campo}
            placeholder={campo}
            value={valores[campo] || ''}
            onChange={handleChange}
            required
          />
        ))}

        {formularioCompleto && (
          <button
            className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-6 rounded transition-opacity duration-500 opacity-100"
            type="submit"
          >
            Enviar
          </button>
        )}
      </form>
    </div>
  );
}
