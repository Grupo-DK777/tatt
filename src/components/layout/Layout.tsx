import Footer from '../Footer';
import '../../styles/layout.css';

interface LayoutProps {
  children: React.ReactNode;
  excludeFooter?: boolean; // Propiedad opcional para excluir el footer
}

export default function Layout({ children, excludeFooter }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Contenido principal */}
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>

      {/* Footer opcional */}
      {!excludeFooter && <Footer />}
    </div>
  );
}