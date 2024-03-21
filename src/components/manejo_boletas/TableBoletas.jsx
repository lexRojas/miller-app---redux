import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import TableEmpleadosView from "./TableEmpleadosView";
import { convertDate_to_YMD } from "../../tools/convertDate";
import { getTimeHHMM } from "../../tools/getTimeHHMM";

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
  const [visibleLista, setVisibleLista] = useState(false);
  const [visibleAddEmployee, setVisibleAddEmployee] = useState(false);
  const [visibleRemoveEmployee, setVisibleRemoveEmployee] = useState(false);

  const [boletaClickAdd_Remove, setboletaClickAdd_Remove] = useState(null);

  const [empleados, setEmpleados] = useState([]);
  const toastControl = useRef(null);

  // Componentes internos

  const acionsEmployee = (options) => {
    return (
      <div>
        <Button
          className="m-1"
          icon="pi pi-plus"
          severity="success"
          onClick={(e) => showEmpleadosAdd(options)}
        />
        <Button
          className="m-1"
          icon="pi pi-minus"
          severity="danger"
          onClick={(e) => showEmpleadosRemove(options)}
        />
        <Button
          className="m-1"
          icon="pi pi-eye"
          onClick={(e) => showEmpleados(options)}
        />
      </div>
    );
  };

  const CountEmployee = (options) => {
    const { empleados } = options;

    const cantidad = empleados.length;

    return <div className="p-datatable-tbody">{cantidad}</div>;
  };

  // funciones

  const showEmpleados = (options) => {
    const { empleados } = options;
    setEmpleados(empleados);
    setVisibleLista(true);
  };

  const showEmpleadosRemove = (options) => {
    if (options.empleados.length > 1) {
      const { empleados } = options;
      const { id } = options;

      setboletaClickAdd_Remove(id);
      setEmpleados(empleados);
      setVisibleRemoveEmployee(true);
    } else {
      toastControl.current.show({
        severity:"error",
        summary: "Miller CR",
        detail: "No se pueden reducir a menos de una persona una boleta",
        life:3000
      })

    }
  };

  const showEmpleadosAdd = (options) => {
    const { empleados } = options;

    setEmpleados(empleados);
    setVisibleAddEmployee(true);
  };

  const pacthEmployee = async (values) => {
    if (values) {
      // Define the URL where you want to send the POST request
      const url = myURL_ + "/cerrar";
      // Make the POST request using Axios
      await axios
        .post(url, values)
        .then(function (response) {
          // Handle success response
          //confirm1()
          console.log(response.data);
        })
        .catch(function (error) {
          // Handle error
          console.log(error);
        });
    }
  };

  const removeEmployee = (empleadosSelected) => {
    setVisibleRemoveEmployee(false);
    pacthEmployee({
      fecha_final: convertDate_to_YMD(new Date()),
      hora_final: getTimeHHMM(),
      id_boleta: boletaClickAdd_Remove,
      codigo_empleado: empleadosSelected.codigo_empleado,
    });
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

    getBoletas();
  };

  const addEmployee = (empleadosSelected) => {
    console.log(empleadosSelected);
    setVisibleAddEmployee(false);
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
    getBoletas();
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
        <Column field="cantidad_asignada" header="Cantidad Asignada"></Column>
        <Column header="Empleados" body={CountEmployee} align="center"></Column>
        <Column
          header="Acciones (Empleados)"
          body={acionsEmployee}
          align="center"
        ></Column>
      </DataTable>
      <Toast ref={toastControl} />
      <Dialog
        header="Lista de empleados asignados en esta boleta"
        visible={visibleLista}
        style={{ width: "30vw" }}
        onHide={() => setVisibleLista(false)}
      >
        <TableEmpleadosView
          empleados={empleados}
          buttonOptions={[
            { visible: false, label: "", action: null },
            { visible: true, label: "Entendido", action: setVisibleLista },
          ]}
        />
      </Dialog>
      <Dialog
        header="Lista de empleados (Disponibles para añadir a la actividad)"
        visible={visibleAddEmployee}
        style={{ width: "30vw" }}
        onHide={() => setVisibleAddEmployee(false)}
      >
        <TableEmpleadosView
          empleados={empleados}
          buttonOptions={[
            { visible: true, label: "Añadir", action: addEmployee },
            { visible: true, label: "Cancelar", action: setVisibleAddEmployee },
          ]}
        />
      </Dialog>
      <Dialog
        header="Lista de empleados para Eliminar de la actividad"
        visible={visibleRemoveEmployee}
        style={{ width: "30vw" }}
        onHide={() => setVisibleRemoveEmployee(false)}
      >
        <TableEmpleadosView
          empleados={empleados}
          buttonOptions={[
            { visible: true, label: "Remover", action: removeEmployee },
            {
              visible: true,
              label: "Cancelar",
              action: setVisibleRemoveEmployee,
            },
          ]}
        />
      </Dialog>
    </div>
  );
}
