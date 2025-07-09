import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, onLoginClick, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          Clínica Salud+
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className="nav-link"
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#servicios">Servicios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto">Contacto</a>
            </li>

            <li className="nav-item dropdown ms-3">
              {!user ? (
                <a className="nav-link" role="button" onClick={onLoginClick}>
                  Iniciar sesión
                </a>
              ) : (
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center gap-2 text-white"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>Hola, {user.username}</span>
                  <i className="bi bi-person-circle fs-4"></i>
                </a>
              )}
              {user && (
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <a className="dropdown-item" role="button" onClick={onLogout}>
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
