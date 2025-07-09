const URL = "http://localhost:9000/clinicaWeb/api/medicos";

export const obtenerMedicos = async () => {
  const r = await fetch(URL);
  if (!r.ok) throw new Error("Error al obtener médicos");
  return r.json();
};

export const crearMedico = async (medico) => {
  medico.fechaRegistro = new Date();
  const r = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medico),
  });
  if (!r.ok) throw new Error("Error al crear médico");
  return r.json();
};

export const actualizarMedico = async (id, medico) => {
  const r = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medico),
  });
  if (!r.ok) throw new Error("Error al actualizar médico");
  return r.json();
};

export const eliminarMedico = async (id) => {
  const r = await fetch(`${URL}/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Error al eliminar médico");
};
