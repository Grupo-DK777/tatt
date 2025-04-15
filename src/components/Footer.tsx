import './Footer.css';
import { Facebook, Instagram, X } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Contacto */}
          <div>
            <h3>Contacto</h3>
            <div className="footer-section">
              <p>Email: caicepipo@gmail.com</p>
              <p>Teléfono: <a href="https://wa.me/573238465382" target="_blank" rel="noopener noreferrer">+57 323 846 5382</a></p>
            </div>
          </div>

          {/* Redes sociales SOLO íconos */}
          <div>
            <h3>Síguenos</h3>
            <div className="footer-icons">
              <a href="https://www.facebook.com/wilfrido.caicedo.73" target="_blank" rel="noopener noreferrer">
                <Facebook className="footer-icon" />
              </a>
              <a href="https://instagram.com/willart0921" target="_blank" rel="noopener noreferrer">
                <Instagram className="footer-icon" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="X (antes Twitter)">
                <X className="footer-icon" />
              </a>
            </div>
          </div>

          {/* Horario */}
          <div>
            <h3>Horario</h3>
            <div className="footer-section">
              <p>Lunes a Domingo:</p>
              <p>9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Grupo Soluciones DK S.A.S. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
