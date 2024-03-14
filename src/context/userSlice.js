import { createSlice } from "@reduxjs/toolkit";


const procesarInitialState = () => {
  const state = {
    id_proyecto: "",
    desc_proyecto: "",
    usuario: "",
    xURL: "https://psql-backend-a5691387ba13.herokuapp.com",
    id_sector: "",
    actividad: [
      {
        "presupuesto": "",
        "codigo_manobra": 0,
        "actividad": "",
        "unidad_medida": "",
        "cantidad": 0,
        "rendimiento": 0
      }
    ]

  };

  return state;
};

export const userSlice = createSlice({
  name: "user",
  initialState: procesarInitialState,
  reducers: {
    SET_BASEURL: (state, action) => {
      state.xURL = action.payload;
    },
    SET_ID_PROYECTO: (state, action) => {
      state.id_proyecto = action.payload.id;
      state.desc_proyecto = action.payload.descripcion;
    },
    SET_ID_SECTORES: (state, action) => {
      state.id_sector = action.payload;
    },
    setIdUser: (state, action) => {
      state.usuario = action.payload;
    },
    SET_ACTIVIDAD: (state, action) => {
      state.actividad = action.payload;
    },
  },
});

export const {
  SET_BASEURL,
  SET_ID_PROYECTO,
  SET_ID_SECTORES,
  setIdUser,
  SET_ACTIVIDAD,
} = userSlice.actions;

export const myURL = (state) => state.user.xURL;
export const id_proyecto = (state) => state.user.id_proyecto;
export const desc_proyecto = (state) => state.user.desc_proyecto;
export const id_sector = (state) => state.user.id_sector;
export const actividad = (state) => state.user.actividad;

export default userSlice.reducer;
