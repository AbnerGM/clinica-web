import React, { useEffect, useState } from "react";
import {
  obtenerFacturas,
  eliminarFactura,
  buscarPorPaciente,
  buscarPorMetodo,
  crearFactura
} from "../api/Facturas";
import { obtenerPacientes } from "../api/Citas";
import "./Facturas.css";

export default function Facturas() {
  const [facturas, setFacturas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [filtroMetodo, setFiltroMetodo] = useState("");

  const [nuevoPaciente, setNuevoPaciente] = useState("");
  const [nuevoTotal, setNuevoTotal] = useState("");
  const [nuevoMetodo, setNuevoMetodo] = useState("");
  const [modoCrear, setModoCrear] = useState(false);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      setFacturas(await obtenerFacturas());
      setPacientes(await obtenerPacientes());
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  };

  const filtrarPaciente = async () => {
    if (!filtroPaciente) return;
    try {
      const datos = await buscarPorPaciente(filtroPaciente);
      setFacturas(datos);
    } catch (error) {
      console.error("Error al filtrar por paciente:", error);
    }
  };

  const filtrarMetodo = async () => {
    if (!filtroMetodo) return;
    try {
      const datos = await buscarPorMetodo(filtroMetodo);
      setFacturas(datos);
    } catch (error) {
      console.error("Error al filtrar por método:", error);
    }
  };

  const reset = async () => {
    setFiltroPaciente("");
    setFiltroMetodo("");
    cargar();
  };

  const handleCrear = async () => {
    if (!nuevoPaciente || !nuevoTotal || !nuevoMetodo) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await crearFactura({
        paciente: { idPaciente: parseInt(nuevoPaciente) },
        total: parseFloat(nuevoTotal),
        metodoPago: nuevoMetodo,
        fecha: new Date()
      });
      setNuevoPaciente("");
      setNuevoTotal("");
      setNuevoMetodo("");
      setModoCrear(false);
      cargar();
    } catch (err) {
      alert("Error al crear factura");
      console.error(err);
    }
  };

  return (
    <div className="facturas-container">
      <div className="facturas-header">
        <h2>Facturas</h2>
        <button onClick={() => setModoCrear(!modoCrear)}>
          {modoCrear ? "Regresar" : "Crear Factura"}
        </button>
      </div>

      {modoCrear ? (
        <div className="facturas-formulario">
          <h4>Nueva Factura</h4>
          <select value={nuevoPaciente} onChange={(e) => setNuevoPaciente(e.target.value)}>
            <option value="">Seleccione paciente</option>
            {pacientes.map((p) => (
              <option key={p.idPaciente} value={p.idPaciente}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Total"
            value={nuevoTotal}
            onChange={(e) => setNuevoTotal(e.target.value)}
          />
          <select value={nuevoMetodo} onChange={(e) => setNuevoMetodo(e.target.value)}>
            <option value="">Método de pago</option>
            <option value="EFECTIVO">Efectivo</option>
            <option value="TARJETA">Tarjeta</option>
            <option value="TRANSFERENCIA">Transferencia</option>
          </select>
          <button onClick={handleCrear}>Guardar Factura</button>
        </div>
      ) : (
        <>
          <div className="facturas-filtros">
            <select value={filtroPaciente} onChange={(e) => setFiltroPaciente(e.target.value)}>
              <option value="">Buscar por paciente</option>
              {pacientes.map((p) => (
                <option key={p.idPaciente} value={p.idPaciente}>
                  {p.nombre} {p.apellido}
                </option>
              ))}
            </select>
            <button onClick={filtrarPaciente}>Buscar</button>

            <select value={filtroMetodo} onChange={(e) => setFiltroMetodo(e.target.value)}>
              <option value="">Método de pago</option>
              <option value="EFECTIVO">Efectivo</option>
              <option value="TARJETA">Tarjeta</option>
              <option value="TRANSFERENCIA">Transferencia</option>
            </select>
            <button onClick={filtrarMetodo}>Buscar</button>

            <button onClick={reset}>Reset</button>
          </div>

          <table className="facturas-tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Paciente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Método</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((f) => (
                <tr key={f.idFactura}>
                  <td>{f.idFactura}</td>
                  <td>{f.paciente?.nombre} {f.paciente?.apellido}</td>
                  <td>{new Date(f.fecha).toLocaleString()}</td>
                  <td>S/ {f.total?.toFixed(2)}</td>
                  <td>{f.metodoPago}</td>
                  <td>
                    <button onClick={() => eliminarFactura(f.idFactura).then(cargar)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
