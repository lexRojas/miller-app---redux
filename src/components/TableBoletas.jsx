import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

export default function TableBoletas() {
  // Variables del contexto

  const id_proyecto_ = useSelector((state) => state.user.id_proyecto);
  const myURL_ = useSelector((state) => state.user.myURL);

  // Variables de estado interno

  const [estado, setEstado] = useState(false);
  const [detalle_boletas, setDetalle_Boletas] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const toastControl = useRef(null);
  const navegate = useNavigate()

  useEffect(() => {
    const getBoletas = async () => {
      await axios
        .get(myURL_ + "/boleta_detail", {
          params: { presupuesto: id_proyecto_, cerrada: estado },
        })
        .then(function (response) {
          setDetalle_Boletas(response.data);
        })
        .catch(function (error) {
          setDetalle_Boletas([]);
        });
    };

    getBoletas(id_proyecto_, estado);
  }, [estado, id_proyecto_, myURL_]);

  const handleClickCerrar = () => {
    if (selectedProducts) {
    } else {
      toastControl.current.show({
        severity: "error",
        summary: "Miller CR",
        detail: "Debes seleccionar alguna boleta de asignacion",
        life: 3000,
      });
    }
  };

  const handleClickCancelar = () =>{
    navegate('/app')
  }

  return (
    <div className="card">
      <div>
        <p className="font-bold text-xl text-primary">
          Lista de boletas asignadas
        </p>
        <div className="flex justify-content-center align-items-center m-4 gap-5">
          <InputSwitch
            inputId="estado_boleta"
            checked={estado}
            onChange={(e) => setEstado(e.value)}
          />
          <label htmlFor="estado_boleta">Boletas Cerradas</label>
        </div>
      </div>
      <DataTable
        value={detalle_boletas}
        selectionMode="checkbox"
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="id" header="#Boleta" sortField={true}></Column>
        <Column field="fecha_inicio" header="Fecha Apertura" sortable></Column>
        <Column field="codigo_manobra" header="Codigo"></Column>
        <Column field="comentarios" header="Actividad" sortable></Column>
        <Column field="cantidad_asignada" header="Cantidad"></Column>
      </DataTable>
      <div className="flex justify-content-center align-center mt-4 gap-5">
        <Button label="Cerrar Boletas" onClick={handleClickCerrar} />
        <Button label="Cancelar" onClick={handleClickCancelar} />
      </div>
      <Toast ref={toastControl} />
    </div>
  );
}
