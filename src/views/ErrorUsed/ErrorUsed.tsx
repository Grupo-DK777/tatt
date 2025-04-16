import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ErrorUsed.css';
import { ROUTES } from '@/routes';
import logo from '@/public/favicon.png';

export function ErrorUsed() {
  const navigate = useNavigate();
  const location = useLocation();
  const [seconds, setSeconds] = useState(5);

  // 🔒 Protege la vista si no viene desde validación
  useEffect(() => {
    if (!location.state?.desdeValidacion) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          navigate(ROUTES.HOME);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
      <div className="bg-[#1c1b2a]/80 p-8 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
        <img 
          src={logo}  
          alt="Logo" 
          className="codeinput-logo"
        />
        <div className="text-yellow-400 text-4xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Este código ya fue usado</h1>
        <p className="mb-4">
          Serás redirigido en <span className="yellow">{seconds}</span> segundos o puedes regresar ahora.
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
