
const URL_BASE = "http://localhost:9000/clinicaWeb/api/consultas";

export async function obtenerConsultas() {
  const res = await fetch(URL_BASE);
  if (!res.ok) throw new Error("Error al obtener consultas");
  return await res.json();
}

export async function obtenerConsultaPorId(id) {
  const res = await fetch(`${URL_BASE}/${id}`);
  if (!res.ok) throw new Error("Error al obtener consulta por ID");
  return await res.json();
}

export async function buscarConsultasPorPaciente(idPaciente) {
  const res = await fetch(`${URL_BASE}/buscarPorPaciente?idPaciente=${idPaciente}`);
  if (!res.ok) throw new Error("Error al buscar consultas por paciente");
  return await res.json();
}

export async function buscarConsultasPorMedico(idMedico) {
  const res = await fetch(`${URL_BASE}/buscarPorMedico?idMedico=${idMedico}`);
  if (!res.ok) throw new Error("Error al buscar consultas por médico");
  return await res.json();
}

export async function crearConsulta(consulta) {
  const res = await fetch(URL_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(consulta),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al crear consulta: ${res.status} - ${text}`);
  }
  return await res.json();
}

export async function eliminarConsulta(id) {
  const res = await fetch(`${URL_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar consulta");
}
