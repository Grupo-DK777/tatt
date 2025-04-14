import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ParticlesBackground } from "./components/ParticlesBackground";
import CodeInput from "./views/CodeInput/CodeInput";
import { Formulario } from "./views/Formulario/Formulario";
import { ErrorUsed } from "./views/ErrorUsed/ErrorUsed";
import { ErrorInvalid } from "./views/ErrorInvalid/ErrorInvalid";
import { Success } from "./views/Success/Success";
import AdminPanel from "./views/AdminPanel/AdminPanel";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import Guard from "./guards/Guard";

function App() {
  return (
    <Router>
      <ParticlesBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<CodeInput />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/error-usado" element={<ErrorUsed />} />
          <Route path="/error-invalido" element={<ErrorInvalid />} />
          <Route path="/success" element={<Success />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin-tatto/*"
            element={
              <Guard>
                <AdminPanel />
              </Guard>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
