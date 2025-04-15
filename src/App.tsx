import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeInput from "./views/CodeInput/CodeInput";
import { Formulario } from "./views/Formulario/Formulario";
import { ErrorUsed } from "./views/ErrorUsed/ErrorUsed";
import { ErrorInvalid } from "./views/ErrorInvalid/ErrorInvalid";
import { Success } from "./views/Success/Success";
import AdminPanel from "./views/AdminPanel/AdminPanel";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import { ParticlesBackground } from "./components/ParticlesBackground";
import Guard from "./guards/Guard";
import { ROUTES } from "./routes";
import { Terminos } from "./views/Terminos/Terminos";
import Footer from "./components/Footer"; // ← Se importa solo una vez

function App() {
  return (
    <Router>
      <ParticlesBackground />
      <div className="min-h-screen flex flex-col justify-between relative z-10">
        <main className="flex-grow flex items-center justify-center p-4">
          <Routes>
            <Route path={ROUTES.FORM} element={<Formulario />} />
            <Route path={ROUTES.HOME} element={<CodeInput />} />
            <Route path={ROUTES.ERROR_USED} element={<ErrorUsed />} />
            <Route path={ROUTES.ERROR_INVALID} element={<ErrorInvalid />} />
            <Route path={ROUTES.SUCCESS} element={<Success />} />
            <Route path={ROUTES.TERMINOS} element={<Terminos />} />
            <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
            <Route
              path={ROUTES.ADMIN_PANEL}
              element={
                <Guard>
                  <AdminPanel />
                </Guard>
              }
            />
          </Routes>
        </main>

        {/* Footer en TODAS las vistas */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
