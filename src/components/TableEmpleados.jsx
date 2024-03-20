import React from "react";
import { useState, useEffect, useRef } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

import axios from "axios";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TableEmpleados() {
  const [datosEmpleadosDisponibles, setDatosEmpleadosDisponibles] = useState(
    []
  );
  const [datosEmpleadosAsignados, setDatosEmpleadosAsignados] = useState([]);

  let selectedEmpleadoDisponible = null;
  let selectedEmpleadoAsignado = null;

  const setSelectedEmpleadoDisponible = (o) => {
    selectedEmpleadoDisponible = o;
  };

  const setSelectedEmpleadoAsignado = (o) => {
    selectedEmpleadoAsignado = o;
  };

  const baseURL = useSelector((state) => state.user.myURL);
  const id_proyecto_ = useSelector((state) => state.user.id_proyecto);

  const fecha_inicio_ = useSelector((state) => state.boleta.fecha_inicio);
  const proyecto_ = useSelector((state) => state.boleta.proyecto);
  const ubicacion_ = useSelector((state) => state.boleta.ubicacion);
  const comentarios_ = useSelector((state) => state.boleta.comentarios);
  const cantidad_medida_ = useSelector((state) => state.boleta.cantidad_medida);
  const unidad_medida_ = useSelector((state) => state.boleta.unidad_medida);
  const hora_inicio_ = useSelector((state) => state.boleta.hora_inicio);
  const hora_final_ = useSelector((state) => state.boleta.hora_final);
  const cerrada_ = useSelector((state) => state.boleta.cerrada);
  const codigo_manobra_ = useSelector((state) => state.boleta.codigo_manobra);
  const fecha_final_ = useSelector((state) => state.boleta.fecha_final);
  const cantidad_mano_obra_ = useSelector(
    (state) => state.user.actividad.cantidad
  );

  const confirm1 = () => {
    confirmDialog({
      message: messageContent,
        //"Boleta asignada con exito! ¿Desea ir a ver las boletas asignadas? ",
      header: "Confirmation",
      icon: "pi pi-thumbs-up",
      defaultFocus: "accept",
      accept,
      reject,
    });
  };

  const messageContent = (
    <div>
      <p className="font-bold text-m text-primary"> <strong>Se ha incluido su boleta de asignacion. </strong> </p>
      <p className="  text-s text-secundary">¿Desea ir a ver las boleta asignadas?</p>
    </div>
  );


  const accept = () => {
     navegate('/DetalleBoletas')      
  }
  const reject = () => {
    window.location.reload();
  }



  const toastRef = useRef(null);
  const navegate = useNavigate();

  const get_empleados = async (presupuesto = 0) => {
    if (presupuesto) {
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
    }
  };

  const fijoEmpleadoDisponible = (valor) => {
    setSelectedEmpleadoDisponible(valor);
  };

  const fijoEmpleadoAsignado = (valor) => {
    setSelectedEmpleadoAsignado(valor);
  };

  const handleClickAsignar = () => {
    let nuevoEmpleadosDisponibles = datosEmpleadosDisponibles;

    if (selectedEmpleadoDisponible) {
      // si la lista de empleados asignados ya tiene empleados
      if (datosEmpleadosAsignados) {
        let array_asignados = [
          ...datosEmpleadosAsignados,
          ...selectedEmpleadoDisponible,
        ];
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

  const handleClickBoleta = () => {
    const postData = {
      fecha_inicio: fecha_inicio_,
      proyecto: proyecto_,
      ubicacion: ubicacion_,
      comentarios: comentarios_,
      cantidad_medida: cantidad_medida_,
      unidad_medida: unidad_medida_,
      hora_inicio: hora_inicio_,
      hora_final: hora_final_,
      cerrada: cerrada_,
      codigo_manobra: codigo_manobra_,
      fecha_final: fecha_final_,
      empleados_asignados: datosEmpleadosAsignados,
    };

    let validacion = true;

    if ((hora_inicio_ === ":") | (hora_inicio_ === "")) {
      validacion = false;
      toastRef.current.show({
        severity: "error",
        summary: "Miller CR",
        detail: "Debe introducir una hora de inicio válida HH:MM",
        life: 3000,
      });
    }

    if (cantidad_medida_ <= 0 || cantidad_medida_ > cantidad_mano_obra_) {
      validacion = false;
      toastRef.current.show({
        severity: "error",
        summary: "Miller CR",
        detail: "Debe introducir una cantidad valida",
        life: 3000,
      });
    }

    if (!datosEmpleadosAsignados || datosEmpleadosAsignados.length === 0) {
      validacion = false;
      toastRef.current.show({
        severity: "error",
        summary: "Miller CR",
        detail: "Debe tener al menos un empleado asignado",
        life: 3000,
      });
    }

    if (!postData.codigo_manobra) {
      validacion = false;
      toastRef.current.show({
        severity: "error",
        summary: "Miller CR",
        detail: "Pendiente definir una actividad",
        life: 3000,
      });
    }

    if (validacion) {
      // Define the URL where you want to send the POST request
      const url = baseURL + "/boleta";
      // Make the POST request using Axios
      axios
        .post(url, postData)
        .then(function (response) {
          // Handle success response
            confirm1()
        })
        .catch(function (error) {
          // Handle error

          toastRef.current.show({
            severity: "error",
            summary: "Miller CR",
            detail: error,
            life: 3000,
          });
        });
    }
  };

  const handledClckCancelar = () => {
    navegate("/app");
  };

  return (
    <div className="flex flex-column col-12 md:flex-row">
      <div className="card flex flex-column col-auto md:col-4">
        <div>
          {" "}
          <p className="font-bold text-xl text-primary ">
            {" "}
            Empleados disponibles{" "}
          </p>{" "}
        </div>
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
        <div>
          {" "}
          <p className="font-bold text-xl text-primary ">
            {" "}
            Empleados asignados
          </p>{" "}
        </div>
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
            onClick={handleClickBoleta}
          />
        </div>
        <div className="flex justify-content-center align-items-center p-5">
          <Button
            className="w-8rem"
            icon=""
            label="Cancelar"
            onClick={handledClckCancelar}
          />
        </div>
      </div>
      <Toast ref={toastRef} />
      <ConfirmDialog />
    </div>
  );
}

export default TableEmpleados;
