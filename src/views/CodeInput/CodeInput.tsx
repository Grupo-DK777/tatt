import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/views/CodeInput/CodeInput.css';
import { ROUTES } from '@/routes';
import TermsModal from '@/components/TermsModal/TermsModal';

const SHEET_URL = import.meta.env.VITE_SHEETS_CODIGOS_URL;

export default function CodeInput() {
  const [codigo, setCodigo] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorCodigo, setErrorCodigo] = useState('');
  const [errorCheckbox, setErrorCheckbox] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [totalCodigos, setTotalCodigos] = useState(0);
  const [codigosDisponibles, setCodigosDisponibles] = useState(0);

  const navigate = useNavigate();

  const fetchCodigos = async () => {
    try {
      const res = await fetch(SHEET_URL);
      const data = await res.json();
      const codigos = data.codigos;

      const disponibles = codigos.filter(
        (c: any) =>
          String(c.usado).trim().toLowerCase() !== 'true' &&
          String(c.usado).trim().toLowerCase() !== '1'
      );

      setTotalCodigos(codigos.length);
      setCodigosDisponibles(disponibles.length);
    } catch (err) {
      console.error('Error al obtener los códigos:', err);
    }
  };

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
    fetchCodigos();

    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Enter') validateCode();
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [codigo, aceptaTerminos]);

  const porcentajeUsados =
    totalCodigos > 0
      ? Math.round(((totalCodigos - codigosDisponibles) / totalCodigos) * 100)
      : 0;

  const getBarColorClass = () => {
    if (codigosDisponibles === 0) return 'barra-roja';
    if (porcentajeUsados >= 70) return 'barra-roja';
    if (porcentajeUsados >= 30) return 'barra-amarilla';
    return 'barra-verde';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
      <div className="bg-[#1c1b2a]/80 p-8 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">

        {/* ✅ Logo arriba del título */}
        <img src="/favicon.png" alt="Logo" className="codeinput-logo" />

        <h1 className="text-2xl font-semibold text-white text-center mb-4">
          🎁 Valida tu código
        </h1>

        <input
          type="text"
          className={`codeinput-input ${errorCodigo ? 'border border-red-500' : ''}`}
          placeholder="Ingresa Tu Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          disabled={loading}
        />
        {errorCodigo && <p className="text-sm text-red-400 mt-1">{errorCodigo}</p>}

        <label className="text-sm text-white mt-4 flex items-center gap-2 text-left">
          <input
            type="checkbox"
            checked={aceptaTerminos}
            onChange={() => setAceptaTerminos(!aceptaTerminos)}
            className={errorCheckbox ? 'outline outline-red-500' : ''}
          />
          <span>
            Acepto los{' '}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-yellow-400 hover:text-yellow-500 transition no-underline underline-offset-2"
            >
              términos y condiciones
            </button>
          </span>
        </label>
        {errorCheckbox && <p className="text-sm text-red-400 mt-1">{errorCheckbox}</p>}

        <button
          className="codeinput-button mt-4"
          onClick={validateCode}
          disabled={loading || codigosDisponibles === 0}
        >
          {codigosDisponibles === 0
            ? 'Sin disponibilidad'
            : loading
            ? 'Validando...'
            : 'Validar código'}
        </button>

        {/* Barra de porcentaje debajo */}
        <div className="mt-6 w-full text-sm text-left">
          <p className="mb-1 text-white">
            {codigosDisponibles === 0 ? (
              <span className="text-red-500 font-semibold">¡Sin códigos disponibles!</span>
            ) : (
              <>Disponibles: <span className="text-yellow-400">{codigosDisponibles}</span> de {totalCodigos} códigos</>
            )}
          </p>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${getBarColorClass()}`}
              style={{ width: `${porcentajeUsados}%` }}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <TermsModal
          onAccept={() => {
            setAceptaTerminos(true);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
