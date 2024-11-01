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

import Boleta from '../../pages/Boleta'


export default function TableBoletas({
  estado,
  selectedProducts,
  setSelectedProducts,
  date_inicio,
  date_final,
  detalle_boletas,
  setDetalle_Boletas
}) {
  // Variables del contexto

  const id_proyecto_ = useSelector((state) => state.user.id_proyecto);
  const myURL_ = useSelector((state) => state.user.myURL);
  const user = useSelector((state) => state.user);

  // Variables de estado interno



  const [optionsSelectedRow, setoptionsSelectedRow] = useState(null);
  // const [visibleLista, setVisibleLista] = useState(false);
  const [visibleAddEmployee, setVisibleAddEmployee] = useState(false);
  const [visibleRemoveEmployee, setVisibleRemoveEmployee] = useState(false);

  const [boletaClickAdd_Remove, setboletaClickAdd_Remove] = useState(null);

  const [empleados, setEmpleados] = useState([]);

const [visible, setVisible] = useState(false)
const [data, setData] = useState([])


  const toastControl = useRef(null);

  // Componentes internos

  const acionsEmployee = (options) => {
    return (
      <div>
        <Button
          className="m-1"
          icon="pi pi-plus"
          severity={estado?"secondary":"success" }
          disabled={estado}
          onClick={(e) => showEmpleadosAdd(options)}
        />
        <Button
          className="m-1"
          icon="pi pi-minus"
          severity={estado?"secondary":"danger" }
          disabled={estado}
          onClick={(e) => showEmpleadosRemove(options)}
        />

        <Button
          className="m-1"
          style={{background:'green'}}
          icon="pi pi-whatsapp"
          onClick={(e) => showBoleta(options)}
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
  // METODO PARA PRESENTAR LA PANTALLA DE EMPLEADOS.



  const showBoleta = (options) =>{
    setVisible(true)

    options.empleados_asignados = options.empleados
    

    setData(options)
  }

  // METODO PARA PRESENTAR LA PANTALLA DE ELIMINAR  EMPLEADOS.

  const showEmpleadosRemove = (options) => {
    if (options.empleados.length > 0) {
      const { empleados } = options;
      const { id } = options;

      setoptionsSelectedRow(options);
      setboletaClickAdd_Remove(id);
      setEmpleados(empleados);
      setVisibleRemoveEmployee(true);
    } else {
      toastControl.current.show({
        severity: "error",
        summary: "Miller CR",
        detail: "No existen empleados que eliminar.",
        life: 3000,
      });
    }
  };

  // METODO PARA PRESENTAR LA PANTALLA DE ADD EMPLEADOS.

  const showEmpleadosAdd = (options) => {
    const { id } = options
    setoptionsSelectedRow(options);
    setboletaClickAdd_Remove(id);

    const get_empleados = async (presupuesto = 0) => {
      if (presupuesto) {
        await axios
          .get(`${myURL_}/empleados`, { params: { presupuesto } })
          .then(function (response) {
            setEmpleados(response.data);
            setVisibleAddEmployee(true);
          })
          .catch(function (error) {
            let result = [];
            setEmpleados(result);
            console.log("Error en Fetch Get elementos");
            console.log(error);

            toastControl.current.show({
              severity:'error',
              summary:'Miller CR',
              detail:'No hay empleados que añadir',
              life:3000
            })
          });
      }
    };




    get_empleados(id_proyecto_);

    
  };

  // PROCESOS PARA SACAR EMPLEADOS (PATCH) DE LAS BOLETAS DE ASIGNACION

  const pacthEmployee = async (values) => {
    if (values) {
      // Define the URL where you want to send the POST request
      const url = myURL_ + "/cerrar";
      // Make the POST request using Axios
      await axios
        .patch(url, values)
        .then(function (response) {
          // Handle success response
          //confirm1()
          let { resultado } = response.data;
          return resultado;
        })
        .catch(function (error) {
          // Handle error
          console.log(error);
          return false;
        });
    }
  };

  const removeEmployee = (empleadosSelected) => {
    let resultado = pacthEmployee({
      fecha_final: convertDate_to_YMD(new Date()),
      hora_final: getTimeHHMM(),
      id_boleta: boletaClickAdd_Remove,
      codigo_empleado: empleadosSelected.codigo_empleado,
    });

    if (resultado) {
      const detalle_boletas_copia = JSON.parse(JSON.stringify(detalle_boletas));

      let index = -1;
      let i = -1;

      detalle_boletas_copia.filter((row) => {
        i++;
        if (row.id === boletaClickAdd_Remove) {
          index = i;
        }
        return true;
      });

      detalle_boletas_copia[index].empleados = detalle_boletas_copia[
        index
      ].empleados.filter((row) => {
        return row.codigo_empleado !== empleadosSelected.codigo_empleado;
      });

      setDetalle_Boletas(detalle_boletas_copia);
    }

    setVisibleRemoveEmployee(false);
  };

  // PROCESOS PARA AÑADIR EMPLEADOS ..

  const add_empleados = async (values) => {
    console.log(values)
    if (values) {
      await axios
        .post(`${myURL_}/addEmpleado`, values)
        .then(function (response) {
          let { resultado } = response.data;
          console.log(resultado)
          return resultado;
        })
        .catch(function (error) {
          console.log("Error en Fetch Get elementos");
          console.log(error);
          return false;
        });
    }
  };

   const addEmployee = (empleadosSelected) => {

    const valores = {
      id_boleta: boletaClickAdd_Remove,
      codigo_empleado: empleadosSelected.codigo_empleado,
      fecha_inicio: convertDate_to_YMD(new Date()),
      hora_inicio: getTimeHHMM(),
    };

    let resultado = add_empleados(valores);

    if (resultado) {
      const detalle_boletas_copia = JSON.parse(JSON.stringify(detalle_boletas));

      let index = -1;
      let i = -1;

      detalle_boletas_copia.filter((row) => {
        i++;
        if (row.id === boletaClickAdd_Remove) {
          index = i;
        }
        return true;
      });

      const empleados = detalle_boletas_copia[index].empleados
      empleados.push(empleadosSelected)

      setDetalle_Boletas(detalle_boletas_copia);
    }

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
  }, [id_proyecto_, myURL_, estado, setDetalle_Boletas]);

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
          optionsSelectedRow={optionsSelectedRow}
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
          optionsSelectedRow={optionsSelectedRow}
        />
      </Dialog>
      <Dialog
        header="Envio de Boleta por correo"
        visible={visible}
        style={{ width: 'clamp(50rem, 50rem, 100%)' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <Boleta user = {user} boleta= {data}/>
      </Dialog>
    </div>
  );
}
