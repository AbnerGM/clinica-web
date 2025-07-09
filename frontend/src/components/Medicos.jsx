import React, { useEffect, useState } from "react";
import {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
} from "../api/Medicos";
import { obtenerEspecialidades } from "../api/Especialidades";

import "./Medicos.css";

const initialForm = {
  nombre: "",
  apellido: "",
  idEspecialidad: "",
  telefono: "",
  correoElectronico: "",
};

export default function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const cargarTodo = async () => {
    try {
      const [m, e] = await Promise.all([
        obtenerMedicos(),
        obtenerEspecialidades(),
      ]);
      setMedicos(m);
      setEspecialidades(e);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const soloLetras = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
    handleChange(e);
  };


  const soloNumeros = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    handleChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        nombre: form.nombre,
        apellido: form.apellido,
        telefono: form.telefono,
        correoElectronico: form.correoElectronico,
        especialidad: {
          idEspecialidad: Number(form.idEspecialidad),
        },
      };

      if (editId) {
        const medicoOriginal = medicos.find((m) => m.idMedico === editId);
        if (!medicoOriginal) throw new Error("Médico no encontrado para editar");
        payload.fechaRegistro = medicoOriginal.fechaRegistro;

        await actualizarMedico(editId, payload);
        setEditId(null);
      } else {
        payload.fechaRegistro = new Date();
        await crearMedico(payload);
      }

      setForm(initialForm);
      cargarTodo();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (m) => {
    setForm({
      nombre: m.nombre,
      apellido: m.apellido,
      idEspecialidad: m.especialidad?.idEspecialidad || "",
      telefono: m.telefono,
      correoElectronico: m.correoElectronico,
    });
    setEditId(m.idMedico);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar médico?")) return;
    await eliminarMedico(id);
    cargarTodo();
  };

  return (
    <div className="page-wrapper">
      <section className="card">
        <h2>{editId ? "Editar Médico" : "Agregar Médico"}</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="form-grid">
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onInput={soloLetras}
            required
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onInput={soloLetras}
            required
          />

          <select
            name="idEspecialidad"
            value={form.idEspecialidad}
            onChange={handleChange}
            required
          >
            <option value="">Especialidad...</option>
            {especialidades.map((e) => (
              <option key={e.idEspecialidad} value={e.idEspecialidad}>
                {e.nombre}
              </option>
            ))}
          </select>

          <input
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onInput={soloNumeros}
            required
          />
          <input
            type="email"
            name="correoElectronico"
            placeholder="Correo"
            value={form.correoElectronico}
            onChange={handleChange}
            required
          />

          <div className="btn-group">
            <button type="submit">{editId ? "Actualizar" : "Crear"}</button>
            {editId && (
              <button
                type="button"
                className="cancel"
                onClick={() => {
                  setEditId(null);
                  setForm(initialForm);
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Lista de Médicos</h2>
        {medicos.length === 0 ? (
          <p>No hay médicos registrados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Especialidad</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Registrado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicos.map((m) => (
                <tr key={m.idMedico}>
                  <td>{m.nombre}</td>
                  <td>{m.apellido}</td>
                  <td>{m.especialidad?.nombre}</td>
                  <td>{m.telefono}</td>
                  <td>{m.correoElectronico}</td>
                  <td>
                    {m.fechaRegistro
                      ? new Date(m.fechaRegistro).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(m)}>Editar</button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(m.idMedico)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
