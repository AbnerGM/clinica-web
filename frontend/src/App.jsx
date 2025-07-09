import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Pacientes from "./components/Pacientes";
import Medicos from "./components/Medicos";
import Citas from "./components/Citas";
import Consultas from "./components/Consultas";
import Historial from "./components/Historial";
import Facturas from "./components/Facturas";
import Inventario from "./components/Inventarios";
import Recetas from "./components/Recetas";
import Turnos from "./components/Turnos";
import Especialidades from "./components/Especialidades";
import Footer from "./components/Footer";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <BrowserRouter>
      <Navbar
        user={user}
        onLoginClick={() => setMostrarLogin(true)}
        onLogout={() => setUser(null)}
      />
      <Sidebar user={user} />
      <div className="app-layout">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            {/*  públicas */}
            <Route path="/consultas" element={<Consultas />} />
            <Route path="/recetas" element={<Recetas />} />
            <Route path="/turnos" element={<Turnos />} />

            {/* privadas */}
            {user && (
              <>
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path="/medicos" element={<Medicos />} />
                <Route path="/citas" element={<Citas />} />
                <Route path="/historial" element={<Historial />} />
                <Route path="/facturas" element={<Facturas />} />
                <Route path="/inventario" element={<Inventario />} />
                <Route path="/especialidades" element={<Especialidades />} />
              </>
            )}
          </Routes>
        </main>
      </div>

      {/* ACA PUSE EL BOTÓN FLOTANTE DE WHATSAPP */}
      <div className="whatsapp-wrapper">
        <a
          href="https://wa.me/+51912668865" 
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-fab"
          title="Contáctanos por WhatsApp"
        >
          <i className="bi bi-whatsapp"></i>
        </a>
      </div>

      <Footer />

      {/* Modal de login */}
      {mostrarLogin && (
        <div className="login-modal">
          <Login
            onLogin={(data) => {
              setUser(data);
              setMostrarLogin(false);
            }}
          />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
