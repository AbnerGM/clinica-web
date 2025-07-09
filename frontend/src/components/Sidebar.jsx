
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ user }) {
  return (
    <aside className="sidebar">
      <h2>Clínica Salud+</h2>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Inicio
          </NavLink>
        </li>

        {/* Links públicos */}
        <li>
          <NavLink to="/consultas" className={({ isActive }) => isActive ? "active" : ""}>
            Consultas
          </NavLink>
        </li>
        <li>
          <NavLink to="/recetas" className={({ isActive }) => isActive ? "active" : ""}>
            Recetas
          </NavLink>
        </li>
        <li>
          <NavLink to="/turnos" className={({ isActive }) => isActive ? "active" : ""}>
            Turnos
          </NavLink>
        </li>

        
        {user && (
          <>
            <li><NavLink to="/pacientes" className={({ isActive }) => isActive ? "active" : ""}>Pacientes</NavLink></li>
            <li><NavLink to="/medicos" className={({ isActive }) => isActive ? "active" : ""}>Médicos</NavLink></li>
            <li><NavLink to="/citas" className={({ isActive }) => isActive ? "active" : ""}>Citas</NavLink></li>
            <li><NavLink to="/historial" className={({ isActive }) => isActive ? "active" : ""}>Historial</NavLink></li>
            <li><NavLink to="/facturas" className={({ isActive }) => isActive ? "active" : ""}>Facturas</NavLink></li>
            <li><NavLink to="/inventario" className={({ isActive }) => isActive ? "active" : ""}>Inventario</NavLink></li>
            <li><NavLink to="/especialidades" className={({ isActive }) => isActive ? "active" : ""}>Especialidades</NavLink></li>
          </>
        )}
      </ul>
    </aside>
  );
}
