import React from "react";
import ComboSectores from "../components/ComboSectores";
import TableElementos from "../components/TableElementos";
import FormBoleta from "../components/FormBoleta";
import TableEmpleados from "../components/TableEmpleados";

function BoletaAsignacion() {
  return (
    <div className="card flex flex-column col-12 p-3 md:col-10 mt-2">
      <div className="flex flex-column md:flex-row">
        <div className="flex flex-column col-auto md:col-6 mt-2">
          <p className="font-bold text-5xl text-primary">
            Boleta de Asignación
          </p>
        </div>
        <div className="flex flex-column col-auto md:col-6 mt-2">
          <ComboSectores />
        </div>
      </div>
      <div className="flex flex-column gap-1 mb-2 md:flex-row">
        <div className="flex flex-column col-auto md:col-6 mt-2">
          <TableElementos />
        </div>
        <div className="flex flex-column col-auto md:col-6 mt-2">
          <FormBoleta />
        </div>
      </div>
      <div className="flex flex-column col-auto md:flex-row">
        <TableEmpleados />
      </div>
    </div>
  );
}

export default BoletaAsignacion;
