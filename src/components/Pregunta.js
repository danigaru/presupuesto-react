import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Error from "./Error";

const Pregunta = ({ definirPresupuesto }) => {
  const [cantidad, setCantidad] = useState(0);
  const [error, setError] = useState(false);

  const agregarPresupuesto = (e) => {
    e.preventDefault();

    // validar
    if (!cantidad || cantidad < 1) {
      setError(true);
      return;
    }

    setError(false);
    definirPresupuesto(cantidad);
  };

  return (
    <Fragment>
      <h2>Coloca tu presupuesto</h2>
      {error && <Error message="El presupuesto no es válido" />}
      <form onSubmit={agregarPresupuesto}>
        <input
          type="number"
          className="u-full-width"
          placeholder="Coloca tu presupuesto"
          onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
          min={1}
        />
        <input
          type="submit"
          value="definir presupuesto"
          className="button-primary u-full-width"
        />
      </form>
    </Fragment>
  );
};

Pregunta.propTypes = {
  definirPresupuesto: PropTypes.func.isRequired,
};
export default Pregunta;
