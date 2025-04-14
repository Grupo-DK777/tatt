import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeInput from "./views/CodeInput/CodeInput";
import { Formulario } from "./views/Formulario/Formulario";
import { ErrorUsed } from "./views/ErrorUsed/ErrorUsed";
import { ErrorInvalid } from "./views/ErrorInvalid/ErrorInvalid";
import { Success } from "./views/Success/Success";
import AdminPanel from "./views/AdminPanel/AdminPanel";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import { ParticlesBackground } from "./components/ParticlesBackground";
import Layout from "./components/layout/Layout";
import Guard from "./guards/Guard";
import { ROUTES } from "./routes"; // ← Importamos las rutas centralizadas

function App() {
  return (
    <Router>
      <ParticlesBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Routes>
          {/* Vista del formulario sin footer */}
          <Route
            path={ROUTES.FORM}
            element={
              <Layout excludeFooter>
                <Formulario />
              </Layout>
            }
          />

          {/* Vistas públicas con footer */}
          <Route
            path={ROUTES.HOME}
            element={
              <Layout>
                <CodeInput />
              </Layout>
            }
          />
          <Route
            path={ROUTES.ERROR_USED}
            element={
              <Layout>
                <ErrorUsed />
              </Layout>
            }
          />
          <Route
            path={ROUTES.ERROR_INVALID}
            element={
              <Layout>
                <ErrorInvalid />
              </Layout>
            }
          />
          <Route
            path={ROUTES.SUCCESS}
            element={
              <Layout>
                <Success />
              </Layout>
            }
          />

          {/* Vista de login */}
          <Route
            path={ROUTES.ADMIN_LOGIN}
            element={
              <Layout excludeFooter>
                <AdminLogin />
              </Layout>
            }
          />

          {/* Ruta protegida con Guard */}
          <Route
            path={ROUTES.ADMIN_PANEL}
            element={
              <Guard>
                <Layout excludeFooter>
                  <AdminPanel />
                </Layout>
              </Guard>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
