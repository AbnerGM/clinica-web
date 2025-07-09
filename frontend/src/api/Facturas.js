const URL = "http://localhost:9000/clinicaWeb/api/facturas";

export const obtenerFacturas = async () => {
  const r = await fetch(URL);
  if (!r.ok) throw new Error("Error al obtener facturas");
  return r.json();
};

export const eliminarFactura = async (id) => {
  const r = await fetch(`${URL}/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Error al eliminar factura");
};

export const buscarPorPaciente = async (idPaciente) => {
  const r = await fetch(`${URL}/buscarPorPaciente?idPaciente=${idPaciente}`);
  if (!r.ok) throw new Error("Error al buscar por paciente");
  return r.json();
};

export const buscarPorMetodo = async (metodoPago) => {
  const r = await fetch(`${URL}/buscarPorMetodoPago?metodoPago=${metodoPago}`);
  if (!r.ok) throw new Error("Error al buscar por método de pago");
  return r.json();
};

export const crearFactura = async (factura) => {
  const r = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(factura),
  });
  if (!r.ok) throw new Error("Error al crear factura");
  return r.json();
};
