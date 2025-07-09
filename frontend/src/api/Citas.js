const URL_BASE = "http://localhost:9000/clinicaWeb/api";

export async function obtenerCitas() {
  const res = await fetch(`${URL_BASE}/citas`);
  if (!res.ok) throw new Error("Error al obtener citas");
  return await res.json();
}

export async function guardarCita(cita) {
  const res = await fetch(`${URL_BASE}/citas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cita),
  });
  if (!res.ok) throw new Error("Error al guardar cita");
  return await res.json();
}

export async function eliminarCita(id) {
  const res = await fetch(`${URL_BASE}/citas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar cita");
}

export async function obtenerMedicos() {
  const res = await fetch(`${URL_BASE}/medicos`);
  if (!res.ok) throw new Error("Error al obtener médicos");
  return await res.json();
}

export async function obtenerPacientes() {
  const res = await fetch(`${URL_BASE}/pacientes`);
  if (!res.ok) throw new Error("Error al obtener pacientes");
  return await res.json();
}

// NUEVA FUNCIÓN para actualizar estado de cita sin borrar nada...
export async function actualizarEstadoCita(id, nuevoEstado) {
  const res = await fetch(`${URL_BASE}/citas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado }),
  });
  if (!res.ok) throw new Error("Error al actualizar estado de cita");
  return await res.json();
}
