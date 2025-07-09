const URL_BASE = "http://localhost:9000/clinicaWeb/api/historiales";

export async function obtenerHistoriales() {
  const res = await fetch(URL_BASE);
  if (!res.ok) throw new Error("Error al obtener historiales");
  return await res.json();
}

export async function obtenerHistorialPorId(id) {
  const res = await fetch(`${URL_BASE}/${id}`);
  if (!res.ok) throw new Error("Error al obtener historial por ID");
  return await res.json();
}

export async function buscarHistorialPorPaciente(idPaciente) {
  const res = await fetch(`${URL_BASE}/buscarPorPaciente?idPaciente=${idPaciente}`);
  if (!res.ok) throw new Error("Error al buscar historial por paciente");
  return await res.json();
}

export async function crearHistorial(historial) {
  const res = await fetch(URL_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(historial),
  });
  if (!res.ok) throw new Error("Error al crear historial médico");
  return await res.json();
}

export async function eliminarHistorial(id) {
  const res = await fetch(`${URL_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar historial médico");
}
