const URL = "http://localhost:9000/clinicaWeb/api/recetas";

/* Obtener todas las recetas */
export const obtenerRecetas = async () => {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Error al obtener recetas");
  return res.json();
};

/* Crear nueva receta */
export const crearReceta = async (data) => {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear receta");
  return res.json();
};

/* Eliminar receta por ID */
export const eliminarReceta = async (id) => {
  const res = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar receta");
};

/* Buscar receta por medicamento */
export const buscarPorMedicamento = async (medicamento) => {
  const res = await fetch(`${URL}/buscarPorMedicamentos?medicamentos=${encodeURIComponent(medicamento)}`);
  if (!res.ok) throw new Error("Error al buscar recetas");
  return res.json();
};

/* Buscar receta por ID de consulta */
export const buscarPorConsulta = async (idConsulta) => {
  const res = await fetch(`${URL}/buscarPorConsulta?idConsulta=${idConsulta}`);
  if (!res.ok) throw new Error("Error al buscar por consulta");
  return res.json();
};
