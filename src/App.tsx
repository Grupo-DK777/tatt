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

function App() {
  return (
    <Router>
      <ParticlesBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Routes>
          {/* Vista del formulario sin footer */}
          <Route
            path="/form"
            element={
              <Layout excludeFooter>
                <Formulario />
              </Layout>
            }
          />

          {/* Vistas públicas con footer */}
          <Route
            path="/"
            element={
              <Layout>
                <CodeInput />
              </Layout>
            }
          />
          <Route
            path="/error-used"
            element={
              <Layout>
                <ErrorUsed />
              </Layout>
            }
          />
          <Route
            path="/error-invalid"
            element={
              <Layout>
                <ErrorInvalid />
              </Layout>
            }
          />
          <Route
            path="/success"
            element={
              <Layout>
                <Success />
              </Layout>
            }
          />

          {/* Vista de login */}
          <Route
            path="/admin-login"
            element={
              <Layout excludeFooter>
                <AdminLogin />
              </Layout>
            }
          />

          {/* Ruta protegida con Guard */}
          <Route
            path="/admin-tatto"
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
