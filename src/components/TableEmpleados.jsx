import React from "react";
import { useState, useEffect, useRef } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import axios from "axios";
import { myURL, id_proyecto } from "../context/userSlice";
import { useSelector } from "react-redux";

function TableEmpleados() {
  const [datosEmpleadosDisponibles, setDatosEmpleadosDisponibles] =  useState([]);
  const [datosEmpleadosAsignados, setDatosEmpleadosAsignados] = useState([]);

  let selectedEmpleadoDisponible=null;
  let selectedEmpleadoAsignado=null;

  const setSelectedEmpleadoDisponible=(o)=>{
    selectedEmpleadoDisponible=o;
  }

  const setSelectedEmpleadoAsignado=(o)=>{
    selectedEmpleadoAsignado=o;
  }

  const baseURL = useSelector(myURL);
  const id_proyecto_ = useSelector(id_proyecto);

  

  const toastRef = useRef(null);

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
    console.log("empleado disponible");
    console.log(valor);
    setSelectedEmpleadoDisponible(valor);
  };

  const fijoEmpleadoAsignado = (valor) => {
    console.log("empleado asignado");
    console.log(valor);

    setSelectedEmpleadoAsignado(valor);
  };

  const handleClickAsignar = () => {

    let nuevoEmpleadosDisponibles=datosEmpleadosDisponibles

    if (selectedEmpleadoDisponible) {
      // si la lista de empleados asignados ya tiene empleados
      if (datosEmpleadosAsignados) {
        let array_asignados = [...datosEmpleadosAsignados, ...selectedEmpleadoDisponible];
        setDatosEmpleadosAsignados(array_asignados);
      } else {
        //si la lista de empleados asignados esta vacia
        setDatosEmpleadosAsignados(selectedEmpleadoDisponible);
      }

      // elimino de la lista de disponibles los empleados asignados

 

      selectedEmpleadoDisponible.forEach((element) => {
         nuevoEmpleadosDisponibles = nuevoEmpleadosDisponibles.filter(
           (item) => item.codigo_empleado !== element.codigo_empleado
         );

        setDatosEmpleadosDisponibles(nuevoEmpleadosDisponibles);
      });
    } else {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "No ha seleccionado un empleado disponible de la lista",
        life: 3000,
      });
    }
  };

  const handleClickDevolver = () => {
    let nuevoEmpleadosAsignados = datosEmpleadosAsignados;

    if (selectedEmpleadoAsignado) {
      // si la lista de empleados disponibles ya tiene empleados
      if (datosEmpleadosDisponibles) {
        let array_disponibles = datosEmpleadosDisponibles;
        array_disponibles = [...array_disponibles, ...selectedEmpleadoAsignado];
        setDatosEmpleadosDisponibles(array_disponibles);
      } else {
        //si la lista de empleados asignados esta vacia
        setDatosEmpleadosDisponibles(selectedEmpleadoAsignado);
      }

      // elimino de la lista de asignados los empleados disponibles
      selectedEmpleadoAsignado.forEach((element) => {
        nuevoEmpleadosAsignados = nuevoEmpleadosAsignados.filter(
          (item) => item.codigo_empleado !== element.codigo_empleado
        );

        setDatosEmpleadosAsignados(nuevoEmpleadosAsignados);
      });
    } else {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "No ha seleccionado un empleado asignado de la lista",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    get_empleados(id_proyecto_);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_proyecto_]);

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
      <Toast ref={toastRef} />
    </div>
  );
}

export default TableEmpleados;
