const URL = "http://localhost:9000/clinicaWeb/api/especialidades";

export const obtenerEspecialidades = async () => {
  const r = await fetch(URL);
  if (!r.ok) throw new Error("Error al obtener especialidades");
  return r.json();
};

export const crearEspecialidad = async (especialidad) => {
  const r = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(especialidad),
  });
  if (!r.ok) throw new Error("Error al crear especialidad");
  return r.json();
};

export const eliminarEspecialidad = async (id) => {
  const r = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
  if (!r.ok) throw new Error("Error al eliminar especialidad");
};
