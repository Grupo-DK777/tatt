import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorInvalid.css';
import { ROUTES } from '@/routes'; // ← rutas centralizadas

export function ErrorInvalid() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (count === 0) {
      navigate(ROUTES.HOME); // ← reemplazo de "/"
      return;
    }

    const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
      <div className="bg-[#1c1b2a]/80 p-8 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
        <div className="text-3xl text-red-500 mb-2">❌</div>
        <h1 className="text-xl font-bold text-white mb-4">Código no válido</h1>
        <p className="text-white text-sm mb-4">
          Serás redirigido en <strong className="text-yellow-500">{count}</strong> segundos o puedes regresar ahora.
        </p>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded transition"
          onClick={() => navigate(ROUTES.HOME)} // ← reemplazo del botón
        >
          Volver
        </button>
      </div>
    </div>
  );
}
