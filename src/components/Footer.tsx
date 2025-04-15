import { Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css'; // ← Importa el CSS externo

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
              <p>Email: info@empresa.com</p>
              <p>Teléfono: +57 300 123 4567</p>
            </div>
          </div>

          {/* Redes */}
          <div>
            <h3>Síguenos</h3>
            <div className="footer-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Horario */}
          <div>
            <h3>Horario</h3>
            <div className="footer-section">
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p>Sábados: 9:00 AM - 1:00 PM</p>
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
