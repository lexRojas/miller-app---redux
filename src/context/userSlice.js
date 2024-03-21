import { createSlice } from "@reduxjs/toolkit";


const procesarInitialState = () => {
  const state = {
    id_proyecto: "",
    desc_proyecto: "",
    usuario: "",
    //myURL: "https://psql-backend-a5691387ba13.herokuapp.com",
    myURL: 'http://localhost:8080',
    id_sector: "",
    actividad: [],

  };

  return state;
};

export const userSlice = createSlice({
  name: "user",
  initialState: procesarInitialState,
  reducers: {
    SET_BASEURL: (state, action) => {
      state.myURL = action.payload;
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



