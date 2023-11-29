import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import axios from "axios";

import React from "react";

function TableElementos() {
  const [datos, setdatos] = useState(null);
  const { baseURL, id_sector, id_proyecto } = useContext(Context);
  const [selectedElemento, setSelectedElemento] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const [actividades, setActividades] = useState(null);
  const [elemento, setelemento] = useState(null);

  const get_elementos = async (presupuesto = "", sector = "") => {
    await axios
      .get(`${baseURL}/tb_elementos`, { params: { presupuesto, sector } })
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

  const get_actividades = async (presupuesto = "", elemento = "") => {
    await axios
      .get(`${baseURL}/tb_actividades`, { params: { presupuesto, elemento } })
      .then(function (response) {
        setActividades(response.data);
      })
      .catch(function (error) {
        let result = [];
        setdatos(result);
        console.log("Error en Fetch Get actividades");
        console.log(error);
      });
  };

  const fijoElemento = (valor) => {
    setSelectedElemento(valor);
  };

  const allowExpansion = (rowData) => {
    //console.log(rowData)
    return rowData.children;
  };

  useEffect(() => {
    get_elementos(id_proyecto, id_sector);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_sector]);

  const expandirFila = (e) => {
    setExpandedRows(e.data);
  };

  const onRowExpand = (event) => {
    get_actividades(event.data.presupuesto, event.data.cod_ele_sec);
    setelemento(event.data.cod_ele_sec);
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <h5>Elemento presupuestario -> {data.comentario}</h5>
        <DataTable value={actividades} stripedRows selectionMode="single">
          <Column field="codigo_manobra" header="Id" sortable></Column>
          <Column field="actividad" header="Actividad" sortable></Column>
          <Column field="unidad_medida" header="Und.Med" sortable></Column>
          <Column field="cantidad" header="Cantidad" sortable></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <div className="card col">
      <DataTable
        value={datos}
        expandedRows={expandedRows}
        onRowToggle={(e) => expandirFila(e)}
        rowExpansionTemplate={rowExpansionTemplate}
        onRowExpand={onRowExpand}
        size="small"
        stripedRows
        tableStyle={{ minWidth: "10rem", Width: "20rem" }}
        selectionMode="single"
        onSelectionChange={(e) => fijoElemento(e.value)}
        dataKey="cod_ele_sec"
        selection={selectedElemento}
        scrollable
        scrollHeight={380}
      >
        <Column expander={allowExpansion} style={{ width: "5rem" }} />
        <Column field="cod_ele_sec" header="Código"></Column>
        <Column
          field="comentario"
          filter
          filterPlaceholder="Buscar por descripcion"
          sortable
          header="Descripción"
        ></Column>
        <Column field="unidad_medida" header="Und.Med"></Column>
        <Column field="cantidad_elemento" header="Cantidad"></Column>
      </DataTable>
    </div>
  );
}

export default TableElementos;
