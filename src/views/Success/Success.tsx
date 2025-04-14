import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Success.css';
import { ROUTES } from '@/routes'; // ← usamos rutas centralizadas

export function Success() {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    // Si no hay estado (state), redirigir al ingreso del código
    if (!state?.codigo || !state?.instagram) {
      navigate(ROUTES.HOME, { replace: true });
    }

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(interval); // Detener el temporizador al llegar a 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state, navigate]);

  const handleRedirect = () => {
    const mensaje = `Hola , he redimido mi código : *${state.codigo}*.y cumplí con los requisitos y mi usuario de Instagram es: *${state.instagram}*. ` +
                    `¡Gracias por la oportunidad!`;
    const url = `https://wa.me/573238465382?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    navigate(ROUTES.HOME, { replace: true }); // ← usamos la ruta centralizada
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
      <div className="bg-[#1c1b2a]/80 p-8 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
        <div className="success-icon">🎉</div>
        <h2 className="success-title">¡Registro exitoso!</h2>
        <p className="success-text">
          Tu registro se completó con éxito.
          <br />
          Presiona el botón para reclamar tu regalo en WhatsApp.
        </p>
        <p className="success-countdown">
          Cuenta regresiva: <span className="green">{seconds}</span> segundos
        </p>
        <button className="success-button" onClick={handleRedirect}>
          Ir a WhatsApp 🎁
        </button>
      </div>
    </div>
  );
}
