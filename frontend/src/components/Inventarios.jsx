import React, { useEffect, useState } from "react";
import {
  obtenerInventarios,
  crearInventario,
  eliminarInventario,
  buscarInventarioPorNombre,
} from "../api/Inventarios";
import "./InventarioS.css";

export default function Inventario() {
  const [inventarios, setInventarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modoCrear, setModoCrear] = useState(false);

  const [idProducto, setIdProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState("");

  const cargar = async () => {
    try {
      const data = await obtenerInventarios();
      setInventarios(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleCrear = async () => {
    if (!idProducto || !cantidad || !precio || !fechaExpiracion) {
      alert("Completa todos los campos");
      return;
    }
    try {
      await crearInventario({
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio),
        fechaExpiracion,
        producto: { idProducto: parseInt(idProducto) },
      });
      setIdProducto(""); setCantidad(""); setPrecio(""); setFechaExpiracion("");
      setModoCrear(false);
      cargar();
    } catch (err) {
      alert("Error al crear inventario: " + err.message);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este inventario?")) return;
    try {
      await eliminarInventario(id);
      cargar();
    } catch (err) {
      alert("Error al eliminar inventario: " + err.message);
    }
  };

  const handleBuscar = async () => {
    if (!busqueda.trim()) return;
    try {
      const data = await buscarInventarioPorNombre(busqueda.trim());
      setInventarios(data);
    } catch (err) {
      alert("Error al buscar: " + err.message);
    }
  };

  return (
    <div className="inventario-container">
      <header className="inventario-header">
        <h2>Inventario de Productos</h2>
        <button onClick={() => setModoCrear(!modoCrear)}>
          {modoCrear ? "Ver Inventario" : "Agregar Producto"}
        </button>
      </header>

      {modoCrear && (
        <div className="inventario-form">
          <input
            type="number"
            placeholder="ID del producto"
            value={idProducto}
            onChange={(e) => setIdProducto(e.target.value)}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <input
            type="date"
            value={fechaExpiracion}
            onChange={(e) => setFechaExpiracion(e.target.value)}
          />
          <button onClick={handleCrear}>Guardar</button>
        </div>
      )}

      {!modoCrear && (
        <>
          <div className="inventario-filtros">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button onClick={handleBuscar}>Buscar</button>
            <button onClick={cargar}>Reset</button>
          </div>

          <div className="inventario-grid">
            {inventarios.map((inv) => (
              <div className="inventario-card" key={inv.idInventario}>
                <img
                  src={inv.producto?.imagen || "https://via.placeholder.com/200"}
                  alt={inv.producto?.nombre}
                />
                <h3>{inv.producto?.nombre}</h3>
                <p>Categoría: {inv.producto?.categoria || "—"}</p>
                <p>Cantidad: {inv.cantidad}</p>
                <p>Precio: S/ {inv.precio?.toFixed(2)}</p>
                <p>Vence: {new Date(inv.fechaExpiracion).toLocaleDateString()}</p>
                <button onClick={() => handleEliminar(inv.idInventario)}>Eliminar</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
