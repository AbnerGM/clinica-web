import React, { useEffect, useState } from "react";
import {
  obtenerCitas,
  guardarCita,
  eliminarCita,
  obtenerMedicos,
  obtenerPacientes,
  actualizarEstadoCita, 
} from "../api/Citas";
import './Citas.css';

const initialForm = {
  fecha: "",
  hora: "",
  idPaciente: "",
  idMedico: "",
};

const ESTADO_PENDIENTE = "Pendiente";

// Agrego arreglos de estados permitidos
const ESTADOS = ["Pendiente", "Confirmada", "Cancelada"];

export default function Citas() {
  const [form, setForm] = useState(initialForm);
  const [citas, setCitas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      setLoading(true);
      const [citasData, medicosData, pacientesData] = await Promise.all([
        obtenerCitas(),
        obtenerMedicos(),
        obtenerPacientes(),
      ]);
      setCitas(citasData);
      setMedicos(medicosData);
      setPacientes(pacientesData);
      setError(null);
    } catch (e) {
      setError("Error al cargar datos: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.idPaciente || !form.idMedico) {
      setError("Paciente y Médico son obligatorios");
      return;
    }

    if (!form.fecha || !form.hora) {
      setError("Fecha y hora son obligatorios");
      return;
    }

    try {
      setLoading(true);

      const fechaHoraISO = `${form.fecha}T${form.hora}`;

      const nuevaCita = {
        paciente: { idPaciente: parseInt(form.idPaciente) },
        medico: { idMedico: parseInt(form.idMedico) },
        fechaHora: fechaHoraISO,
        estado: ESTADO_PENDIENTE,
      };

      await guardarCita(nuevaCita);
      setForm(initialForm);
      await cargarDatos();
    } catch (e) {
      setError("Error al guardar cita: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  // NUEVO handler para cambiar estado de cita
  const handleEstadoChange = async (idCita, nuevoEstado) => {
    try {
      setLoading(true);
      await actualizarEstadoCita(idCita, nuevoEstado);
      await cargarDatos();
      setError(null);
    } catch (e) {
      setError("Error al actualizar estado: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta cita?")) return;

    try {
      setLoading(true);
      await eliminarCita(id);
      await cargarDatos();
    } catch (e) {
      setError("Error al eliminar cita: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="citas-container">
      <h2 className="titulo-citas">Gestión de Citas</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {loading && <p style={{ textAlign: "center" }}>Cargando...</p>}

      <form className="form-cita" onSubmit={handleSubmit}>
        <label>
          Paciente:
          <select
            name="idPaciente"
            value={form.idPaciente}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">-- Selecciona un paciente --</option>
            {pacientes.map((p) => (
              <option key={p.idPaciente} value={p.idPaciente}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>
        </label>

        <label>
          Médico:
          <select
            name="idMedico"
            value={form.idMedico}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">-- Selecciona un médico --</option>
            {medicos.map((m) => (
              <option key={m.idMedico} value={m.idMedico}>
                {m.nombre} {m.apellido}
              </option>
            ))}
          </select>
        </label>

        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        <label>
          Hora:
          <input
            type="time"
            name="hora"
            value={form.hora}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        <button type="submit" disabled={loading}>
          Guardar Cita
        </button>
      </form>

      <h3 className="titulo-lista">Lista de Citas</h3>

      <table className="tabla-citas">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Fecha y Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", fontStyle: "italic" }}>
                No hay citas registradas
              </td>
            </tr>
          )}

          {citas.map((cita) => {
            const fechaHora = new Date(cita.fechaHora).toLocaleString();
            return (
              <tr key={cita.idCita}>
                <td>{cita.paciente?.nombre} {cita.paciente?.apellido}</td>
                <td>{cita.medico?.nombre} {cita.medico?.apellido}</td>
                <td>{fechaHora}</td>
                <td>
                  
                  <select
                    value={cita.estado}
                    onChange={(e) => handleEstadoChange(cita.idCita, e.target.value)}
                    disabled={loading}
                  >
                    {ESTADOS.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => handleEliminar(cita.idCita)} disabled={loading}>
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
