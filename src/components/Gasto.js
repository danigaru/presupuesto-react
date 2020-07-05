import React from "react";
import PropTypes from "prop-types";

const Gasto = ({ gasto, eliminarGasto }) => (
  <li className="gastos row">
    <div className="row">
      <div className="ten columns">
        <p>
          {gasto.nombre}
          <span className="gasto">${gasto.cantidad}</span>
        </p>
      </div>
      <div className="two columns">
        <button onClick={() => eliminarGasto(gasto)} className="u-full-width button mt-2">X</button>
      </div>
    </div>
  </li>
);

Gasto.propTypes = {
  gasto: PropTypes.object.isRequired,
};

export default Gasto;
