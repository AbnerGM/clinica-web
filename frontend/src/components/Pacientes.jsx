import React, { useEffect, useState } from "react";
import {
  obtenerPacientes,
  guardarPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../api/Pacientes";
import "./Pacientes.css";

const initialForm = {
  nombre: "",
  apellido: "",
  dni: "",
  direccion: "",
  telefono: "",
  correoElectronico: "",
  fechaNacimiento: "",
  genero: "",
};

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const cargarPacientes = async () => {
    try {
      const data = await obtenerPacientes();
      setPacientes(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const soloLetras = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
    manejarCambio(e);
  };


  const soloNumeros = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    manejarCambio(e);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        await actualizarPaciente(editId, formData);
        setEditId(null);
      } else {
        await guardarPaciente(formData);
      }
      setFormData(initialForm);
      cargarPacientes();
    } catch (e) {
      setError(e.message);
    }
  };

  const manejarEditar = (paciente) => {
    setFormData({
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      dni: paciente.dni,
      direccion: paciente.direccion,
      telefono: paciente.telefono,
      correoElectronico: paciente.correoElectronico,
      fechaNacimiento: paciente.fechaNacimiento?.split("T")[0] || "",
      genero: paciente.genero,
    });
    setEditId(paciente.idPaciente);
  };

  const manejarEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este paciente?")) return;
    try {
      await eliminarPaciente(id);
      cargarPacientes();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="pacientes-container">
      <div className="pacientes-card">
        <h2 className="pacientes-titulo">
          {editId ? "Editar Paciente" : "Agregue sus pacientes"}
        </h2>

        <form onSubmit={manejarSubmit} className="pacientes-form">
          {error && <p className="pacientes-error">{error}</p>}

          <input
            className="pacientes-input"
            name="nombre"
            value={formData.nombre}
            onInput={soloLetras}
            placeholder="Nombre"
            required
          />
          <input
            className="pacientes-input"
            name="apellido"
            value={formData.apellido}
            onInput={soloLetras}
            placeholder="Apellido"
            required
          />
          <input
            className="pacientes-input"
            name="dni"
            value={formData.dni}
            onInput={soloNumeros}
            placeholder="DNI"
            required
          />
          <input
            className="pacientes-input"
            name="direccion"
            value={formData.direccion}
            onChange={manejarCambio}
            placeholder="Dirección"
          />
          <input
            className="pacientes-input"
            name="telefono"
            value={formData.telefono}
            onInput={soloNumeros}
            placeholder="Teléfono"
          />
          <input
            className="pacientes-input"
            type="email"
            name="correoElectronico"
            value={formData.correoElectronico}
            onChange={manejarCambio}
            placeholder="Correo Electrónico"
          />
          <input
            className="pacientes-input"
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={manejarCambio}
          />
          <select
            className="pacientes-input"
            name="genero"
            value={formData.genero}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione género</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMENINO">Femenino</option>
            <option value="OTRO">Otro</option>
          </select>

          <div className="pacientes-button-group">
            <button type="submit" className="pacientes-boton">
              {editId ? "Actualizar" : "Agregar Paciente"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setFormData(initialForm);
                  setError("");
                }}
                className="pacientes-boton-cancelar"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="pacientes-card">
        <h2 className="pacientes-titulo">Lista de Pacientes</h2>
        {pacientes.length === 0 ? (
          <p>No hay pacientes registrados.</p>
        ) : (
          <table className="pacientes-tabla">
            <thead>
              <tr>
                <th className="pacientes-th">Nombre</th>
                <th className="pacientes-th">Apellido</th>
                <th className="pacientes-th">DNI</th>
                <th className="pacientes-th">Dirección</th>
                <th className="pacientes-th">Teléfono</th>
                <th className="pacientes-th">Correo</th>
                <th className="pacientes-th">Fecha Nac.</th>
                <th className="pacientes-th">Género</th>
                <th className="pacientes-th">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.idPaciente}>
                  <td className="pacientes-td">{p.nombre}</td>
                  <td className="pacientes-td">{p.apellido}</td>
                  <td className="pacientes-td">{p.dni}</td>
                  <td className="pacientes-td">{p.direccion}</td>
                  <td className="pacientes-td">{p.telefono}</td>
                  <td className="pacientes-td">{p.correoElectronico}</td>
                  <td className="pacientes-td">{p.fechaNacimiento?.split("T")[0]}</td>
                  <td className="pacientes-td">{p.genero}</td>
                  <td className="pacientes-td">
                    <button className="pacientes-boton-editar" onClick={() => manejarEditar(p)}>Editar</button>
                    <button className="pacientes-boton-eliminar" onClick={() => manejarEliminar(p.idPaciente)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Pacientes;
