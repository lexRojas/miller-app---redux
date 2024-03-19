import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";
import { Toast } from "primereact/toast";


import {
  setFechaInicio,
  setProyecto,
  setUbicacion,
  setComentarios,
  setCantidadMedida,
  setUnidadMedida,
  setHoraInicio,
  setHoraFinal,
  setCerrada,
  setCodigoManobra,
  setFechaFinal,
} from "../context/boletaSlice";

import { useSelector, useDispatch } from "react-redux";

import { convertDate_to_YMD } from "../tools/convertDate" 
import { getTimeHHMM } from "../tools/getTimeHHMM" 


function FormBoleta() {
  const [isValid, setIsValid] = useState(true);

  const actividad_ = useSelector( (state) => state.user.actividad);
  const id_proyecto_ = useSelector((state) => state.user.id_proyecto);
  const dispatch = useDispatch();

  const ubicacion_ref = useRef(null);
  const toastRef = useRef(null)

  const [descripcion, state_setDescripcion] = useState("");
  const [medida, state_setCantMedida] = useState(0);
  const [um, state_setUM] = useState("");
  const [hora_inicio, state_SetHoraInicio] = useState(getTimeHHMM())
  const [hora_final, state_setHoraFinal] = useState("17:00");
  const [isValidCantidad , setisValidCantidad ] = useState(true)
  //const [visible , setVisible ] = useState(false)


  useEffect(() => {
    // Valores que provienen de la lista de actividades
    state_setDescripcion(actividad_.actividad);
    state_setUM(actividad_.unidad_medida);
    state_setCantMedida(actividad_.cantidad);
    state_setHoraFinal("17:00");
    state_SetHoraInicio(getTimeHHMM())
 
    // Valores que se ingresan al contexto
    dispatch(setProyecto(id_proyecto_));
    dispatch(setCerrada(false));
    dispatch(setCodigoManobra(actividad_.codigo_manobra));
    dispatch(setFechaInicio(convertDate_to_YMD((new Date()))));
    dispatch(setFechaFinal(convertDate_to_YMD((new Date()))))
    dispatch(setUnidadMedida(actividad_.unidad_medida));
    dispatch(setCantidadMedida(actividad_.cantidad));
    dispatch(setComentarios(actividad_.actividad));
    dispatch(setHoraFinal("17:00"));
    dispatch(setHoraInicio(getTimeHHMM()))

    ubicacion_ref.current.focus();
  }, [actividad_, dispatch, id_proyecto_]);

  const handleDescripcionChange = (v) => {
    state_setDescripcion(v);
    dispatch(setComentarios(v));
  };

  const handleCantidadMedidaChange = (v) => {

    if((v>actividad_.cantidad) || (v<=0)){
       
        setisValidCantidad(false)
    }else{
      setisValidCantidad(true)
    }

    state_setCantMedida(v);
    dispatch(setCantidadMedida(v));
  };

  const handleHoraInicioChange = (v) => {
    const horaRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    if (horaRegex.test(v)) {
      setHoraInicio(v)
      dispatch(setHoraInicio(v));
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleHoraInicioOnBlur = (v) => {

    const horaRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    if (!horaRegex.test(v)) {
      toastRef.current.show({
        severity:'error',
        summary: 'Error',
        detail:'Digito una hora en formato incorrecto HH:MM (hora militar)',
        life:3000,
      })
      //state_SetHoraInicio('')  
    }
  };


  return (
    <div className="card col" id="formulario_boleta">
      <div>
        {" "}
        <p className="font-bold text-xl text-primary ">
          {" "}
          Formulario de asignación de labores{" "}
        </p>{" "}
      </div>
      <div className="flex flex-column gap-1 pb-2">
        <label htmlFor="planos">Ubicación en Planos</label>
        <InputText
          ref={ubicacion_ref}
          aria-describedby="planos-help"
          onChange={(e) => dispatch(setUbicacion(e.target.value))}
        />
        <small id="planos-help">
          Indique la sección del plano donde se realizará la actividad.
        </small>
      </div>

      <div className="flex flex-column gap-1 pb-2">
        <label htmlFor="planos">Comentarios</label>
        <InputTextarea
          value={descripcion}
          onChange={(e) => handleDescripcionChange(e.target.value)}
          rows={5}
        />
      </div>
      <div className="flex flex-row pb-2 gap-3">
        <div className="flex flex-column gap-2 p-0 col-6">
          <label htmlFor="planos">Cantidad de medida</label>
          <InputNumber
            value={medida}
            onChange={(e) => handleCantidadMedidaChange(e.value)}
            className={!isValidCantidad ? "p-invalid":""}
          />
          {!isValidCantidad && (
          <small className="p-error">Cantidad no permitida </small>
          )}
        </div>
        <div className="flex flex-column gap-2 p-0 col-6">
          <label htmlFor="planos">Unidad de Medida</label>
          <InputText
            value={um}
            aria-describedby="planos-help"
            disabled
          />
        </div>
      </div>
      <div className="flex flex-row pb-2 gap-3">
        <div className="flex flex-column gap-2 p-0 col-6">
          <label htmlFor="planos">Hora Inicio:</label>
          <InputMask
            mask="99:99"
            value={hora_inicio}
            onChange={(e) => handleHoraInicioChange(e.target.value)}
            onBlur={(e) => handleHoraInicioOnBlur(e.target.value)}
            aria-describedby="hora_help"
            className={!isValid ? "p-invalid" : ""}
          />
          {!isValid && (
            <small className="p-error">Please enter a valid time (HH:MM)</small>
          )}
        </div>
        <div className="flex flex-column gap-2 p-0 col-6">
          <label htmlFor="planos">Hora Final</label>
          <InputMask
            value={hora_final}
            mask="99:99"
            onChange={(e) => dispatch(setHoraFinal(e.target.value))}
            disabled
            aria-describedby="hora_help"
          />
          <small>Formato HH:MM </small>
        </div>
      </div>
      <Toast ref={toastRef}/>
      {/* <Mensaje titulo="Miller"  mensaje="hola desde mi componente" tipo="error" tiempo={3000} visible={visible} /> */}
    </div>
  );
}

export default FormBoleta;
