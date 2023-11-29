import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import axios from "axios";



import React from "react";
import { Button } from "primereact/button";

function TableEmpleados() {
  const [datosEmpleadosDisponibles, setDatosEmpleadosDisponibles] =
    useState(null);
  const [datosEmpleadosAsignados, setDatosEmpleadosAsignados] = useState(null);

  const { baseURL, id_proyecto } = useContext(Context);
  const [selectedEmpleadoDisponible, setSelectedEmpleadoDisponible] =
    useState(null);
  const [selectedEmpleadoAsignado, setSelectedEmpleadoAsignado] =
    useState(null);

  const get_empleados = async (presupuesto = 0) => {
    await axios
      .get(`${baseURL}/empleados`, { params: { presupuesto } })
      .then(function (response) {
        setDatosEmpleadosDisponibles(response.data);
      })
      .catch(function (error) {
        let result = [];
        setDatosEmpleadosDisponibles(result);
        console.log("Error en Fetch Get elementos");
        console.log(error);
        

      });
  };

  const fijoEmpleadoDisponible = (valor) => {
    setSelectedEmpleadoDisponible(valor);
  };

  const fijoEmpleadoAsignado = (valor) => {
    //setSelectedEmpleado(valor);

    setSelectedEmpleadoAsignado(valor);
  };

  const handleClickAsignar = () => {
    let nuevoEmpleadosDisponibles =datosEmpleadosDisponibles

    // si la lista de empleados asignados ya tiene empleados
    if (datosEmpleadosAsignados) {
      let array_asignados = datosEmpleadosAsignados;
      array_asignados = [...array_asignados, ...selectedEmpleadoDisponible];
      setDatosEmpleadosAsignados(array_asignados);      
    } else { //si la lista de empleados asignados esta vacia 
      setDatosEmpleadosAsignados(selectedEmpleadoDisponible);
    }

    // elimino de la lista de disponibles los empleados asignados
    selectedEmpleadoDisponible.forEach((element) => {

      nuevoEmpleadosDisponibles = nuevoEmpleadosDisponibles.filter(
        (item) => item.codigo_empleado !== element.codigo_empleado
      )

      setDatosEmpleadosDisponibles(nuevoEmpleadosDisponibles);
    });


  };

  const handleClickDevolver = () => {

    let nuevoEmpleadosAsignados =datosEmpleadosAsignados

    // si la lista de empleados disponibles ya tiene empleados
    if (datosEmpleadosDisponibles) {
      let array_disponibles = datosEmpleadosDisponibles;
      array_disponibles = [...array_disponibles, ...selectedEmpleadoAsignado];
      setDatosEmpleadosDisponibles(array_disponibles);      
    } else { //si la lista de empleados asignados esta vacia 
      setDatosEmpleadosDisponibles(selectedEmpleadoAsignado);
    }

    // elimino de la lista de asignados los empleados disponibles
    selectedEmpleadoAsignado.forEach((element) => {

      nuevoEmpleadosAsignados = nuevoEmpleadosAsignados.filter(
        (item) => item.codigo_empleado !== element.codigo_empleado
      )

      setDatosEmpleadosAsignados(nuevoEmpleadosAsignados);
    });





  };

  useEffect(() => {
    get_empleados(id_proyecto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_proyecto]);

  return (
    <div className="flex flex-column col-12 md:flex-row">
      <div className="card flex flex-column col-auto md:col-4">
        <DataTable
          value={datosEmpleadosDisponibles}
          size="small"
          stripedRows
          tableStyle={{ minWidth: "10rem", Width: "150rem" }}
          selectionMode="multiple"
          onSelectionChange={(e) => fijoEmpleadoDisponible(e.value)}
          dataKey="codigo_empleado"
          selection={selectedEmpleadoDisponible}
          scrollable
          scrollHeight={380}
        >
          <Column field="codigo_empleado" header="Código"></Column>
          <Column
            field="nombre_completo"
            filter
            filterPlaceholder="Buscar por descripcion"
            sortable
            header="Nombre Completo"
          ></Column>
        </DataTable>
      </div>

      <div className="flex flex-column col-auto md:col-2 align-items-center justify-content-center">
        <div className="flex p-1">
          <Button
            className="w-8rem"
            icon="pi pi-arrow-right"
            iconPos="right"
            label="Asignar"
            onClick={handleClickAsignar}
          />
        </div>
        <div className="flex p-1">
          <Button
            className="w-8rem "
            icon="pi pi-arrow-left"
            label="Devolver"
            onClick={handleClickDevolver}
          />
        </div>
      </div>
      <div className="card flex flex-column col-auto md:col-4">
        <DataTable
          value={datosEmpleadosAsignados}
          size="small"
          stripedRows
          tableStyle={{ minWidth: "10rem", Width: "150rem" }}
          selectionMode="multiple"
          onSelectionChange={(e) => fijoEmpleadoAsignado(e.value)}
          dataKey="codigo_empleado"
          selection={selectedEmpleadoAsignado}
          scrollable
          scrollHeight={380}
        >
          <Column field="codigo_empleado" header="Código"></Column>
          <Column
            field="nombre_completo"
            filter
            filterPlaceholder="Buscar por descripcion"
            sortable
            header="Nombre Completo"
          ></Column>
        </DataTable>
      </div>
      <div className="flex flex-row col-12 md:flex-column md:col-2 align-items-center justify-content-center">
        <div className="flex justify-content-center align-items-center p-5">
          <Button
            className="bg-green-500 w-8rem"
            icon=""
            label="Generar Boleta"
          />
        </div>
        <div className="flex justify-content-center align-items-center p-5">
          <Button className="w-8rem" icon="" label="Cancelar" />
        </div>
      </div>
    </div>
  );
}

export default TableEmpleados;
