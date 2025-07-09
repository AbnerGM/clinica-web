import React, { useEffect, useState } from "react";
import "./Historial.css";
import {
  obtenerHistoriales,
  buscarHistorialPorPaciente,
  crearHistorial,
  eliminarHistorial,
} from "../api/Historial";
import { obtenerPacientes } from "../api/Citas";

import "./Historial.css";

export default function Historial() {
  const [historiales, setHistoriales] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({
    idPaciente: "",
    fecha: "",
    descripcion: "",
    diagnosticoAnterior: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  async function cargarDatosIniciales() {
    setLoading(true);
    setError(null);
    try {
      const [historialData, pacientesData] = await Promise.all([
        obtenerHistoriales(),
        obtenerPacientes(),
      ]);
      setHistoriales(historialData);
      setPacientes(pacientesData);
    } catch (e) {
      setError("Error al cargar los datos: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBuscarPorPaciente = async () => {
    if (!form.idPaciente) {
      setError("Selecciona un paciente para buscar");
      return;
    }
    setLoading(true);
    try {
      const data = await buscarHistorialPorPaciente(form.idPaciente);
      setHistoriales(data);
    } catch (e) {
      setError("Error al buscar historial por paciente: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearHistorial = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.idPaciente || !form.fecha || !form.descripcion) {
      setError("Todos los campos obligatorios deben completarse");
      return;
    }

    try {
      setLoading(true);

      const historialNuevo = {
        paciente: { idPaciente: parseInt(form.idPaciente) },
        fecha: form.fecha,
        descripcion: form.descripcion,
        diagnosticoAnterior: form.diagnosticoAnterior,
      };

      await crearHistorial(historialNuevo);
      setForm({
        idPaciente: "",
        fecha: "",
        descripcion: "",
        diagnosticoAnterior: "",
      });
      await cargarDatosIniciales();
    } catch (e) {
      setError("Error al crear historial médico: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Deseas eliminar este historial?")) return;
    setLoading(true);
    try {
      await eliminarHistorial(id);
      await cargarDatosIniciales();
    } catch (e) {
      setError("Error al eliminar historial médico: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultas-container">
      <h2>Gestión de Historial Médico</h2>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Cargando...</p>}

      <form onSubmit={handleCrearHistorial} className="form-consulta">
        <label>
          Paciente:
          <select name="idPaciente" value={form.idPaciente} onChange={handleChange}>
            <option value="">Selecciona un paciente</option>
            {pacientes.map((p) => (
              <option key={p.idPaciente} value={p.idPaciente}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>
        </label>

        <label>
          Fecha:
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
        </label>

        <label>
          Descripción:
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
        </label>

        <label>
          Diagnóstico Anterior (opcional):
          <textarea name="diagnosticoAnterior" value={form.diagnosticoAnterior} onChange={handleChange} />
        </label>

        <button type="submit" disabled={loading}>
          Crear Historial
        </button>
      </form>

      <div className="filtros-busqueda">
        <button onClick={cargarDatosIniciales} disabled={loading}>
          Mostrar Todos
        </button>
        <button onClick={handleBuscarPorPaciente} disabled={loading}>
          Buscar por Paciente
        </button>
      </div>

      <h3>Lista de Historiales</h3>

      <table className="tabla-consultas" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Diagnóstico Anterior</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {historiales.length === 0 ? (
            <tr>
              <td colSpan="6" className="centrado">
                No hay historiales registrados.
              </td>
            </tr>
          ) : (
            historiales.map((h) => (
              <tr key={h.idHistorial}>
                <td>{h.idHistorial}</td>
                <td>{h.paciente?.nombre ? `${h.paciente.nombre} ${h.paciente.apellido}` : "N/D"}</td>
                <td>{h.fecha}</td>
                <td>{h.descripcion}</td>
                <td>{h.diagnosticoAnterior || "—"}</td>
                <td>
                  <button onClick={() => handleEliminar(h.idHistorial)} disabled={loading} className="btn-eliminar">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
