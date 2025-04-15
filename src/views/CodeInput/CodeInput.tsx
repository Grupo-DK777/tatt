import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/views/CodeInput/CodeInput.css';
import { ROUTES } from '@/routes';

const SHEET_URL = import.meta.env.VITE_SHEETS_CODIGOS_URL;

export default function CodeInput() {
  const [codigo, setCodigo] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorCodigo, setErrorCodigo] = useState('');
  const [errorCheckbox, setErrorCheckbox] = useState('');
  const navigate = useNavigate();

  const validateCode = async () => {
    let valid = true;

    if (!codigo.trim()) {
      setErrorCodigo('Por favor, ingresa tu código.');
      valid = false;
    } else {
      setErrorCodigo('');
    }

    if (!aceptaTerminos) {
      setErrorCheckbox('Debes aceptar los términos y condiciones.');
      valid = false;
    } else {
      setErrorCheckbox('');
    }

    if (!valid) return;

    setLoading(true);

    try {
      const res = await fetch(SHEET_URL);
      const data = await res.json();

      const input = codigo.trim().toUpperCase();
      const found = data.codigos.find(
        (c: any) => String(c.codigo).trim().toUpperCase() === input
      );

      if (!found) {
        navigate(ROUTES.ERROR_INVALID);
        return;
      }

      const isUsed = String(found.usado).trim().toLowerCase();
      if (isUsed === 'true' || isUsed === '1') {
        navigate(ROUTES.ERROR_USED);
        return;
      }

      navigate(ROUTES.FORM, { state: { codigo: input } });
    } catch (err) {
      console.error('Error al validar el código:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Enter') validateCode();
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [codigo, aceptaTerminos]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
      <div className="bg-[#1c1b2a]/80 p-8 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
        <h1 className="text-2xl font-semibold text-white text-center mb-4">🎁 Valida tu código</h1>

        <input
          type="text"
          className={`codeinput-input ${errorCodigo ? 'border border-red-500' : ''}`}
          placeholder="Ingresa Tu Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          disabled={loading}
        />
        {errorCodigo && (
          <p className="text-sm text-red-400 mt-1">{errorCodigo}</p>
        )}

        <label className="text-sm text-white mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={aceptaTerminos}
            onChange={() => setAceptaTerminos(!aceptaTerminos)}
            className={errorCheckbox ? 'outline outline-red-500' : ''}
          />
          <span>
            Acepto los{' '}
            <a
              href="/terminos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-500 transition no-underline"
            >
              términos y condiciones
            </a>
          </span>
        </label>
        {errorCheckbox && (
          <p className="text-sm text-red-400 mt-1">{errorCheckbox}</p>
        )}

        <button
          className="codeinput-button mt-4"
          onClick={validateCode}
          disabled={loading}
        >
          {loading ? 'Validando...' : 'Validar código'}
        </button>
      </div>
    </div>
  );
}
