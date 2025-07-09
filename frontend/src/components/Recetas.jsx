import React, { useState, useEffect } from "react";
import {
  obtenerRecetas,
  crearReceta,
  eliminarReceta,
  buscarPorMedicamento,
  buscarPorConsulta,
} from "../api/Recetas";
import "./Recetas.css";

export default function Recetas() {
  const [recetas, setRecetas] = useState([]);
  const [idConsulta, setIdConsulta] = useState("");
  const [medicamentos, setMedicamentos] = useState("");
  const [instrucciones, setInstrucciones] = useState("");
  const [modoCrear, setModoCrear] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const cargar = async () => {
    try {
      const datos = await obtenerRecetas();
      setRecetas(datos);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleCrear = async () => {
    if (!idConsulta || !medicamentos || !instrucciones) {
      alert("Completa todos los campos");
      return;
    }
    try {
      await crearReceta({
        consulta: { idConsulta: parseInt(idConsulta) },
        medicamentos,
        instrucciones,
      });
      setIdConsulta("");
      setMedicamentos("");
      setInstrucciones("");
      setModoCrear(false);
      cargar();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBuscar = async () => {
    try {
      if (!busqueda.trim()) return cargar();
      if (!isNaN(busqueda)) {
        setRecetas(await buscarPorConsulta(busqueda));
      } else {
        setRecetas(await buscarPorMedicamento(busqueda));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar receta?")) return;
    await eliminarReceta(id);
    cargar();
  };

  return (
    <div className="recetas-container">
      <header className="recetas-header">
        <h2>Recetas Médicas</h2>
        <button onClick={() => setModoCrear(!modoCrear)}>
          {modoCrear ? "Ver Recetas" : "Agregar Receta"}
        </button>
      </header>

      {modoCrear && (
        <div className="recetas-form">
          <input
            type="number"
            placeholder="ID de consulta"
            value={idConsulta}
            onChange={(e) => setIdConsulta(e.target.value)}
          />
          <textarea
            placeholder="Medicamentos"
            value={medicamentos}
            onChange={(e) => setMedicamentos(e.target.value)}
          ></textarea>
          <textarea
            placeholder="Instrucciones"
            value={instrucciones}
            onChange={(e) => setInstrucciones(e.target.value)}
          ></textarea>
          <button onClick={handleCrear}>Guardar</button>
        </div>
      )}

      {!modoCrear && (
        <>
          <div className="recetas-filtros">
            <input
              type="text"
              placeholder="Buscar por medicamento o ID de consulta"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button onClick={handleBuscar}>Buscar</button>
            <button onClick={cargar}>Reset</button>
          </div>

          <div className="recetas-grid">
            {recetas.map((receta) => (
              <div className="receta-card" key={receta.idReceta}>
                <h3>Receta #{receta.idReceta}</h3>
                <p><strong>Consulta:</strong> {receta.consulta?.idConsulta}</p>
                <p><strong>Medicamentos:</strong> {receta.medicamentos}</p>
                <p><strong>Instrucciones:</strong> {receta.instrucciones}</p>
                <button onClick={() => handleEliminar(receta.idReceta)}>Eliminar</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
