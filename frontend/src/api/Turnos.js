const URL = "http://localhost:9000/clinicaWeb/api/turnos";

export const obtenerTurnos = async () => {
  const r = await fetch(URL);
  if (!r.ok) throw new Error("Error al obtener turnos");
  return r.json();
};

export const crearTurno = async (turno) => {
  const r = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(turno),
  });
  if (!r.ok) throw new Error("Error al crear turno");
  return r.json();
};

export const eliminarTurno = async (id) => {
  const r = await fetch(`${URL}/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Error al eliminar turno");
};

export const buscarTurnosPorMedico = async (idMedico) => {
  const r = await fetch(`${URL}/buscarPorMedico?idMedico=${idMedico}`);
  if (!r.ok) throw new Error("Error al buscar turnos por médico");
  return r.json();
};
