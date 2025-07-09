
import React from 'react';
import './Footer.css';  

export default function Footer() {
  return (
    <footer className="footer bg-primary text-white text-center py-4">
      <p className=" texto mb-0">
        &copy; {new Date().getFullYear()} Clínica Salud+. Todos los derechos reservados.
      </p>
    </footer>
  );
}
