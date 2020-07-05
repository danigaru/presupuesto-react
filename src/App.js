import React, { useState, useEffect } from "react";
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";

function App() {
  // definir el state
  const [presupuesto, setPresupuesto] = useState(0);
  const [restante, setRestante] = useState(0);
  const [mostrarPregunta, actualizarPregunta] = useState(true);
  const [gastos, setGastos] = useState([]);
  const [gasto, setGasto] = useState({});
  const [crearGasto, setCrearGasto] = useState(false);

  useEffect(() => {
    if (crearGasto) {

      // agrega el nuevo presupuesto
      setGastos([...gastos, gasto]);

      // resta el presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      setRestante(presupuestoRestante);
      setCrearGasto(false);
    }

  }, [gasto, crearGasto, gastos, restante]);

  const definirPresupuesto = (cantidad) => {
    setPresupuesto(cantidad);
    setRestante(cantidad);
    actualizarPregunta(false);
  };

  const eliminarGasto = (gasto) => {
    const gastosNuevos = gastos.filter( item => item.id !== gasto.id);
    setGastos(gastosNuevos);
    const agregarPresupuesto = restante + Number(gasto.cantidad);
    setRestante(agregarPresupuesto);
  }

  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
          {mostrarPregunta ? (
            <Pregunta definirPresupuesto={definirPresupuesto} />
          ) : (
            <div className="row">
              <div className="one-half column">
                <Formulario setGasto={setGasto} setCrearGasto={setCrearGasto} restante={restante} />
              </div>
              <div className="one-half column">
                <Listado gastos={gastos} eliminarGasto={eliminarGasto} />
                <ControlPresupuesto
                  presupuesto={presupuesto}
                  restante={restante}
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
