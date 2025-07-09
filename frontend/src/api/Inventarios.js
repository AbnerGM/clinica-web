const URL = "http://localhost:9000/clinicaWeb/api/inventarios";

/* Obtener todos los registros del inventario ...*/
export const obtenerInventarios = async () => {
  const r = await fetch(URL);
  if (!r.ok) throw new Error("Error al obtener inventarios");
  return r.json();
};

/* Crear un nuevo registro de inventario */
export const crearInventario = async (data) => {
  const r = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error("Error al crear inventario");
  return r.json();
};

/* Eliminar un registro de inventario */
export const eliminarInventario = async (id) => {
  const r = await fetch(`${URL}/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Error al eliminar inventario");
};

/* Aca buscar por nombre de producto */
export const buscarInventarioPorNombre = async (nombre) => {
  const r = await fetch(`${URL}/buscarPorNombre?nombre=${encodeURIComponent(nombre)}`);
  if (!r.ok) throw new Error("Error al buscar inventario");
  return r.json();
};
