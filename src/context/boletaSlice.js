import { createSlice } from "@reduxjs/toolkit";


const procesarInitialState = () => {
  const boleta = {
        fecha_inicio : '',
        proyecto  : '',
        ubicacion  : '',
        comentarios  : '',
        cantidad_medida : 0,
        unidad_medida: '',
        hora_inicio: '',
        hora_final: '',
        cerrada:false,
        codigo_manobra: 0,
        fecha_final: '',
        empleados_asignados:  []
      
  };

  return boleta;
};

export const boletaSlice = createSlice({
  name: "boleta",
  initialState: procesarInitialState,
  reducers : {
    setFechaInicio : (state, action) => {
      state.fecha_inicio = action.payload;
    },
    setProyecto : (state, action) => {
      state.proyecto = action.payload;
    },
    setUbicacion : (state, action) => {
      state.ubicacion = action.payload;
    },
    setComentarios : (state, action) => {
      state.comentarios = action.payload;
    },
    setCantidadMedida : (state, action) => {
      state.cantidad_medida = action.payload;
    },
    setUnidadMedida : (state, action) => {
      state.unidad_medida = action.payload;
    },
    setHoraInicio : (state, action) => {
      state.hora_inicio = action.payload;
    },
    setHoraFinal : (state, action) => {
      state.hora_final = action.payload;
    },
    setCerrada : (state, action) => {
      state.cerrada = action.payload;
    },
    setCodigoManobra : (state, action) => {
      state.codigo_manobra = action.payload;
    },
    setFechaFinal : (state, action) => {
      state.fecha_final = action.payload;
    },
    setEmpleadosAsignados : (state, action) => {
      state.empleados_asignados = action.payload;
    },
    
  },
});

export const {
  setFechaInicio,
  setProyecto ,
  setUbicacion ,
  setComentarios ,
  setCantidadMedida,
  setUnidadMedida ,
  setHoraInicio ,
  setHoraFinal ,
  setCerrada ,
  setCodigoManobra,
  setFechaFinal ,
  setEmpleadosAsignados,
} = boletaSlice.actions;


