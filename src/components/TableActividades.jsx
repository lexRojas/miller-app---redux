import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import axios from "axios";

import React from "react";

function TableActividades() {








  const [datos, setdatos] = useState(null);
  const { baseURL, id_proyecto,elemento, set_actividad} = useContext(Context);
  const [selectedRow, setSelectedRow] = useState(null);

  const get_actividades = async (
    presupuesto = '',
    elemento = ''
  ) => {
    await axios
      .get(`${baseURL}/tb_actividades`, { params: { presupuesto, elemento } })
      .then(function (response) {
        setdatos(response.data);
      })
      .catch(function (error) {
        let result = [];
        setdatos(result);
        console.log("Error en Fetch Get elementos");
        console.log(error);
      });
  };

  const fijoActividad=(valor)=>{
    set_actividad(valor)
    setSelectedRow(valor)
  }



  useEffect(() => {
     get_actividades(id_proyecto,elemento)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elemento]);

  return (
    <div className="card col">
      <DataTable
        value={datos}
        size="small"
        stripedRows
        tableStyle={{ minWidth: "10rem", Width: "20rem" }}
        selectionMode="single"
        onSelectionChange={(e) => fijoActividad(e.value)}
        dataKey="codigo_manobra"
        selection={selectedRow}
        scrollable
        scrollHeight={380}
      >
        <Column field="codigo_manobra" header="Código"></Column>
        <Column
          field="actividad"
          filter
          filterPlaceholder="Buscar por descripcion"
          sortable
          header="Descripción"
        ></Column>
        <Column field="unidad_medida" header="Und.Med"></Column>
        <Column field="cantidad" header="Cantidad"></Column>
      </DataTable>
    </div>
  );
}

export default TableActividades;
