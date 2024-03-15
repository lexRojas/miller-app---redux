import React, { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import {Messages} from "primereact/messages"


import {SET_ID_PROYECTO} from "../context/userSlice"
import { useSelector} from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { fijarDatos } from "../db/dbController";

import axios from "axios";


function ProyectoSelector() {

  const baseURL = useSelector((state) => state.user.myURL)
  const dispatch = useDispatch()

  

  const [filtro, setfiltro] = useState("");
  const navegate = useNavigate();
  const [selectedProyect, setSelectedProyect] = useState(null);
  const msg = useRef(null)

  const [tb_presupuesto, setTb_presupuesto] = useState([])


  const get_presupuesto = async (value = "") => {
    
    await axios
      .get(`${baseURL}/tb_presupuesto`, { params: { filtro: value } })
      .then(function (response) {
        setTb_presupuesto(response.data);
      })
      .catch(function (error) {
        setTb_presupuesto([])
        console.log("Error en Fetch Get Presupuesto");
        console.log(error);
  

      });
  };

  const fijarProyecto = (id,descripcion) =>{
    dispatch(SET_ID_PROYECTO({id, descripcion}));
    fijarDatos(1, id, "id_proyecto");
    fijarDatos(2, descripcion, "desc_proyecto");
  }



  const handleClickSelectProyect = () => {
    
    fijarProyecto("","")

    if (selectedProyect === null) {
      
      msg.current.show([
        { severity: 'error', summary: 'Error', detail: 'Debes seleccionar un proyecto', sticky: false, closable: true }
    ]);
      
    } else {
      const { presupuesto, proyecto } = selectedProyect;
      fijarProyecto(presupuesto, proyecto);
      navegate("/App");
    }
  };

  const handleClickFilter = () => {
    get_presupuesto(filtro.toUpperCase());
  };

  useEffect(() => {
    get_presupuesto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (tb_presupuesto.length == 0) {
      setSelectedProyect(null);
    }
  }, [tb_presupuesto]);

  return (
    <div className="card flex col-11 mt-2 md:col-6 ">
      <div className="flex flex-row flex-wrap align-items-center">
        <div className="flex flex-column gap-2 col md:col-9">
          <label htmlFor="txtFiltro"> Filtrar los proyectos por:</label>
          <InputText
            id="txtFiltro"
            label="Filtro de Busquedad"
            aria-describedby="aria-filtro"
            onChange={(e) => setfiltro(e.target.value)}
          />
          <small id="aria-filtro">
            {" "}
            Digite palabras que describan el proyecto{" "}
          </small>
        </div>
        <div className="flex flex-column gap-2 col md:col-3">
          <Button label="Filtrar" onClick={handleClickFilter} />
        </div>
      </div>
      <div className="flex flex-column gap-2 pt-2">
        <label htmlFor="cmdFiltro"> Seleccione el filtro </label>
        <Dropdown
          id="cmdFiltro"
          value={selectedProyect}
          onChange={(e) => setSelectedProyect(e.value)}
          options={tb_presupuesto}
          optionLabel="proyecto"
          placeholder="Selecciones un presupuesto"
          className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
        />
      </div>
      <Divider />
      <div className="flex flex-row justify-content-center">
        <Button
          label="Seleccionar proyecto"
          onClick={handleClickSelectProyect}
        />
      </div>
      <div className="flex flex-row justify-content-center">

        <Messages  ref={msg} />


      </div>
    </div>
  );
}

export default ProyectoSelector;
