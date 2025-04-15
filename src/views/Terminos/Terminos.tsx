import { FileText } from 'lucide-react';
import './Terminos.css';

export function Terminos() {
  return (
    <div className="terminos-page">
      <div className="terminos-container">
        <div className="terminos-box">
          <h1 className="terminos-title flex items-center justify-center gap-2 text-white">
            <FileText size={28} /> Términos y Condiciones
          </h1>
          <div className="terminos-content">
            <p>
              Al participar en esta campaña, aceptas que los datos suministrados serán utilizados únicamente con fines de validación.
              Nos reservamos el derecho de modificar estas condiciones en cualquier momento sin previo aviso.
            </p>
            <p>
              La redención de códigos está sujeta a disponibilidad. No se garantiza el canje de obsequios si el código ha sido
              previamente utilizado o si los datos suministrados son incorrectos.
            </p>
            <p>
              Al continuar, confirmas que has leído y aceptado completamente estos términos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
