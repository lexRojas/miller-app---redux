import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

export default function TableBoletas({
  estado,
  selectedProducts,
  setSelectedProducts,
  date_inicio,
  date_final,
}) {
  // Variables del contexto

  const id_proyecto_ = useSelector((state) => state.user.id_proyecto);
  const myURL_ = useSelector((state) => state.user.myURL);

  // Variables de estado interno

  const [detalle_boletas, setDetalle_Boletas] = useState([]);
  const [count, setCount] = useState(10);
  const toastControl = useRef(null);

  // Campos html

  const acionsEmployee = () => {
    return (
      <div>
        <Button className="m-1" icon="pi pi-plus"/>
        <Button className="m-1" icon="pi pi-minus" />
        <Button className="m-1" icon="pi pi-eye"/> 
      </div>
    );
  };

  const CountEmployee = (options) => {
    const {empleados} = options
    
    setCount(empleados.length)

    return <div className="p-datatable-tbody" >{count}</div>;
  };

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

    getBoletas(id_proyecto_);
  }, [id_proyecto_, myURL_, estado]);

  return (
    <div className="card">
      <DataTable
        value={detalle_boletas}
        selectionMode="checkbox"
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
        rows={10}
        paginator
        emptyMessage="No existen boletas de asignacion de labores o revise el filtro aplicado"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>

        <Column field="id" header="#Boleta" sortField={true}></Column>
        <Column
          field="fecha_inicio"
          filter
          header="Fecha Apertura"
          sortable
        ></Column>
        <Column field="codigo_manobra" header="Codigo"></Column>
        <Column field="comentarios" header="Actividad" sortable filter></Column>
        <Column field="cantidad_asignada" header="Cantidad"></Column>
        <Column header="Empleado" body={CountEmployee} align="center"></Column>
        <Column header="Empleados" body={acionsEmployee} align="center"></Column>
      </DataTable>
      <Toast ref={toastControl} />
    </div>
  );
}
