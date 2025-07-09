import React, { useEffect, useState } from "react";
import {
  obtenerTurnos,
  crearTurno,
  eliminarTurno,
  buscarTurnosPorMedico
} from "../api/Turnos";
import { obtenerMedicos } from "../api/Citas";

import "./Turnos.css";

export default function Turnos() {
  const [turnos, setTurnos] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [form, setForm] = useState({
    idMedico: "",
    fecha: "",
    horaInicio: "",
    horaFin: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [turnosData, medicosData] = await Promise.all([
        obtenerTurnos(),
        obtenerMedicos()
      ]);
      setTurnos(turnosData);
      setMedicos(medicosData);
    } catch (e) {
      setError("Error al cargar los datos: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBuscar = async () => {
    if (!form.idMedico) {
      setError("Seleccione un médico para buscar");
      return;
    }
    try {
      setLoading(true);
      const data = await buscarTurnosPorMedico(form.idMedico);
      setTurnos(data);
    } catch (e) {
      setError("Error al buscar turnos: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearTurno = async (e) => {
    e.preventDefault();
    setError(null);

    const { idMedico, fecha, horaInicio, horaFin } = form;

    if (!idMedico || !fecha || !horaInicio || !horaFin) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (horaFin <= horaInicio) {
      setError("La hora de fin debe ser mayor que la hora de inicio");
      return;
    }

    const nuevoTurno = {
      medico: { idMedico: parseInt(idMedico) },
      fecha: fecha,
      horaInicio: `${horaInicio}:00`,
      horaFin: `${horaFin}:00`
    };

    try {
      setLoading(true);
      await crearTurno(nuevoTurno);
      setForm({
        idMedico: "",
        fecha: "",
        horaInicio: "",
        horaFin: ""
      });
      await cargarDatos();
    } catch (e) {
      setError("Error al crear turno: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Deseas eliminar este turno?")) return;
    try {
      setLoading(true);
      await eliminarTurno(id);
      await cargarDatos();
    } catch (e) {
      setError("Error al eliminar turno: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="turnos-container">
      <h2>Gestión de Turnos Médicos</h2>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Cargando...</p>}

      <form onSubmit={handleCrearTurno} className="form-turno">
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
          Hora Inicio:
          <input type="time" name="horaInicio" value={form.horaInicio} onChange={handleChange} />
        </label>

        <label>
          Hora Fin:
          <input type="time" name="horaFin" value={form.horaFin} onChange={handleChange} />
        </label>

        <button type="submit" disabled={loading}>Crear Turno</button>
      </form>

      <div className="filtros-busqueda">
        <button onClick={cargarDatos} disabled={loading}>Mostrar Todos</button>
        <button onClick={handleBuscar} disabled={loading}>Buscar por Médico</button>
      </div>

      <h3>Lista de Turnos</h3>
      <table className="tabla-turnos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Médico</th>
            <th>Fecha</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.length === 0 ? (
            <tr><td colSpan="6" className="centrado">No hay turnos registrados.</td></tr>
          ) : (
            turnos.map((t) => (
              <tr key={t.idTurno}>
                <td>{t.idTurno}</td>
                <td>{t.medico ? `${t.medico.nombre} ${t.medico.apellido}` : "Sin médico"}</td>
                <td>{t.fecha}</td>
                <td>{t.horaInicio}</td>
                <td>{t.horaFin}</td>
                <td>
                  <button
                    onClick={() => handleEliminar(t.idTurno)}
                    className="btn-eliminar"
                    disabled={loading}
                  >
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
