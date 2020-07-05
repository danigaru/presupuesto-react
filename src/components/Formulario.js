import React, { useState } from "react";
import shortId from "shortid";
import Error from "./Error";
import PropTypes from "prop-types";

const Formulario = ({ setGasto, setCrearGasto, restante }) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const agregarGasto = (e) => {
    e.preventDefault();
    // validar
    if (!cantidad.trim() || cantidad < 1 || !nombre.trim()) {
      setError(true);
      setMessage("Todos los campos son obligatorios");
      return;
    }

    if (restante < cantidad) {
      setError(true);
      setMessage(
        "Lo sentimos ya no tienes suficiente presupuesto para este gasto"
      );
      return;
    }
    setError(false);
    // construir el gasto
    const gasto = {
      nombre,
      cantidad,
      id: shortId.generate(),
    };

    // pasar el gasto al component principal
    setGasto(gasto);
    setCrearGasto(true);
    setNombre("");
    setCantidad(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega tus gatos aquí</h2>
      {error && <Error message={message} />}
      <div className="campo">
        <label>Nombre gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}
        />
      </div>
      <div className="campo">
        <label>Cantidad gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej. 100"
          min={1}
          onChange={(e) => parseInt(setCantidad(e.target.value))}
          value={cantidad}
        />
      </div>
      <input
        type="submit"
        className="u-full-width button-primary"
        value="Agregar gasto"
      />
    </form>
  );
};

Formulario.propTypes = {
  setGasto: PropTypes.func.isRequired,
  setCrearGasto: PropTypes.func.isRequired,
  restante: PropTypes.number.isRequired,
};

export default Formulario;
