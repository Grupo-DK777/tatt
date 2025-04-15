// src/components/TermsModal/TermsModal.tsx
import { useEffect } from 'react';
import './TermsModal.css';

interface TermsModalProps {
  onAccept: () => void;
}

export default function TermsModal({ onAccept }: TermsModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="terms-modal-overlay">
      <div className="terms-modal-box animate-fadeIn">
        <h2 className="terms-modal-title">📄 Términos y Condiciones</h2>
        <div className="terms-modal-content">
          <p>
            Al participar en esta campaña, el usuario acepta que esta plataforma ha sido desarrollada para gestionar la entrega de cupones de descuento exclusivos. Cada código ingresado será validado automáticamente por el sistema, y su redención está condicionada al cumplimiento de los pasos indicados.
          </p>
          <p>
            Una vez aprobado el código, el usuario deberá completar un formulario con datos personales válidos, los cuales serán revisados por nuestro equipo para verificar su autenticidad y correspondencia con las condiciones de la campaña.
          </p>
          <p>
            La entrega del cupón está sujeta a:
          </p>
          <ul className="list-disc pl-5 text-sm text-white">
            <li>El uso legítimo de un código emitido oficialmente por nuestra plataforma.</li>
            <li>El diligenciamiento completo y correcto del formulario.</li>
            <li>La validación satisfactoria de los datos registrados.</li>
          </ul>
          <p className="mt-4">
            La confirmación del cupón será enviada a través de <strong>WhatsApp</strong> una vez se hayan verificado los datos suministrados. El tiempo estimado de entrega puede ser de hasta <strong>24 horas hábiles</strong>, dependiendo del volumen de registros y del proceso de validación.
          </p>
          <p>
            Nos reservamos el derecho de rechazar formularios con información incorrecta, incoherente o duplicada. La disponibilidad de cupones puede estar sujeta a límites establecidos por la campaña y podrá modificarse sin previo aviso.
          </p>
          <p>
            Al continuar, el usuario declara haber leído, comprendido y aceptado completamente estos términos y condiciones.
          </p>
        </div>
        <button className="terms-modal-button" onClick={onAccept}>
          Aceptar y continuar
        </button>
      </div>
    </div>
  );
}
