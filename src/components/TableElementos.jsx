import { DataTable } from "primereact/datatable";
import {ProgressSpinner} from 'primereact/progressspinner'
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  myURL,
  id_sector,
  id_proyecto,
  SET_ACTIVIDAD,
} from "../context/userSlice";

import React from "react";

function TableElementos() {

  //Variables de estado locales 
  const [datos, setdatos] = useState(null);

  const [Loading, setLoading] = useState(true)



  //Variables del contexto 
  const baseURL = useSelector(myURL);
  const id_sector_ = useSelector(id_sector);
  const id_proyecto_ = useSelector(id_proyecto);

  const dispatch = useDispatch();

  const [selectedElemento, setSelectedElemento] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);


  const fijoElemento = (valor) => {
    setSelectedElemento(valor);
  };

  const allowExpansion = (rowData) => {
    return rowData.children;
  };

  useEffect(() => {
    
    setLoading(true)

    const get_elem_detail = async (presupuesto = "", sector = "") => {
      await axios
        .get(`${baseURL}/elem_detail`, { params: { presupuesto, sector } })
        .then((response) => {
          setdatos(response.data)
          setLoading(false)
        })
        .catch((error) => {
          console.log("No se encontraron elementos en este caso... ");
          setdatos([])
        });
    };

    get_elem_detail(id_proyecto_,id_sector_)

    
  }, [baseURL, id_proyecto_, id_sector_]);

  const expandirFila = (e) => {
    setExpandedRows(e.data);
  };

  const onRowExpand = (event) => {
    // get_actividades(event.data.presupuesto, event.data.cod_ele_sec);
    //setelemento(event.data.cod_ele_sec);
    dispatch(SET_ACTIVIDAD(event.data.cod_ele_sec));
  };

  const rowExpansionTemplate = (data) => {
    
    return (
      <div className="p-3">
        <h5>Elemento presupuestario - {data.comentario}</h5>
        <DataTable value={data.actividades} stripedRows selectionMode="single">
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

    {Loading ?
        (<div className="block font-bold text-xl text-center p-4 mb-3">
        <p> Estamos recuperando la lista de elementos y sus actividades </p>
        <p> Por favor espere un momento...</p>
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> 
        </div>)
        :
        (
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
       )}
    </div>
  );
}

export default TableElementos;
