import React, { useState, useEffect } from "react";
import {
  obtenerEspecialidades,
  crearEspecialidad,
  eliminarEspecialidad,
} from "../api/Especialidades";
import "./Especialidades.css";

const initialForm = {
  nombre: "",
  descripcion: "",
};

function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState(initialForm);

  const cargarEspecialidades = async () => {
    try {
      const data = await obtenerEspecialidades();
      setEspecialidades(data);
    } catch (error) {
      console.error("Error al cargar especialidades", error);
    }
  };

  useEffect(() => {
    cargarEspecialidades();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearEspecialidad(form);
      setForm(initialForm);
      cargarEspecialidades();
    } catch (error) {
      console.error("Error al guardar", error);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarEspecialidad(id);
      cargarEspecialidades();
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  return (
    <div className="esp-container">
      <aside className="esp-sidebar">Sidebar</aside>
      <div className="esp-content">
        <nav className="esp-navbar">Navbar</nav>

        <div className="esp-formulario">
          <h2>Registrar Especialidad</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <textarea
              name="descripcion"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Guardar</button>
          </form>
        </div>

        <div className="esp-tabla">
          <h2>Especialidades Registradas</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {especialidades.map((esp) => (
                <tr key={esp.idEspecialidad}>
                  <td>{esp.idEspecialidad}</td>
                  <td>{esp.nombre}</td>
                  <td>{esp.descripcion}</td>
                  <td>
                    <button
                      className="esp-eliminar"
                      onClick={() => handleEliminar(esp.idEspecialidad)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {especialidades.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No hay especialidades registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Especialidades;
