import React from "react";
import Context from "./Context";
import { useReducer } from "react";
import Reducer from "./Reducer";
import {
  SET_ID_PROYECTO,
  SET_ID_USUARIO,
  SET_ID_SECTORES,
  SET_ACTIVIDAD,
} from "./types";
import { estadoInicial } from "./Context";

function UseEstado(props) {

  estadoInicial.baseURL = "https://psql-backend-a5691387ba13.herokuapp.com";


  //seteo mi reducer
  const [state, dispatch] = useReducer(Reducer, estadoInicial);


  //defino funciones


  //funxion para fijar el id proyecto
  const set_Id_proyecto = (id, descripcion) => {
    dispatch({
      type: SET_ID_PROYECTO,
      payload: { id, descripcion },
    });
  };

  //funxion para fijar el id usuario
  const set_usuario = (id) => {
    dispatch({
      type: SET_ID_USUARIO,
      payload: id,
    });
  };

  //funxion para fijar el id sector
  const set_id_sectores = (id) => {
    dispatch({
      type: SET_ID_SECTORES,
      payload: id,
    });
  };

  //fijo el elemento del presupuesto 
  const set_actividad = (actividad) => {
    dispatch({
      type: SET_ACTIVIDAD,
      payload: actividad,
    });
  }


  //cargo mi Context
  return (
    <Context.Provider
      value={{
        tb_presupuesto: state.tb_presupuesto,
        id_proyecto: state.id_proyecto,
        desc_proyecto: state.desc_proyecto,
        usuario: state.usuario,
        baseURL: state.baseURL,
        id_sector: state.id_sector,
        actividad: state.actividad,
        set_Id_proyecto,
        set_usuario,
        set_id_sectores,
        set_actividad
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default UseEstado;
