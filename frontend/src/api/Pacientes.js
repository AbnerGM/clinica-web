const API_BASE = "http://localhost:9000/clinicaWeb/api/pacientes";

export const obtenerPacientes = async () => {
  const resp = await fetch(API_BASE);
  if (!resp.ok) throw new Error("Error al obtener pacientes");
  return resp.json();
};

export const guardarPaciente = async (paciente) => {
  const resp = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paciente),
  });
  if (!resp.ok) throw new Error("Error al guardar paciente");
  return resp.json();
};

export const actualizarPaciente = async (id, paciente) => {
  const resp = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paciente),
  });
  if (!resp.ok) throw new Error("Error al actualizar paciente");
  return resp.json();
};

export const eliminarPaciente = async (id) => {
  const resp = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!resp.ok) throw new Error("Error al eliminar paciente");
};
