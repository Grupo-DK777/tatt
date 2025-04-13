import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white w-full" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="mt-4 space-y-2">
              <p>Email: info@empresa.com</p>
              <p>Teléfono: +57 300 123 4567</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Síguenos</h3>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Horario</h3>
            <div className="mt-4 space-y-2">
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p>Sábados: 9:00 AM - 1:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {currentYear} Grupo Soluciones DK S.A.S. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}