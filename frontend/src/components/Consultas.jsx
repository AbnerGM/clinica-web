import React, { useEffect, useState } from "react";
import {
  obtenerConsultas,
  buscarConsultasPorPaciente,
  buscarConsultasPorMedico,
  crearConsulta,
  eliminarConsulta,
} from "../api/Consultas";

import {
  obtenerPacientes,
  obtenerMedicos
} from "../api/Citas";

import { crearReceta } from "../api/Recetas"; 

import "./Consultas.css";

export default function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [form, setForm] = useState({
    idPaciente: "",
    idMedico: "",
    fecha: "",
    diagnostico: "",
    tratamiento: "",
    notas: "",
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
      const [consultasData, pacientesData, medicosData] = await Promise.all([
        obtenerConsultas(),
        obtenerPacientes(),
        obtenerMedicos(),
      ]);
      setConsultas(consultasData);
      setPacientes(pacientesData);
      setMedicos(medicosData);
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
    setError(null);
    setLoading(true);
    try {
      const data = await buscarConsultasPorPaciente(form.idPaciente);
      setConsultas(data);
    } catch (e) {
      setError("Error al buscar consultas por paciente: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuscarPorMedico = async () => {
    if (!form.idMedico) {
      setError("Selecciona un médico para buscar");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await buscarConsultasPorMedico(form.idMedico);
      setConsultas(data);
    } catch (e) {
      setError("Error al buscar consultas por médico: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearConsulta = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !form.idPaciente ||
      !form.idMedico ||
      !form.fecha ||
      !form.diagnostico ||
      !form.tratamiento
    ) {
      setError("Todos los campos obligatorios deben ser completados");
      return;
    }

    const consultaNueva = {
      paciente: { idPaciente: parseInt(form.idPaciente) },
      medico: { idMedico: parseInt(form.idMedico) },
      fecha: form.fecha,
      diagnostico: form.diagnostico,
      tratamiento: form.tratamiento,
      notas: form.notas,
    };

    try {
      setLoading(true);
      const nueva = await crearConsulta(consultaNueva);

      
      await crearReceta({
        consulta: { idConsulta: nueva.idConsulta },
        medicamentos: form.tratamiento,      
        instrucciones: form.diagnostico,      
      });

      setForm({
        idPaciente: "",
        idMedico: "",
        fecha: "",
        diagnostico: "",
        tratamiento: "",
        notas: "",
      });
      await cargarDatosIniciales();
    } catch (e) {
      setError("Error al crear consulta: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta consulta?")) return;
    setError(null);
    try {
      setLoading(true);
      await eliminarConsulta(id);
      await cargarDatosIniciales();
    } catch (e) {
      setError("Error al eliminar consulta: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultas-container">
      <h2>Gestión de Consultas Médicas</h2>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Cargando...</p>}

      <form onSubmit={handleCrearConsulta} className="form-consulta">
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
          Médico:
          <select name="idMedico" value={form.idMedico} onChange={handleChange}>
            <option value="">Selecciona un médico</option>
            {medicos.map((m) => (
              <option key={m.idMedico} value={m.idMedico}>
                {m.nombre} {m.apellido} ({m.especialidad?.nombre})
              </option>
            ))}
          </select>
        </label>

        <label>
          Fecha:
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
        </label>

        <label>
          Diagnóstico:
          <textarea name="diagnostico" value={form.diagnostico} onChange={handleChange} />
        </label>

        <label>
          Tratamiento:
          <textarea name="tratamiento" value={form.tratamiento} onChange={handleChange} />
        </label>

        <label>
          Notas (opcional):
          <textarea name="notas" value={form.notas} onChange={handleChange} />
        </label>

        <button type="submit" disabled={loading}>Crear Consulta</button>
      </form>

      <div className="filtros-busqueda">
        <button onClick={cargarDatosIniciales} disabled={loading}>Mostrar Todas</button>
        <button onClick={handleBuscarPorPaciente} disabled={loading}>Buscar por Paciente</button>
        <button onClick={handleBuscarPorMedico} disabled={loading}>Buscar por Médico</button>
      </div>

      <h3>Lista de Consultas</h3>
      <table className="tabla-consultas" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Fecha</th>
            <th>Diagnóstico</th>
            <th>Tratamiento</th>
            <th>Notas</th>
            <th>Acciones</th>
            <th>Receta</th>
          </tr>
        </thead>
        <tbody>
          {consultas.length === 0 ? (
            <tr><td colSpan="9" className="centrado">No hay consultas registradas.</td></tr>
          ) : (
            consultas.map((c) => (
              <tr key={c.idConsulta}>
                <td>{c.idConsulta}</td>
                <td>{c.paciente?.nombre ? `${c.paciente.nombre} ${c.paciente.apellido}` : "N/D"}</td>
                <td>{c.medico?.nombre ? `${c.medico.nombre} ${c.medico.apellido}` : "N/D"}</td>
                <td>{c.fecha}</td>
                <td>{c.diagnostico}</td>
                <td>{c.tratamiento}</td>
                <td>{c.notas || "—"}</td>
                <td>
                  <button onClick={() => handleEliminar(c.idConsulta)} disabled={loading} className="btn-eliminar">
                    Eliminar
                  </button>
                </td>
                <td>
                  <a
                    href={`/recetas?idConsulta=${c.idConsulta}`}
                    className="btn-ver"
                    style={{
                      backgroundColor: "#8e44ad",
                      color: "#fff",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      textDecoration: "none",
                      fontWeight: "600"
                    }}
                  >
                    Ver Receta
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
