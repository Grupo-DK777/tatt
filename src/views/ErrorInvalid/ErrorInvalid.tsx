import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ErrorInvalid.css';
import { ROUTES } from '@/routes';
import logo from '@/public/favicon.png';

export function ErrorInvalid() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔒 Protección contra acceso directo
  useEffect(() => {
    if (!location.state?.desdeValidacion) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [location, navigate]);

  // ⏱️ Cuenta regresiva para redirigir
  useEffect(() => {
    if (count === 0) {
      navigate(ROUTES.HOME);
      return;
    }

    const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
      <div className="bg-[#1c1b2a]/80 p-8 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
        <img 
          src={logo}  
          alt="Logo" 
          className="codeinput-logo"
        />
        <div className="text-3xl text-red-500 mb-2">❌</div>
        <h1 className="text-xl font-bold text-white mb-4">Código no válido</h1>
        <p className="text-white text-sm mb-4">
          Serás redirigido en <strong className="text-yellow-500">{count}</strong> segundos o puedes regresar ahora.
        </p>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded transition"
          onClick={() => navigate(ROUTES.HOME)}
        >
          Volver
        </button>
      </div>
    </div>
  );
}
